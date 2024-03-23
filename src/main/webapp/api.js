export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExMjExNjQ4fQ.MfiEggimcyJK4VMaNVMsWZ-7NJX-7cGAn1GTgL77wxyGvG9sZHqeCp3mzcTTnt6gLw7db3_Zqbyxq3x6nAPTMA"
    : new URLSearchParams(window.location.search).get("jwt");