import React, { useMemo } from 'react';

import * as S from './styles';
import { stringToHslColor } from '../../utils/colors';

interface AvatarProps {
  className?: string;
  url?: string;
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, url, className }) => {
  const nameResume = useMemo(() => {
    const nameArray = name.split(' ');
    const firstLetter = nameArray[0].charAt(0);
    const lastLetter =
      nameArray.length > 1 ? nameArray[nameArray.length - 1].charAt(0) : '';

    return `${firstLetter}${lastLetter}`;
  }, [name]);

  const backgroundColor = useMemo(() => {
    return stringToHslColor(name, 30, 80);
  }, [name]);

  const color = useMemo(() => {
    return stringToHslColor(name, 30, 40);
  }, [name]);

  return url ? (
    <S.Avatar src={url} alt={name} className={className} />
  ) : (
    <S.NullState
      backgroundColor={backgroundColor}
      color={color}
      className={className}
    >
      {nameResume}
    </S.NullState>
  );
};

export default Avatar;
