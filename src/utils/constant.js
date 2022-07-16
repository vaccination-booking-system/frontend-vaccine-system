const CONST = {
  ...(process.env.NODE_ENV === "development" && { BASE_URL_API: `${process.env.REACT_APP_BASE_URL}` }),
  TOKEN: localStorage.getItem("accessToken"),
};

export default CONST;
