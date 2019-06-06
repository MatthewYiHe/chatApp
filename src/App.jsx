import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import { generateRandomId } from "./utils.js";


class App extends Component {
  constructor() {
    super();
    this.state = {
                  currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
                  messages: [],
                  notification: []
                };
  }

  componentDidMount() {
    console.log("componentDidMount APP");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = ()=>{
      console.log('Connected to server')
    }
    //get message from the server and turn it to object.
    this.socket.onmessage = (message) => {
      let obj = JSON.parse(message.data);
      if (obj.type === 'incomingMessage'){
        //put new id, username, content to state and reset state
        const newMessage = {id: obj.id , username: obj.username, content: obj.content};
        const newMessages = this.state.messages.concat(newMessage)
        this.setState({messages: newMessages})
      }
      if (obj.type === 'incomingNotification'){
        const newNotification = this.state.notification.concat(obj.content)
        this.setState({notification: newNotification})
      }
    }
  }

  addMessage = (username, message) => {
    //send message to server
    this.socket.send(`{"type": "postMessage","username":"${username}", "content":"${message}"}`)

  }

  //function to update the username
  editUsername = (username) => {
    const preUsername = this.state.currentUser.name
    this.setState({currentUser: {name: username}})
    if (preUsername !== username){
      this.socket.send(`{"type": "postNotification","content":"${preUsername} changed their name to ${username}"}`)
    }
  }

  componentDidUpdate(){
    // console.log('new user', this.state.currentUser.name)
    // console.log('state notification', this.state.notification)
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages}
                     notifications={this.state.notification} />
        <ChatBar currentUser={this.state.currentUser.name}
                 newMessage={this.addMessage}
                 editUsername={this.editUsername}
                 // content={this.state.messages.content}
                 />
      </div>
    );
  }
}
export default App;
