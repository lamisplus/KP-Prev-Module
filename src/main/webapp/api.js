export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE0NTg3NzE0fQ.edNW6Tfw4gSxEANxMQtUpjjuW_kRQfCeEnQzFPx659y8sur1kZD0i6eM1Drrtx1vfFnn47XxictHRs-Qa83vZA"
    : new URLSearchParams(window.location.search).get("jwt");