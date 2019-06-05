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

  addMessage(username, message){
    // Add a new message to the list of messages in the data store
    const newMessage = {id: generateRandomId() , username: username, content: message};
    const newMessages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: newMessages})
  }

  addWsMessage = (username, message)=>{
    this.socket.send(`username: ${username} content: ${message}`)
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name}
                 newMessage={this.addMessage}
                 wsMessage={this.addWsMessage}
                 // content={this.state.messages.content}
                 />
      </div>
    );
  }
}
export default App;
