import React, {Component} from 'react';

class ChatBar extends Component {
  render(){
    const userName = this.props.currentUser;
    const editNameFunc = (event)=>{
      const userName = event.target.value
      if (event.key === "Enter" && userName.length !== 0) {
        this.props.editUsername(userName)
      }
      if (event.key === "Enter" && userName.length === 0) {
        this.props.editUsername("Anonymous")
      }
    }
    const sendMessageFunc = (event)=>{
      const content = event.target.value
      if (event.key === "Enter" && content.length !== 0) {
        this.props.newMessage(userName, content)
        event.target.value = ""
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username"
               placeholder="Your Name (Optional)"
               defaultValue={userName}
               onKeyPress={editNameFunc}
               />
        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               onKeyPress={sendMessageFunc}
               />
      </footer>
    );
  }
}

export default ChatBar;
