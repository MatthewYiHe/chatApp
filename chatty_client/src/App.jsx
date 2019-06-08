import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import { generateRandomId } from "./utils.js";


class App extends Component {
  constructor() {
    super();
    this.state = {
                  currentUser: {name: "Anonymous"},
                  color:"",
                  messages: [],
                  numberOfUsers: 0
                };
  }

  componentDidMount() {
    console.log("componentDidMount APP");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = ()=>{
      console.log('Connected to server')
    }
    //get message from the server and turn it to object. then change the state according the type.
    this.socket.onmessage = (message) => {
      console.log("frontend: ",message)
      let obj = JSON.parse(message.data);
      console.log('obj',obj)
      if (obj.color){
        this.setState({color: obj.color})
      }
      if (typeof(obj.numberOfUsers)==="number"){
        this.setState({numberOfUsers: obj.numberOfUsers})
      }
      if (obj.type === 'incomingMessage'){
        console.log(obj)
        //put new id, username, content to state and reset state
        const newMessage = {id: obj.id ,
                            username: obj.username,
                            color: obj.color,
                            content: obj.content};
        const newMessages = this.state.messages.concat(newMessage)
        this.setState({messages: newMessages})
      }
      if (obj.type === 'incomingNotification'){
        const newNotification = {id: obj.id , notification: obj.content};
        const newNotifications = this.state.messages.concat(newNotification)
        this.setState({messages: newNotifications})
      }
    }
  }

  //function to send input message to sever
  addMessage = (username, message) => {
    //make sure "\" will not crush the sever
    message = message.replace('\\', '\\\\');
    username = username.replace('\\', '\\\\');
    this.socket.send(`{"type": "postMessage",
                       "color": "${this.state.color}",
                       "username":"${username}",
                       "content":"${message}"}`)
  }

  //function to send new username to sever
  editUsername = (username) => {
    const preUsername = this.state.currentUser.name;
    this.setState({currentUser: {name: username}})
    if (preUsername !== username){
      this.socket.send(`{"type": "postNotification","content":"${preUsername} changed their name to ${username}"}`)
    }
  }

  render() {
    return (
      <div>
        <NavBar number={this.state.numberOfUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name}
                 newMessage={this.addMessage}
                 editUsername={this.editUsername}
                 />
      </div>
    );
  }
}
export default App;
