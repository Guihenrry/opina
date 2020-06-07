import React, { useState, useEffect } from 'react';

import * as S from './styles';
import api from '../../../services/api';
import useToast from '../../../hooks/useToast';

interface Opinion {
  id: string;
  text: string;
  created_at: string;
  createdAtFormatted: string;
  post: {
    id: string;
    title: string;
    images: {
      image: string;
    }[];
  };
}

const Opinions: React.FC = () => {
  const { addToast } = useToast();

  const [opinions, setOpinions] = useState<Opinion[]>([]);

  useEffect(() => {
    api
      .get<Opinion[]>('/opinions')
      .then((response) => {
        const data = response.data.map((opinion) => {
          const date = new Date(opinion.created_at);
          const day = date.getDay().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();

          return {
            ...opinion,
            createdAtFormatted: `${day}/${month}/${year}`,
          };
        });

        setOpinions(data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Algo deu errado',
          description: 'Ops não conseguimos conectar com o servidor',
        });
      });
  }, [addToast]);

  return (
    <>
      <S.Title>Minhas opiniões</S.Title>

      {opinions.map((opinion) => (
        <S.Opinion key={opinion.id}>
          <S.PostLink to={`/post/${opinion.post.id}`}>
            <S.PostImage
              src={opinion.post.images[0].image}
              alt={opinion.post.title}
            />
          </S.PostLink>

          <S.OpinionInfo>
            <S.PostTitle>{opinion.post.title}</S.PostTitle>

            <S.OpinionText>{opinion.text}</S.OpinionText>
            <S.OpinionCreatedAt>
              {opinion.createdAtFormatted}
            </S.OpinionCreatedAt>
          </S.OpinionInfo>
        </S.Opinion>
      ))}

      {opinions.length === 0 && (
        <S.TextNullstate>Você não tem nenhuma opinião</S.TextNullstate>
      )}
    </>
  );
};

export default Opinions;
