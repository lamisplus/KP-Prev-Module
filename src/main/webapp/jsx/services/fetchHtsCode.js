import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchHtsCode = async (id) => {
  const response = await axios.get(`${baseUrl}hts/persons/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
