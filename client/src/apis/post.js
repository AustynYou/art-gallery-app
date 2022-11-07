import instance from ".";

export const getPostsMain = async () => {
  try {
    const result = await instance({
      method: "GET",
      url: "/posts/main",
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postPosts = async (data) => {
  try {
    const result = await instance({
      method: "POST",
      url: "/posts",
      data,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};


// getMyPost -> GET /posts/my/:postId -> getPostsMyPost
// export const getMyPost = async () => {
//   try {
//     const result = await instance({
//       method: "GET",
//       url: "/posts/my/:postId",
//     });
//     return result.data;
//   } catch (err) {
//     return err.response.data;
//   }
// };

// Update All data of a post
// putMyPost -> PUT /posts/my/:postId -> putPostsMyPost
export const putMyPost = async (data) => {
  try {
    const result = await instance({
      method: "PUT",
      url: "/posts/edit",
      data,
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteMyPost = async (data) => {
  try {
    const result = await instance({
      method: "DELETE",
      url: "/posts",
      data,
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
};
