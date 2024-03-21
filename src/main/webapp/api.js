export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExMDI5MzQzfQ.jLw31DGRJ1f0TdKh_A1PNga6gelUhEK6pAXPP5JRXooVEAlxbqNSx9_yEWQyQ1gvgd4CMUHTX9tP8CGvlSc6TA"
    : new URLSearchParams(window.location.search).get("jwt");