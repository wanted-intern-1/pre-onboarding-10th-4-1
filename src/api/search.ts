import apiRequest from './index';

const RESOURCE = '/search';

export const getSearch = async ({
  q = '',
  page,
  limit,
}: {
  q: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`, {
      params: { q, page, limit },
    });

    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};
