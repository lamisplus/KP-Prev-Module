import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchCodesets = async (codeset) => {
  const response = await axios.get(
    `${baseUrl}application-codesets/v2/${codeset}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
