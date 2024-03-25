import axios from "axios";
import { token, url as baseUrl } from "./../../api";

export const updateKpPrevRecord = async (args) => {
  const response = await axios.put(`${baseUrl}kpprev/${args?.id}`, args?.data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
