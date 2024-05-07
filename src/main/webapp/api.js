export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE1MDc2NDQwfQ.mG1v9q5FmlDHN7kRnNSJwXpYVv18wfyyy1FSyUHhhy3gWoLfeSrlNkBkGjLj1bdXpTdfAg7eMhqvP-Ph_URPdg"
    : new URLSearchParams(window.location.search).get("jwt");