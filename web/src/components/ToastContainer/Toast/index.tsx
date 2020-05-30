import React, { useEffect, useCallback } from 'react';
import { FiSmile, FiFrown, FiInfo, FiX } from 'react-icons/fi';

import * as S from './styles';
import { ToastMessage } from '../../../contexts/toast';
import useToast from '../../../hooks/useToast';

const icons = {
  info: <FiInfo />,
  error: <FiFrown />,
  success: <FiSmile />,
};

interface ToastProps {
  message: ToastMessage;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeToast, message.id]);

  const handleCloseClick = useCallback(() => {
    removeToast(message.id);
  }, [removeToast, message.id]);

  return (
    <S.Container type={message.type || 'info'}>
      {icons[message.type || 'info']}
      <S.Content>
        <S.Title>{message.title}</S.Title>
        <S.Description>{message.description}</S.Description>
      </S.Content>

      <S.ButtonClose type="button" onClick={handleCloseClick}>
        <FiX />
      </S.ButtonClose>
    </S.Container>
  );
};

export default Toast;
