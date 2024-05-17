const currentEnvironment = process.env.NODE_ENV;

export const url =
  currentEnvironment === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  currentEnvironment === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE1OTcyMzIyfQ.beuoIvIdxoZP1N89ICv-OqYVDSz9k5Cd69vns1ZJgplFNZhIpQfpo7YsI_LiMDKtwUEKuB-Sf7CDiA-rTuciHg"
    : new URLSearchParams(window.location.search).get("jwt");
