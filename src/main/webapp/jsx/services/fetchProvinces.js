import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchProvinces = async (stateId) => {
  const response = await axios.get(
    `${baseUrl}organisation-units/parent-organisation-units/${stateId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};