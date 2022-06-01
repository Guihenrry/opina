import React, { useMemo, useState, useCallback, ChangeEvent } from 'react';

import { FiMoreVertical, FiEdit2, FiTrash } from 'react-icons/fi';
import * as S from './styles';
import Avatar from '../Avatar';
import useAuth from '../../hooks/useAuth';
import Button from '../Button';

interface OpinionProps {
  data: {
    id: string;
    text: string;
    created_at: string;
    user: {
      id: string;
      name: string;
      avatar_url: string;
    };
  };
  onDelete(id: string): void;
  onEdit(id: string, text: string): void;
}

const Opinion: React.FC<OpinionProps> = ({ data, onDelete, onEdit }) => {
  const { user } = useAuth();

  const [showActions, setShowActions] = useState(false);
  const [showEditText, setShowEditText] = useState(false);

  const [editText, setEditText] = useState('');

  const buttonSaveDisabled = useMemo(
    () => Boolean(!editText || editText === data.text),
    [editText, data.text],
  );

  const createdAtFormatted = useMemo(() => {
    const date = new Date(data.created_at);
    const day = date.getDay().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }, [data.created_at]);

  const handleClickOut = useCallback(() => {
    setShowActions(false);
    window.removeEventListener('click', handleClickOut);
  }, []);

  const handleShowActions = useCallback(() => {
    setShowActions(true);
    setTimeout(() => {
      window.addEventListener('click', handleClickOut);
    }, 300);
  }, [handleClickOut]);

  const handleClickDelete = useCallback(() => {
    onDelete(data.id);
  }, [data.id, onDelete]);

  const handleClickEdit = useCallback(() => {
    setShowEditText(true);
    setEditText(data.text);
  }, [data.text]);

  const handleCancelEdit = useCallback(() => {
    setShowEditText(false);
    setEditText('');
  }, []);

  const handleSaveEdit = useCallback(() => {
    onEdit(data.id, editText);
    setShowEditText(false);
  }, [onEdit, editText, data.id]);

  const handleChangeEditText = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setEditText(event.target.value);
    },
    [],
  );

  return (
    <S.Container>
      <Avatar name={data.user.name} url={data.user.avatar_url} />

      {showEditText ? (
        <S.EditForm>
          <S.EditTextarea value={editText} onChange={handleChangeEditText} />
          <S.EditActions>
            <Button type="button" secondary onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={buttonSaveDisabled}
              onClick={handleSaveEdit}
            >
              Salvar
            </Button>
          </S.EditActions>
        </S.EditForm>
      ) : (
        <>
          <S.Info>
            <S.Username>{data.user.name}</S.Username>
            <S.Text>{data.text}</S.Text>
            <S.DateCreated>{createdAtFormatted}</S.DateCreated>
          </S.Info>

          {user && user.id === data.user.id && (
            <S.ActionsContainer>
              <S.ActionsButton type="button" onClick={handleShowActions}>
                <FiMoreVertical />
              </S.ActionsButton>

              <S.Actions show={showActions ? 1 : 0}>
                <S.Action type="button" onClick={handleClickEdit}>
                  <FiEdit2 />
                  Editar
                </S.Action>
                <S.Action type="button" onClick={handleClickDelete}>
                  <FiTrash />
                  Deletar
                </S.Action>
              </S.Actions>
            </S.ActionsContainer>
          )}
        </>
      )}
    </S.Container>
  );
};

export default Opinion;
