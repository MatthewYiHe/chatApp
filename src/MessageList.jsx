import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageNotification from './MessageNotification.jsx';

class MessageList extends Component {
  render(){
    const messages = this.props.messages;
    const message = messages.map(message=> <Message key={message.id} message={message} />);
    return (
      <main className="messages">
        {message}
        <MessageNotification />
      </main>
    );
  }
}

export default MessageList;