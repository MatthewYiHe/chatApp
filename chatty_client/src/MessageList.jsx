import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageNotification from './MessageNotification.jsx';

class MessageList extends Component {
  render(){
    const {messages} = this.props;
    //check it the incoming are messages or notifications
    const message = messages.map(item=> {
      if (item.username){
        return <Message key={item.id} message={item}/>
      } else {
        return <MessageNotification key={item.id} notification={item.notification} />
      }
    });
    return (
      <main className="messages">
        {message}
      </main>
    );
  }
}

export default MessageList;