const currentEnvironment = process.env.NODE_ENV;

export const url =
  currentEnvironment === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  currentEnvironment === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE3NzcyODM0fQ.VShNxKJB4hvO4bBqDdSoXdA8l7qOkFwQ9uF8VNuDGvr_szr6nAqpwYjBuuMrH_zOw2DW7RjIFsa9S38fkdvXKw"
    : new URLSearchParams(window.location.search).get("jwt");
