import instance from ".";

export const createUser = (data) => {
  instance({
    method: "POST",
    url: "/users",
    data,
  });
};
