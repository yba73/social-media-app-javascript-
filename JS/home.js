// declaration of lastPage
let lastPage = 1;

/***** GET ALL Posts ****/
function getPosts(page = 1, relaod = true) {
  // select the div name posts (the parent of post)
  const postsDom = document.querySelector(".posts");
  if (relaod) {
    // fill page home from posts
    postsDom.innerHTML = ``;
  }

  // get user logged from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  // get posts by axios and send page like a query params
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
    .then((response) => {
      // call toggleLodear function to hide lodear because the response (then) is done
      toggleLodear(false);

      // declartaion of posts (get posts from response object)
      const posts = response.data.data;
      // assignment lastPage to new value
      lastPage = response.data.meta.last_page;
      posts.forEach((post) => {
        // check post cliked (choosen) is my post and user log in
        const MyPost = user != null && user.id == post.author.id;

        postsDom.innerHTML += ` 
          <!-- Start Post -->
            <div class="card shadow mt-3 card-details" >
              <div class="card-header post-header d-flex " >
                <span class="user-profile-btn" onclick="goToProfileUser(${
                  post.author.id
                })">
                  <img
                    src="${post.author.profile_image}"
                    alt="user"
                    class="img-user mx-2 rounded-circle border border-2"
                  />
                  <b >
                    @${post.author.username} 
                  </b>
                </span>
                ${
                  MyPost
                    ? `   <button  class="btn btn-primary  btn-edit-post"  data-bs-toggle="modal" 
                data-bs-target="#edit-post" 
                onclick="getEDitPost('${encodeURIComponent(
                  JSON.stringify(post)
                )}')"
                     >
                    edit
                </button>
                <button class="btn btn-danger mx-2"   data-bs-toggle="modal"
                        data-bs-target="#delete-post" onclick="deletePost('${encodeURIComponent(
                          JSON.stringify(post)
                        )}')"> delete </button>
                
                `
                    : ""
                }
             
               
              </div>
              <div class="card-body" onclick="postDetail(${post.id})" >
                <img
                  src="${post.image}"
                  class="w-100 post-img"
                  alt="post-img"
                />
                <h6 class="mt-2 time-ago">${post.created_at}</h6>
                <h5 class="">${post.title !== null ? post.title : "title"}</h5>
      
                <p class="card-text">
                 ${
                   post.body.length
                     ? post.body
                     : ` With supporting text below as a natural lead-in to 
                          additional content.`
                 }
               
                </p>
                <hr />
                <div class="comment">
                  <i class="fa-solid fa-pen"></i>
                  <span>(${post.comments_count})comments</span>
                  <span id="tags-post-${post.id}">   </span>
                
                </div>
              </div>

             
            </div>
          <!-- End Post -->`;
        // add tags exemple
        const tags = post.tags.lengths
          ? posts.tags
          : [{ name: "comedy" }, { name: "action" }, { name: "policy" }];
        const tagPostId = `tags-post-${post.id}`;
        const psotTags = document.getElementById(tagPostId);

        tags.forEach(
          (tag) =>
            (psotTags.innerHTML += ` <button type="button" class="btn btn-secondary ">${tag.name}</button>`)
        );
      });
      // get token from localStorage
      const token = localStorage.getItem("token");
      // check user is logged or not to show button add post
      token
        ? (document.querySelector(".add-new-post").style.display = "block")
        : document
            .querySelector(".add-new-post")
            .setAttribute("style", "display:none !important");
    })
    .catch((errors) => {
      console.log(errors);
    });
}

getPosts();

/***** Create New Posts ****/
function addPost() {
  // get title input value
  const title = document.querySelector(".add-title-post").value;
  // get body input value
  const body = document.querySelector(".add-body-post").value;
  // get image input file
  const image = document.querySelector(".add-image-post").files[0];
  // declared form data (because is there image file)
  let formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image);

  // get  token from localStorage
  const token = localStorage.getItem("token");
  // set  token to headers
  const headers = {
    authorization: `Bearer ${token}`,
  };
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  axios
    .post(
      `https://tarmeezacademy.com/api/v1/posts
  `,
      formData,
      {
        headers,
      }
    )
    // promise fulfilled ( resolve )
    .then((response) => {
      // call function getPosts for show the new post
      getPosts();
      // Alert success for  add new post
      showAlert(`New Post has been created`, "success");
    })
    // promise rejected ( rejecte )
    .catch((error) => {
      // call Alert function to show error message  for operation of add new post
      showAlert(
        `${
          error.response.data.errors.title // error title message from back (api)
            ? error.response.data.errors.title
            : ""
        } ${
          error.response.data.errors.body ? error.response.data.errors.body : "" // error body message from back (api)
        } ${
          error.response.data.errors.image // error image message from back (api)
            ? error.response.data.errors.image
            : ""
        }`,
        // color of message Alert (danger = color red)
        "danger"
      );
    })
    .finally(() => {
      // call toggleLodear function to hide lodear because the response (then) is done
      toggleLodear(false);
    });
}
// selector btn add post
const addPostBtn = document.querySelector(".add-post-btn");
// addEventListener to btn add post
addPostBtn.addEventListener("click", addPost);

/* ====== postDetail ===== */
const postDetail = (postId) => {
  // go to postDetail page and send post id as query params
  window.location = `postDetail.html?postId=${postId}`;
};

/* ==== handleInfiniteScroll ===== */
// declaration of currentPage
let currentPage = 1;
const handleInfiniteScroll = () => {
  // declaration of endOfPage (end of page by cursor)
  const endOfPage =
    // Measure the width and height of the page and compare it to the end of the page
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2; // -2 by me for to avoid error pagination

  if (endOfPage && currentPage < lastPage) {
    // currentPage plus 1 to go to the next page and send currentPage to getPosts like an agrument for show current page.
    getPosts(++currentPage, false);
  }
};

window.addEventListener("scroll", handleInfiniteScroll);
