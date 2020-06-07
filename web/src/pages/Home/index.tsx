import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router';
import { FiSearch, FiMessageCircle } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Avatar from '../../components/Avatar';
import Loading from '../../components/Loading';

import useQuery from '../../hooks/useQuery';
import api from '../../services/api';

import * as S from './styles';
import useAuth from '../../hooks/useAuth';

interface PostImage {
  image: string;
}

interface Opinion {
  id: string;
}

interface Post {
  id: string;
  title: string;
  images: PostImage[];
  opinions: Opinion[];
  user: {
    name: string;
    avatar_url: string;
  };
}

interface DataState {
  posts: Post[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  title?: string;
  category?: string;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const query = useQuery();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');

  const categories = useMemo(() => {
    return ['Eletronicos', 'Eletrodomésticos', 'Moda'];
  }, []);

  const [
    { page, posts, category, title, hasMore, isLoading },
    setData,
  ] = useState<DataState>({
    posts: [],
    isLoading: true,
    hasMore: true,
    page: 1,
    title: query.get('search') || undefined,
    category: query.get('category') || undefined,
  });

  useEffect(() => {
    api
      .get('/posts', {
        params: {
          page,
          category,
          title,
        },
      })
      .then((response) => {
        setData((state) => {
          const updatedPosts = [...state.posts, ...response.data];
          const total = Number(response.headers['x-total-count']);

          return {
            ...state,
            posts: updatedPosts,
            hasMore: updatedPosts.length < total,
            isLoading: false,
          };
        });
      });
  }, [page, category, title]);

  const handleScroll = useCallback(() => {
    if (!hasMore || isLoading) return;

    const scrollHeight =
      document.documentElement.scrollTop + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollHeight === documentHeight) {
      setData((state) => {
        return {
          ...state,
          page: state.page + 1,
          isLoading: true,
        };
      });
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleChangeCategory = useCallback(
    (newCategory: string | undefined) => {
      if (newCategory === category) return;
      navigate({
        search: newCategory ? `?category=${newCategory}` : '',
      });

      setData((state) => {
        return {
          ...state,
          category: newCategory,
          title: undefined,
          page: 1,
          isLoading: true,
          hasMore: true,
          posts: [],
        };
      });
    },
    [navigate, category],
  );

  const handleChangeTitle = useCallback(
    (newTitle: string | undefined) => {
      if (newTitle === title) return;

      navigate({
        search: newTitle ? `?search=${newTitle}` : '',
      });

      setData((state) => {
        return {
          ...state,
          title: newTitle,
          category: undefined,
          page: 1,
          isLoading: true,
          hasMore: true,
          posts: [],
        };
      });
    },
    [navigate, title],
  );

  const handleSubmitSearch = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      handleChangeTitle(searchInput || undefined);
    },
    [handleChangeTitle, searchInput],
  );

  const handleChangeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    [],
  );

  return (
    <>
      <S.Intro>
        <S.IntroContent>
          <S.IntroTitle>
            O <S.IntroLogo>Opina</S.IntroLogo> é sua experiência
          </S.IntroTitle>
          <S.IntroText>
            O opina é o lugar certo para se expressar e saber a opinião do
            publico sobre um produto.
          </S.IntroText>
          <Link to={user ? '/profile/add-post' : '/signup'}>
            <Button type="button">
              {user ? 'Cadastrar post' : 'Criar sua conta'}
            </Button>
          </Link>
        </S.IntroContent>
      </S.Intro>

      <S.Filters>
        <S.CategoryButton
          type="button"
          onClick={() => handleChangeCategory(undefined)}
          active={category === undefined ? 1 : 0}
        >
          Todas
        </S.CategoryButton>

        {categories.map((categoryName) => (
          <S.CategoryButton
            key={categoryName}
            type="button"
            onClick={() => handleChangeCategory(categoryName)}
            active={category === categoryName ? 1 : 0}
          >
            {categoryName}
          </S.CategoryButton>
        ))}

        <form onSubmit={handleSubmitSearch}>
          <Input
            icon={FiSearch}
            placeholder="Buscar"
            value={searchInput}
            onChange={handleChangeSearchInput}
          />
        </form>
      </S.Filters>

      <S.Posts>
        {posts.map((post) => (
          <S.Post key={post.id}>
            <Link to={`post/${post.id}`}>
              <S.PostInfo>
                <S.PostImage image={post.images[0].image} />

                <S.PostDetail>
                  <S.PostUser>
                    <Avatar name={post.user.name} url={post.user.avatar_url} />
                    <span>{post.user.name}</span>
                  </S.PostUser>

                  <S.PostOpinions>
                    <FiMessageCircle /> {post.opinions.length}
                  </S.PostOpinions>
                </S.PostDetail>
              </S.PostInfo>

              <S.PostTitle>{post.title}</S.PostTitle>
            </Link>
          </S.Post>
        ))}
      </S.Posts>

      {isLoading && <Loading />}

      {!isLoading && posts.length === 0 && (
        <S.TextNullstate>Ops nenhum resultado encontrado</S.TextNullstate>
      )}
    </>
  );
};

export default Home;
