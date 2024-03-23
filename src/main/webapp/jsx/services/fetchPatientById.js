import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchPatientById = async (id) => {

  const response = await axios.get(`${baseUrl}patient/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
