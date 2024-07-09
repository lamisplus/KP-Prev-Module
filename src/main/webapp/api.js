const currentEnvironment = process.env.NODE_ENV;

export const url =
  currentEnvironment === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  currentEnvironment === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzIwNTQ2NzM1fQ.jD3alnOPRWKvfoQR9O_lVTkifloGdSXkISE2mc_xVsdTe-Yw3GxA71jnsv7fHvDJ6JR1t3IZ2PYDa41Sld_qpw"
    : new URLSearchParams(window.location.search).get("jwt");
