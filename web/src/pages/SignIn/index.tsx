import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import * as S from './styles';
import yupValidateField from '../../utils/yupValidateField';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

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
    schema: Yup.string().required('O campo senha é obrigatorio.'),
  });

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validEmail = yupValidateField(email, setEmail);
      const validPassword = yupValidateField(password, setPassword);

      if (validEmail && validPassword) {
        try {
          setLoading(true);
          await signIn({
            email: email.value,
            password: password.value,
          });
        } catch {
          addToast({
            type: 'error',
            title: 'Ocorreu um errro.',
            description:
              'Verifique as credenciais informadas e tente novamente.',
          });
        } finally {
          setLoading(false);
        }
      }
    },
    [email, password, signIn, addToast],
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

  return (
    <S.Wrapper>
      <S.Container>
        <S.SignWrapper>
          <S.Title>Seja bem vindo</S.Title>
          <S.Subtitle>Faça login para ter experiência completa</S.Subtitle>
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
              Entrar
            </S.SubmitButton>
          </S.Form>
        </S.SignWrapper>
      </S.Container>
    </S.Wrapper>
  );
};

export default SignIn;
