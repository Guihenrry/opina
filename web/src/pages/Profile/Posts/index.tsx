import React, { useState, useEffect, useCallback } from 'react';

import { FiFolderMinus } from 'react-icons/fi';
import * as S from './styles';
import api from '../../../services/api';
import useToast from '../../../hooks/useToast';

interface PostImage {
  image: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  category: {
    title: string;
  };
  images: PostImage[];
  created_at: string;
  createdAtFormatted: string;
}

const Posts: React.FC = () => {
  const { addToast } = useToast();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api
      .get<Post[]>('/posts/me')
      .then((response) => {
        const data = response.data.map((post) => {
          const date = new Date(post.created_at);
          const day = date.getDay().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();

          return {
            ...post,
            createdAtFormatted: `${day}/${month}/${year}`,
          };
        });

        setPosts(data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Algo deu errado',
          description: 'Ops não conseguimos conectar com o servidor',
        });
      });
  }, [addToast]);

  const handleDeletePost = useCallback(
    async (id) => {
      try {
        await api.delete(`/posts/${id}`);

        setPosts(posts.filter((post) => post.id !== id));
      } catch {
        addToast({
          type: 'error',
          title: 'Algo deu errado',
          description: 'Ops não conseguimos conectar com o servidor',
        });
      }
    },
    [posts, addToast],
  );

  return (
    <>
      <S.Title>Minhas postagens</S.Title>

      {posts.map((post) => (
        <S.Post key={post.id}>
          <S.PostImage src={post.images[0]?.image} />
          <S.PostInfo>
            <S.PostTitle>{post?.title}</S.PostTitle>
            <S.Category>{post.category?.title}</S.Category>

            <S.Description>{post.description}</S.Description>
            <S.CreatedAt>{post.createdAtFormatted}</S.CreatedAt>
            <S.DeleteButton
              type="button"
              onClick={() => handleDeletePost(post.id)}
            >
              <FiFolderMinus />
            </S.DeleteButton>
          </S.PostInfo>
        </S.Post>
      ))}

      {posts.length === 0 && (
        <S.TextNullstate>Você não tem nenhuma postagem</S.TextNullstate>
      )}
    </>
  );
};

export default Posts;
