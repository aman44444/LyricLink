import React from 'react';

interface Message {
  id: string;
  text: string;

}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div>
      <h3>Messages</h3>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.text}</p>
          {}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
