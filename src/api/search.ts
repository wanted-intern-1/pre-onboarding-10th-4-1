import apiRequest from "./client";

const RESOURCE = "/search";

const get = async (q: string, page = 1, limit = 10) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`, {
      params: { q, page, limit },
    });

    return response.data;
  } catch (error) {
    throw new Error("API get error");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { get };
