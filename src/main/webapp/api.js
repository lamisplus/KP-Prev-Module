export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExMzUxNDUxfQ.vmsh7qF63wZHxIamu7CK4k-oMubJN_vuZSFQDUqnLad7K7nIsG1WNafsTPYW1eTBFO-lPkjoOcmfqgyANcGRTA"
    : new URLSearchParams(window.location.search).get("jwt");