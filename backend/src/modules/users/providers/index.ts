import { container } from 'tsyringe';

import BcryptHashProvider from './HashProvider/implementations/BcryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

import IUserTokenProvider from './UserTokenProvider/models/IUserTokenProvider';
import JwtUserTokenProvider from './UserTokenProvider/implementations/JwtUserTokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);

container.registerSingleton<IUserTokenProvider>(
  'UserTokenProvider',
  JwtUserTokenProvider,
);
