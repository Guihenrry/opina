import React, {
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
  useMemo,
} from 'react';
// import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import UploadDropzone from '../../../components/UploadDropzone';

import * as S from './styles';
import Input from '../../../components/Input';
import yupValidateField from '../../../utils/yupValidateField';
import useToast from '../../../hooks/useToast';
import api from '../../../services/api';

const AddPost: React.FC = () => {
  const { addToast } = useToast();

  const [image1, setImage1] = useState({} as File);
  const [image2, setImage2] = useState({} as File);
  const [image3, setImage3] = useState({} as File);
  const [image4, setImage4] = useState({} as File);
  const [image5, setImage5] = useState({} as File);

  const [category, setCategory] = useState('');

  const categories = useMemo(() => {
    return ['Eletronicos', 'Eletrodomésticos', 'Moda'];
  }, []);

  const [title, setTitle] = useState({
    value: '',
    error: '',
    schema: Yup.string().required('O campo Titulo é obrigatorio.'),
  });

  const [description, setDescription] = useState({
    value: '',
    error: '',
    schema: Yup.string(),
  });

  const handleChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle({ ...title, value: event.target.value });
    },
    [title],
  );

  const handleChangeDescription = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription({ ...description, value: event.target.value });
    },
    [description],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validTitle = yupValidateField(title, setTitle);

      const images = [image1, image2, image3, image4, image5].filter(
        (image) => image instanceof File,
      );

      if (images.length === 0) {
        addToast({
          type: 'error',
          title: 'Imagem obrigatoria',
          description: 'A postagem deve ter ao menos uma imagem.',
        });
        return;
      }

      if (validTitle) {
        const data = new FormData();

        images.forEach((image) => {
          data.append('images', image);
        });

        if (category) {
          data.append('category', category);
        }

        data.append('title', title.value);
        data.append('description', description.value);

        try {
          await api.post('/posts', data);
          addToast({
            type: 'success',
            title: 'Postagem adicionado!',
            description:
              'Postagem adicionada, já está disponivel para receber opiniões.',
          });
        } catch {
          addToast({
            type: 'error',
            title: 'Ocorreu um errro.',
            description:
              'Verifique as credenciais informadas e tente novamente.',
          });
        }
      }
    },
    [
      title,
      description,
      image1,
      image2,
      image3,
      image4,
      image5,
      addToast,
      category,
    ],
  );

  const handleAddImage1 = useCallback((file: File) => {
    setImage1(file);
  }, []);
  const handleAddImage2 = useCallback((file: File) => {
    setImage2(file);
  }, []);
  const handleAddImage3 = useCallback((file: File) => {
    setImage3(file);
  }, []);
  const handleAddImage4 = useCallback((file: File) => {
    setImage4(file);
  }, []);
  const handleAddImage5 = useCallback((file: File) => {
    setImage5(file);
  }, []);

  return (
    <>
      <S.Title>Adicionar postagem</S.Title>
      <S.UploadContainer>
        <UploadDropzone onFileAdded={handleAddImage1} />
        <UploadDropzone onFileAdded={handleAddImage2} small />
        <UploadDropzone onFileAdded={handleAddImage3} small />
        <UploadDropzone onFileAdded={handleAddImage4} small />
        <UploadDropzone onFileAdded={handleAddImage5} small />
      </S.UploadContainer>

      <S.Label>Categoria</S.Label>
      <S.CategoriesList>
        <S.Category>
          <S.CategoryButton
            type="button"
            active={category === '' ? 1 : 0}
            onClick={() => setCategory('')}
          >
            Nenhuma
          </S.CategoryButton>
        </S.Category>
        {categories.map((categoryName) => (
          <S.Category key={categoryName}>
            <S.CategoryButton
              type="button"
              active={category === categoryName ? 1 : 0}
              onClick={() => setCategory(categoryName)}
            >
              {categoryName}
            </S.CategoryButton>
          </S.Category>
        ))}
      </S.CategoriesList>

      <S.Form onSubmit={handleSubmit}>
        <S.Label htmlFor="title">Titulo</S.Label>
        <Input
          id="title"
          value={title.value}
          error={title.error}
          onChange={handleChangeTitle}
        />
        <S.Label htmlFor="description">Descrição</S.Label>
        <S.TextArea
          id="description"
          value={description.value}
          onChange={handleChangeDescription}
        />
        <S.SubmitButton type="submit">Adicionar postagem</S.SubmitButton>
      </S.Form>
    </>
  );
};

export default AddPost;
