import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchCombinedHtsAndPrepCode = async (id) => {
  try {
    
    const response1 = await axios.get(`${baseUrl}hts/persons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const hts = response1.data;

   
    const response2 = await axios.get(`${baseUrl}prep/persons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const prep = response2.data;

    return { hts, prep };
  } catch (error) {
    throw error;
  }
};


