import axios from "axios";
import { token, url as baseUrl } from "./../../api";

export const fetchKpPrevRecordByPatientId = async (id) => {
  const response = await axios.get(
    `${baseUrl}kpprev/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};