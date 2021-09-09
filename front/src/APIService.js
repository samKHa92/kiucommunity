export default class APIService {
  static LoginUser(body) {
    return fetch("http://localhost:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static RegisterUser(body) {
    return fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static GetUserData(username) {
    return fetch(`http://localhost:8000/users/${username}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetPostData(id) {
    return fetch(`http://localhost:8000/posts/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetAllUsers() {
    return fetch("http://localhost:8000/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  static GetAllPosts() {
    return fetch("http://localhost:8000/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  // static UpdateArticle(article_id, body, token) {
  //   return fetch(`http://http://127.0.0.1:8000/api/articles/${article_id}/`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${token}`,
  //     },
  //     body: JSON.stringify(body),
  //   }).then((resp) => resp.json);
  // }

  // static AddArticle(body, token) {
  //   return fetch("http://127.0.0.1:8000/api/articles/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${token}`,
  //     },
  //     body: JSON.stringify(body),
  //   }).then((resp) => resp.json);
  // }

  // static DeleteArticle(article_id, token) {
  //   return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${token}`,
  //     },
  //   });
  // }
}
