import apiRequest from './index';

const RESOURCE = '/search';

export const getSearch = async (data: {
  q: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`, {
      params: data,
    });

    return response;
  } catch (error) {
    throw new Error('API getSearch error');
  }
};
