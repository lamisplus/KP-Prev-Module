import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchStates = async (id = 1) => {
  const response = await axios.get(
    `${baseUrl}organisation-units/parent-organisation-units/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};