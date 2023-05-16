import apiRequest from ".";

const RESOURCE = "/search";

export const getSearch = async (data: {
  q: string;
  page?: number;
  limit?: number;
}) => {
  try {
    console.log("getSearch!", data);
    const response = await apiRequest.get(`${RESOURCE}`, {
      params: { ...data },
    });

    return response;
  } catch (error) {
    throw new Error("API getTodoList error");
  }
};
