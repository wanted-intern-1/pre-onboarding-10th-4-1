export type ITodo = {
  id: string;
  title: string;
};

export interface IResSearchList {
  q: string;
  result: ITodo[];
  qty: number;
  total: number;
  page: number;
  limit: number;
}
