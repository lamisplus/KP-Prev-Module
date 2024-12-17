const currentEnvironment = process.env.NODE_ENV;

export const url =
  currentEnvironment === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  currentEnvironment === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzM0NDYwMDQwfQ.mLLcDaJOV3vw4amDNqY1bq8McahO8XXTJ7951MJmo07ZqHR-x6P6pdRvpW7b8OfvOjuVgWuTFhlTGEp7bp-KdQ"
    : new URLSearchParams(window.location.search).get("jwt");
