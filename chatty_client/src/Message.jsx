import React, {Component} from 'react';

class Message extends Component {
  render(){
    const message = this.props.message;
    const color = this.props.message.color;
    console.log(message)
    return (
      <div className="message">
        <span className="message-username" style={{color: color}} >{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    );
  }
}

export default Message;