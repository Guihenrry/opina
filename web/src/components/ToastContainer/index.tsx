import React from 'react';
import Toast from './Toast';

import { ToastMessage } from '../../contexts/toast';

import * as S from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <S.Container>
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </S.Container>
  );
};

export default ToastContainer;
