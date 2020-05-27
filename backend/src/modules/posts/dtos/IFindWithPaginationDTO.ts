export default interface IFindWithPaginationDTO {
  per_page: number;
  page: number;
  category_id: string | undefined;
}
