import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageNotification from './MessageNotification.jsx';

class MessageList extends Component {
  render(){
    const messages = this.props.messages;
    const message = messages.map(item=> <Message key={item.id} message={item} />);
    const notifications = this.props.notifications;
    const notification = notifications.map(item=> MessageNotification(item));
    return (
      <main className="messages">
        {message}
        {notification}
      </main>
    );
  }
}

export default MessageList;