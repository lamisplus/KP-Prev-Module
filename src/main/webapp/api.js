export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNTU1NTYzfQ.nLKDYCl1LY5JneaE4G9cDTCSbalfi9ZimVW-JuvTgLWTTcSw--WStD0AQJsSQzimyCxia-qIEis3NOF07hJAjg"
    : new URLSearchParams(window.location.search).get("jwt");