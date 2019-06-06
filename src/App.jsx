import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import { generateRandomId } from "./utils.js";


class App extends Component {
  constructor() {
    super();
    this.state = {
                  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
                  messages: []
                };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount APP");
    this.socket = new WebSocket("ws://localhost:3001")
    console.log(this.socket)
    this.socket.onopen = ()=>{
      console.log('Connected to server')
    }
  }

  addMessage = (username, message)=>{
    //send message to server
    this.socket.send(`"username":"${username}", "content":"${message}"`)
    //get message from the server and turn it to object.
    this.socket.onmessage = (message) => {
      let obj = JSON.parse(message.data);
    //put new id, username, content to state and reset state
      const newMessage = {id: obj.id , username: obj.username, content: obj.content};
      const newMessages = this.state.messages.concat(newMessage)
      this.setState({messages: newMessages})
    }
  }

  editUsername = (username) => {
    this.setState({currentUser: {name: username}})
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
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
