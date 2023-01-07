/* ====== editPost ===== */
function editPost() {
  // check is button cliked is in home page or profile page
  const checkProfile = document.getElementById("delete-post-profile-id-input");

  // get postEditId (post choosen to edit) from input value
  const postEditId = document.getElementById("edit-post-id-input").value;
  // get token from localStorage
  const token = localStorage.getItem("token");
  // get title input value
  const title = document.querySelector(".edit-title-post").value;
  // get body input value
  const body = document.querySelector(".edit-body-post").value;
  // get image input file
  const image = document.querySelector(".edit-image-post").files[0];
  // declared form data (because is there image file)
  let formData = new FormData();

  formData.append("title", title); // send title to FormData() object
  formData.append("body", body); // send body to FormData() object
  formData.append("image", image); // send image to FormData() object
  formData.append("_method", "put"); // back end problem solution (probel from back end method put)
  const headers = {
    authorization: `Bearer ${token}`,
  };
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  axios
    .post(`https://tarmeezacademy.com/api/v1/posts/${postEditId}`, formData, {
      headers,
    })
    .then((response) => {
      // call showAlert function to show message
      showAlert(`post has benn edit successfly`, "success");
      // check is button edit cliked in profile page or home page
      if (checkProfile == null) {
        // if is in home page call function getposts from home page
        getPosts(currentPage, true);
      } else {
        // if is in profile page call function getposts from getPostUser page
        getPostUser();
      }
    })
    .catch((errors) => {
      console.log(errors.response.data.message);
      showAlert(`${errors.response.data.message}`, "danger");
    })
    .finally(() => {
      // call toggleLodear function to hide lodear because the response (then) is done
      toggleLodear(false);
    });
}

/* ==== getEDitPost ===== */
function getEDitPost(postObject) {
  // get post edit (post choosen or clicked) transform obj html to javascript.
  const post = JSON.parse(decodeURIComponent(postObject));
  // set id of post choosen (post id choosen or cliked) to input value.
  document.getElementById("edit-post-id-input").value = post.id;
  // set  title input to old title value
  document.querySelector(".edit-title-post").value = post.title;
  // set body title input to old body value
  document.querySelector(".edit-body-post").value = post.body;
}

/* ==== deletePost ===== */
function deletePost(postObject) {
  // get post edit (post choosen or clicked) transform obj html to javascript.
  const post = JSON.parse(decodeURIComponent(postObject));
  console.log(post);
  // set post id delete choosen to input value
  document.getElementById("delete-post-id-input").value = post.id;

  document.getElementById("delete-post-title").innerHTML = post.title;
}

function confirmDeletePost() {
  // check is button cliked is in home page or profile page
  const checkProfile = document.getElementById("delete-post-profile-id-input");
  //get post delelte choosen id from input value
  postId = document.getElementById("delete-post-id-input").value;
  // get token form localStorage
  const token = localStorage.getItem("token");
  //
  const headers = {
    authorization: `Bearer ${token}`,
  };
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  axios
    .delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`, { headers })
    .then((response) => {
      // call showAlert function to show message
      showAlert(`post has benn deleted successfully`, "success");
      // check is button delete cliked in profile page or home page
      if (checkProfile == null) {
        // if is in home page call function getposts from home page
        getPosts(currentPage);
      } else {
        // if is in profile page call function getposts from getPostUser page
        getPostUser();
      }
    })
    .catch((errors) => {
      console.log(errors);
    })
    .finally(() => {
      // call toggleLodear function to hide lodear because the response (then) is done
      toggleLodear(false);
    });
}

/*== showAlert ==*/
function showAlert(customMessage, type) {
  const alertPlaceholder = document.getElementById("successAlert");

  const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  alert(customMessage, type);
}

/* ====== goToProfileUser ===== */

function goToProfileUser(id) {
  // get id from choosen user (clicked user)
  // go to profile page and send id like a query params
  window.location = `profile.html?userId=${id}`;
}

/****====== Logout Function ========****/
function logout(e) {
  // call funtion successAlert
  showAlert(`          logged out successfully           `, "success");
  // remov token from localStorage
  localStorage.removeItem("token");
  // remov user from localStorage
  localStorage.removeItem("user");
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  // go to  login page after 2 seconds
  setTimeout(() => {
    // call toggleLodear function to hide lodear because the response (then) is done
    toggleLodear(false);
    window.location = "login.html";
  }, 2000);
}

/****====== toggleLodear Function ========****/
function toggleLodear(show = false) {
  if (show) {
    // show lodear
    document.querySelector(".lodear").style.display = "block";
    // hide lodear
  } else {
    document.querySelector(".lodear").style.display = "none";
  }
}
