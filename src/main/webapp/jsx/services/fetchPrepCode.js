import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchPrepCode = async (id) => {

  const response = await axios.get(`${baseUrl}prep/persons/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  
  return response.data;
};
