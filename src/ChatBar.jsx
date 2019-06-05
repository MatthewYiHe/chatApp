import React, {Component} from 'react';

class ChatBar extends Component {
  render(){
    const userName = this.props.currentUser;
    const submitFunc = (event)=>{
      const content = event.target.value
      if (event.key === "Enter" && content.length !== 0) {
        this.props.newMessage(userName, content)
        event.target.value = ""
      }
      // I dont need anything after "if", right?
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={userName} />
        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               onKeyPress={submitFunc}
               />
      </footer>
    );
  }
}

export default ChatBar;
