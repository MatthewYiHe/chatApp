import React, {Component} from 'react';


function MessageNotification(notification) {
  return (
    <div className="message system">
      {notification}
    </div>
  );
}

export default MessageNotification;