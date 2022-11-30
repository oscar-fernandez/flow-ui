interface IPageOfItems<T> {
  items: T[];
  hasNext: boolean;
  totalElements: number;
}

export default IPageOfItems;
