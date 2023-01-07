// get all query params from url
const urlParams = new URLSearchParams(window.location.search);
// get query param postId  from objecte URLSearchParams
const userId = urlParams.get("userId");
/*=== get user ===*/
function getUser() {
  // selecte profile dom dive
  const profileDom = document.querySelector(".profile-info");
  // get user log in from the localStorage
  const userLogged = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  // get token from the localStorage
  const token = localStorage.getItem("token");
  // get user info by axios

  axios
    .get(`https://tarmeezacademy.com/api/v1/users/${userId}`)
    // resolve
    .then((response) => {
      console.log(response.data.data);
      // get user info from response
      const userProfile = response.data.data;
      // set user info to profile dom div
      profileDom.innerHTML = `
      <div class="wrapper my-5">
              <div class="left">
                <img src="${
                  userProfile.profile_image
                }" alt="user" width="100" />
                <h3>${userProfile.username}</h3>
                <p>fullstack  Developer</p> 
                ${
                  userLogged.id == userId
                    ? `     <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#edit-profile">
                edit profile
                </button>`
                    : ``
                } 
           

                
              </div>
              <div class="right">
                <div class="info">
                  <h3>Information</h3>
                  <div class="info_data">
                    <div class="data">
                      <h4>Email</h4>
                      <p>${userProfile.email ? userProfile.email : "email"}</p>
                    </div>
                    <div class="data">
                      <h4>name</h4>
                      <p>${userProfile.name}</p>
                    </div>
                  </div>
                </div>

                <div class="projects">
  
                  <div class="projects_data">
                    <div class="data">
                      <h4>posts count</h4>
                      <p class="count">${userProfile.posts_count}</p>
                    </div>
                    <div class="data">
                      <h4>comments count</h4>
                      <p class="count">${userProfile.comments_count}</p>
                    </div>
                  </div>
                </div>

                <div class="social_media">
                  <ul>
                    <li>
                      <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-instagram"></i></a>
                    </li>
                  </ul>
                </div>
             
            </div>
      `;
    })
    .catch((error) => {
      console.log(error);
    });
}
getUser();

/*=== getPostUser ===*/
function getPostUser() {
  // selector posts div to append post
  const postsDom = document.querySelector(".posts");
  // get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  // fill page from post
  postsDom.innerHTML = ``;
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  axios
    .get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`)
    .then((response) => {
      // call toggleLodear function to hide lodear because the response (then) is done
      toggleLodear(false);
      console.log(response);
      // get posts from response
      const posts = response.data.data;
      // loop posts and set info posts to profile page
      posts.forEach((post) => {
        // check is post author id = user logged id
        const MyPost = user != null && user.id == post.author.id;

        postsDom.innerHTML += ` 
        <!-- Start Post -->
          <h1>${post.author.username} posts</h1>
          <div class="card shadow my-3 ">
            <div class="card-header post-detail d-flex">
                <img
                src="${post.author.profile_image}"
                alt="user"
                    class="img-user mx-2 rounded-circle border border-2"
                />
                <b>@${post.author.username}</b>
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

            <div class="card-body">
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

              <div class="card-comment">
                <i class="fa-solid fa-pen"></i>
                <span class="show-comments" onclick="showComments()">(${
                  post.comments_count
                })comments</span>
                <span id="tags-post-${post.id}">   </span>
              </div>

                <div class="comments-post ">
                  <div class="comments-post-show">
                      
                  </div>
                
                
             </div>
          
          </div>
        <!-- End Post -->`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
getPostUser();
