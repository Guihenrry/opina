import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiUploadCloud,
  FiCamera,
} from 'react-icons/fi';
import * as Yup from 'yup';

import * as S from './styles';
import useAuth from '../../../hooks/useAuth';
import Input from '../../../components/Input';
import api from '../../../services/api';
import useToast from '../../../hooks/useToast';
import yupValidateField from '../../../utils/yupValidateField';

const Edit: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState({
    value: user?.name || '',
    error: '',
    schema: Yup.string().required('O campo nome é obrigatorio.'),
  });

  const [email, setEmail] = useState({
    value: user?.email || '',
    error: '',
    schema: Yup.string()
      .email('Ops parece que seu e-mail não está correto.')
      .required('O campo e-mail é obrigatorio.'),
  });

  const [oldPassword, setOldPassword] = useState({
    value: '',
    error: '',
    schema: Yup.string()
      .required('O campo senha é obrigatorio.')
      .min(6, 'Dever ter no mínimo 6 caracteres.'),
  });

  const [password, setPassword] = useState({
    value: '',
    error: '',
    schema: Yup.string()
      .required('O campo senha é obrigatorio.')
      .min(6, 'Dever ter no mínimo 6 caracteres.'),
  });

  const [passwordConfirmation, setPasswordConfirmation] = useState({
    value: '',
    error: '',
    schema: Yup.string()
      .required('O campo senha é obrigatorio.')
      .min(6, 'Dever ter no mínimo 6 caracteres.'),
  });

  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName({ ...name, value: event.target.value });
    },
    [name],
  );

  const handleChangeEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail({ ...email, value: event.target.value });
    },
    [email],
  );

  const handleChangeOldPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setOldPassword({ ...oldPassword, value: event.target.value });
    },
    [oldPassword],
  );

  const handleChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword({ ...password, value: event.target.value });
    },
    [password],
  );

  const handleChangePasswordConfirmation = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirmation({
        ...passwordConfirmation,
        value: event.target.value,
      });
    },
    [passwordConfirmation],
  );

  const handleAvatarChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];

        const data = new FormData();
        data.append('avatar', file);

        const response = await api.patch('/users/avatar', data);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado',
        });
      }
    },
    [addToast, updateUser],
  );

  const validatePasswordFields = useCallback(() => {
    let validate = true;

    setPassword({ ...password, error: '' });

    setPasswordConfirmation({
      ...passwordConfirmation,
      error: '',
    });

    if (oldPassword.value && !password.value) {
      validate = false;
      setPassword({ ...password, error: 'Campo obrigatorio' });

      setPasswordConfirmation({
        ...passwordConfirmation,
        error: 'Campo obrigatorio',
      });
    }

    if (password.value !== passwordConfirmation.value) {
      validate = false;
      setPasswordConfirmation({
        ...passwordConfirmation,
        error: 'Confimação incorreta',
      });
    }

    return validate;
  }, [passwordConfirmation, password, oldPassword]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validName = yupValidateField(name, setName);
      const validEmail = yupValidateField(email, setEmail);
      const validPasswordFields = validatePasswordFields();

      if (validEmail && validName && validPasswordFields) {
        try {
          const response = await api.put('/profile', {
            name: name.value,
            email: email.value,
            ...(oldPassword.value
              ? {
                  old_password: oldPassword.value,
                  password: password.value,
                  password_confirmation: passwordConfirmation.value,
                }
              : {}),
          });

          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Perfil atualizado!',
            description:
              'Suas informações do perfil foram atualizada com sucesso.',
          });
        } catch {
          addToast({
            type: 'error',
            title: 'Error na atualização!',
            description:
              'Ocorreu um error ao atualizar o perfil. tente novamente.',
          });
        }
      }
    },
    [
      email,
      name,
      oldPassword,
      password,
      passwordConfirmation,
      validatePasswordFields,
      updateUser,
      addToast,
    ],
  );

  return (
    <>
      <S.Title>Meu perfil</S.Title>

      <S.AvatarUpload htmlFor="avatar">
        {user?.avatar_url ? (
          <S.Avatar src={user.avatar_url} alt={user.name} />
        ) : (
          <S.AvatarNullState>
            <FiUploadCloud />
          </S.AvatarNullState>
        )}

        <input type="file" id="avatar" onChange={handleAvatarChange} />

        <S.AvatarIconCameraWrapper>
          <FiCamera />
        </S.AvatarIconCameraWrapper>
      </S.AvatarUpload>

      <S.Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          icon={FiUser}
          value={name.value}
          onChange={handleChangeName}
          error={name.error}
        />
        <Input
          placeholder="E-mail"
          icon={FiMail}
          value={email.value}
          onChange={handleChangeEmail}
          error={email.error}
        />
        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          value={oldPassword.value}
          error={oldPassword.error}
          onChange={handleChangeOldPassword}
        />
        <Input
          placeholder="Nova Senha"
          type="password"
          icon={FiLock}
          value={password.value}
          error={password.error}
          onChange={handleChangePassword}
        />
        <Input
          placeholder="Confirmar senha"
          type="password"
          icon={FiLock}
          value={passwordConfirmation.value}
          error={passwordConfirmation.error}
          onChange={handleChangePasswordConfirmation}
        />
        <S.SubmitButton type="submit">Confirmar mudanças</S.SubmitButton>
      </S.Form>
    </>
  );
};

export default Edit;
