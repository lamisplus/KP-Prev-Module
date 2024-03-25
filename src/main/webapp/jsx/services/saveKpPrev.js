import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const saveKpPrev = async (data) => {
  const response = await axios.post(`${baseUrl}kpprev`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};