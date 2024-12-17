import axios from "axios";
import { token, url as baseUrl } from "../../api";

// Function to remove duplicates
const removeDuplicates = (arr, key) => {
  const uniqueSet = new Set();
  return arr.filter((item) => {
    const isDuplicate = uniqueSet.has(item[key]);
    uniqueSet.add(item[key]);
    return !isDuplicate;
  });
};

export const fetchKpPrevPatients = async ({ page, pageSize, search }) => {
  const response = await axios.get(
    `${baseUrl}kpprev?pageSize=${pageSize}&pageNo=${page}&searchParam=${search}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return { ...response.data, records: removeDuplicates(response.data?.records, "patientId") };
};