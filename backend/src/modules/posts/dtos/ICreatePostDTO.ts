interface IFileImage {
  filename: string;
}

export default interface ICreatePostDTO {
  title: string;
  description: string;
  user_id: string;
  category_id: string | null;
  images: IFileImage[];
}
