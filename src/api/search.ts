import apiRequest from "./index";

const RESOURCE = "/search";

export const getSearchList = async (keyword: string) => {
  try {
    const response = await apiRequest.get(
      `${RESOURCE}?q=${keyword}&page=1&limit=10`
    );

    return response;
  } catch (error) {
    throw new Error("API getSearchList error");
  }
};
