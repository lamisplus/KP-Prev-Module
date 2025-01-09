const currentEnvironment = process.env.NODE_ENV;

export const url =
  currentEnvironment === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  currentEnvironment === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzM2NDQxODE1fQ.PmnGBlb-JP6yeIkwitUlIOH7KULOss4XdpT4TMxk0nDlEEm--z52BhDZTPrXDgepjot-QeejmehXMOrJhQU3dg"
    : new URLSearchParams(window.location.search).get("jwt");
