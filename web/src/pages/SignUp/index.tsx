import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import { useNavigate } from 'react-router';
import * as S from './styles';
import yupValidateField from '../../utils/yupValidateField';
import Input from '../../components/Input';
import useToast from '../../hooks/useToast';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState({
    value: '',
    error: '',
    schema: Yup.string().required('O campo nome é obrigatorio.'),
  });

  const [email, setEmail] = useState({
    value: '',
    error: '',
    schema: Yup.string()
      .email('Ops parece que seu e-mail não está correto.')
      .required('O campo e-mail é obrigatorio.'),
  });

  const [password, setPassword] = useState({
    value: '',
    error: '',
    schema: Yup.string()
      .required('O campo senha é obrigatorio.')
      .min(6, 'Dever ter no mínimo 6 caracteres.'),
  });

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validName = yupValidateField(name, setName);
      const validEmail = yupValidateField(email, setEmail);
      const validPassword = yupValidateField(password, setPassword);

      if (validName && validEmail && validPassword) {
        try {
          setLoading(true);

          await api.post('/users', {
            name: name.value,
            email: email.value,
            password: password.value,
          });

          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Você ja pode fazer seu login no Opina.',
          });

          navigate('/signin');
        } catch {
          addToast({
            type: 'error',
            title: 'Ocorreu um errro.',
            description:
              'Verifique as credenciais informadas e tente novamente.',
          });

          setLoading(false);
        }
      }
    },
    [email, password, name, addToast, navigate],
  );

  const handleChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword({ ...password, value: event.target.value });
    },
    [password],
  );

  const handleChangeEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail({ ...email, value: event.target.value });
    },
    [email],
  );
  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName({ ...name, value: event.target.value });
    },
    [name],
  );

  return (
    <S.Wrapper>
      <S.Container>
        <S.SignWrapper>
          <S.Title>Seja bem vindo</S.Title>
          <S.Subtitle>Cadastra-se para ter experiência completa</S.Subtitle>
          <S.Navigation>
            <S.NavigationLink to="/signup" activeClassName="active">
              Cadastrar
            </S.NavigationLink>
            <S.NavigationLink to="/signin" activeClassName="active">
              Logar
            </S.NavigationLink>
          </S.Navigation>
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
              placeholder="Senha"
              icon={FiLock}
              type="password"
              value={password.value}
              onChange={handleChangePassword}
              error={password.error}
            />
            <S.SubmitButton type="submit" loading={loading}>
              Cadastrar
            </S.SubmitButton>
          </S.Form>
        </S.SignWrapper>
      </S.Container>
    </S.Wrapper>
  );
};

export default SignUp;
