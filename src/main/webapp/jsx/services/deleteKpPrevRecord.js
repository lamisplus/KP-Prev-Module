import axios from "axios";
import { token, url as baseUrl } from "./../../api";

export const deleteKpPrevRecord = async (args) => {
  const response = await axios.delete(
    `${baseUrl}kpprev/${args?.id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};