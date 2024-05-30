const currentEnvironment = process.env.NODE_ENV;

export const url =
  currentEnvironment === "development"
    ? "http://192.168.149.128:8383/api/v1/"
    : "/api/v1/";
export const token =
  currentEnvironment === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE3MDkzMDUxfQ.RdKPkQIHXdB0Zc0DSzNWB8fFpxmTQ1gCWVDjkrV1mA7sZGcIA8Y6eV-9XpYrYxY-3pJRaH64404EDys7YWsQCg"
    : new URLSearchParams(window.location.search).get("jwt");
