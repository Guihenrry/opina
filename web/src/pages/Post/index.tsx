import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useParams } from 'react-router-dom';

import * as S from './styles';
import Button from '../../components/Button';
import api from '../../services/api';
import Loading from '../../components/Loading';
import Opinion from '../../components/Opinion';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

interface Image {
  id: string;
  image: string;
}

interface Opinion {
  id: string;
  text: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

interface Post {
  title: string;
  description: string;
  images: Image[];
  user: {
    name: string;
    avatar_url: string;
  };
}

const Post: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { id } = useParams();

  const [comment, setComment] = useState('');

  const [post, setPost] = useState<Post>({} as Post);
  const [loading, setLoading] = useState(true);

  const [opinions, setOpinions] = useState<Opinion[]>([]);

  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Ocorreu um errro.',
          description: 'Verifique as credenciais informadas e tente novamente.',
        });
      });
  }, [id, addToast]);

  useEffect(() => {
    api
      .get(`/opinions/${id}`)
      .then((response) => {
        setOpinions(response.data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Ocorreu um errro.',
          description:
            'Ops não conseguimos buscar as opiniões tente novamente.',
        });
      });
  }, [id, addToast]);

  const handleChangeComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.target.value);
    },
    [],
  );

  const handleSubmitComment = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        const response = await api.post('/opinions', {
          text: comment,
          post_id: id,
        });

        const newOpinion = {
          ...response.data,
          user,
        };

        setOpinions([newOpinion, ...opinions]);

        setComment('');

        addToast({
          type: 'success',
          title: 'Opinião adicionado!',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Ocorreu um errro.',
          description: 'Verifique as credenciais informadas e tente novamente.',
        });
      }
    },
    [id, comment, addToast, user, opinions],
  );

  const handleDeleteOpinion = useCallback(
    async (opinion_id: string) => {
      try {
        await api.delete(`/opinions/${opinion_id}`);

        addToast({
          type: 'success',
          title: 'Opinião deletada com sucesso',
        });

        setOpinions(opinions.filter((opinion) => opinion.id !== opinion_id));
      } catch {
        addToast({
          type: 'error',
          title: 'Ocorreu um errro.',
          description: 'Não conseguimos deletar a opinião tente novamente.',
        });
      }
    },
    [addToast, opinions],
  );

  const handleEditOpinion = useCallback(
    async (opinion_id: string, text: string) => {
      try {
        await api.put(`/opinions/${opinion_id}`, {
          text,
        });

        addToast({
          type: 'success',
          title: 'Opinião editada com sucesso',
        });

        const updatedOpinions = opinions.map((opinion) => {
          if (opinion_id === opinion.id) {
            return {
              ...opinion,
              text,
            };
          }

          return opinion;
        });

        setOpinions(updatedOpinions);
      } catch {
        addToast({
          type: 'error',
          title: 'Ocorreu um errro.',
          description: 'Não conseguimos editar a opinião tente novamente.',
        });
      }
    },
    [addToast, opinions],
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContainer>
          <S.UserAvatar name={post.user.name} url={post.user.avatar_url} />

          <div>
            <S.Title>{post.title}</S.Title>
            <S.Username>{post.user.name}</S.Username>
          </div>
        </S.HeaderContainer>
      </S.Header>

      <S.Images>
        {post.images.map((image) => (
          <S.Image key={image.id} src={image.image} />
        ))}
      </S.Images>

      <S.Content>
        <S.Comments>
          <S.Subtitle>{opinions.length} Opiniões</S.Subtitle>

          {user && (
            <S.AddComment onSubmit={handleSubmitComment}>
              <S.CommentAvatar name={user.name} url={user.avatar_url} />
              <div>
                <S.AddCommentTextarea
                  placeholder="Adicionar sua opinião"
                  value={comment}
                  onChange={handleChangeComment}
                />

                {comment && <Button type="submit">Adicionar</Button>}
              </div>
            </S.AddComment>
          )}

          {opinions.map((opinion) => (
            <Opinion
              key={opinion.id}
              data={opinion}
              onDelete={handleDeleteOpinion}
              onEdit={handleEditOpinion}
            />
          ))}
        </S.Comments>
        <S.Aside>
          {post.description && (
            <>
              <S.Subtitle>Descrição</S.Subtitle>
              <S.Description>{post.description}</S.Description>
            </>
          )}
        </S.Aside>
      </S.Content>
    </S.Container>
  );
};

export default Post;
