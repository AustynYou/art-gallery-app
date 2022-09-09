import instance from ".";

export const createUser = async (data) => {
  try {
    const result = await instance({
      method: "POST",
      url: "/users",
      data,
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getToken = async (data) => {
  try {
    const result = await instance({
      method: "POST",
      url: "/users/token",
      data,
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getMyInfo = async () => {
  try {
    const result = await instance({
      method: "GET",
      url: "/users/my",
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const patchMyProfileImage = async (data) => {
  try {
    const result = await instance({
      method: "PATCH",
      url: "/users/my/profile-image",
      data,
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const putMyInfo = async (data) => {
  try {
    const result = await instance({
      method: "PUT",
      url: "/users/my",
      data,
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};
