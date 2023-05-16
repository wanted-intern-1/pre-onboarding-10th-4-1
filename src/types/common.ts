export interface ITodo {
  id: string;
  title: string;
}

export interface IRecommend {
  q: string;
  page: number;
  limit: number;
  result: string[];
  qty: number;
  total: number;
}

export interface IRequest {
  q: string;
  page?: number;
  limit?: number;
}
