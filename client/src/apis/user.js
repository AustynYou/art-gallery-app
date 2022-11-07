import instance from ".";

// method, url, parameter = a few things to make an API using axios

// Signup process
// createUser -> POST /users -> postUsers
export const createUser = async (data) => {
  try {
    const result = await instance({
      method: "POST",
      url: "/users",
      data,
    });
    return result.data; // return response from server
  } catch (err) {
    return err.response.data; // return error response from server
  }
};

// Login process: pass token
// getToken -> POST /users/token -> postUsersToken
export const getToken = async (data) => {
  try {
    const result = await instance({
      method: "POST", // To prevent password exposure
      url: "/users/token",
      data,
    });
    return result.data; // returns successful res from the server
  } catch (err) {
    return err.response.data; // returns error res from the server
  }
};

// getMyInfo -> GET /users/my -> getUsersMyInfo
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

// Update Some data of a user
// patchMyProfileImage -> PATCH /users/my/profile-image -> patchUsersMyProfileImage
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

// PUT : 리소스의 모든 것을 업데이트 한다.
// PATCH : 리소스의 일부를 업데이트 한다.

// Update All data of user
// putMyInfo -> PUT /users/my -> putUsersMyInfo
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
