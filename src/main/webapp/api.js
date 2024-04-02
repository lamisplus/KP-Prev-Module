export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEyMDc0MTM2fQ.AQX_zFUD4Jj8hCVDof4sL7wDjAvRla4Aq8vDLQJmTYMh71tTLsfHRErF6QfmaAwK-ClTFu8MAvmWzKKANDdSNA"
    : new URLSearchParams(window.location.search).get("jwt");