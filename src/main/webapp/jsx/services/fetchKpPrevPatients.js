import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchKpPrevPatients = async ({ page, pageSize, search }) => {
  const response = await axios.get(
    `${baseUrl}kpprev?pageSize=${pageSize}&pageNo=${page}&searchParam=${search}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};