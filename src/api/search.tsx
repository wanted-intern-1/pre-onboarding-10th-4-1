import apiRequest from ".";

const RESOURCE = "/search";

type ISearch = {
  q: string;
  page?: number;
  limit?: number;
};

const getSearch = async (data: ISearch) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`, {
      params: { ...data },
    });

    return response;
  } catch (error) {
    throw new Error("API getTodoList error");
  }
};

export const searchApi = {
  getSearch,
};
