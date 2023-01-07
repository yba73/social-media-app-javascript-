// get all query params from url
const urlParams = new URLSearchParams(window.location.search);
// get query param postId  from objecte URLSearchParams
const postId = urlParams.get("postId");

/* === get post === */
function getPost() {
  // selector posts div to append post
  const postsDom = document.querySelector(".posts");
  // get token  from  localStorage
  const token = localStorage.getItem("token");
  // get post by axios
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts/${postId}`)
    .then((response) => {
      // call toggleLodear function to hide lodear because the response (then) is done
      toggleLodear(false);
      // declaration of post
      const post = response.data.data;
      console.log(post);
      postsDom.innerHTML = ` 
            <!-- Start Post -->
              <h1>${post.author.username} post</h1>
              <div class="card shadow my-3 ">
                <div class="card-header post-detail">
                    <img
                    src="${post.author.profile_image}"
                    alt="user"
                        class="img-user mx-2 rounded-circle border border-2"
                    />
                    <b>@${post.author.username}</b>
                  
                </div>

                <div class="card-body">
                  <img
                    src="${post.image}"
                    class="w-100 post-img"
                    alt="post-img"
                    />
                    <h6 class="mt-2 time-ago">${post.created_at}</h6>
                     <h5 class="">${
                       post.title !== null ? post.title : "title"
                     }</h5>
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
                     ${
                       token
                         ? `    <div class="add-comment">
                     <input
                       type="text"
                       class="form-control add-comment-input"
                       id="formGroupExampleInput2"
                       placeholder="add comment"
                     />
                     <button type="submit" class="add-comment-btn" onclick="addComment()">
                       add comment
                     </button>
                   </div>
               </div>`
                         : ""
                     }
                 
                    
                 </div>
              
              </div>
            <!-- End Post -->`;

      // add tags exemple
      const tags = post.tags.length
        ? post.tags
        : [{ name: "comedy" }, { name: "action" }, { name: "policy" }];
      const tagPostId = `tags-post-${post.id}`;
      const psotTags = document.getElementById(tagPostId);

      tags.forEach(
        (tag) =>
          (psotTags.innerHTML += ` <button type="button" class="btn btn-secondary ">${tag.name}</button>`)
      );

      // add comments
      const commmentsPost = post.comments.length ? post.comments : [];

      commmentsPost.forEach((post) => {
        document.querySelector(".comments-post-show").innerHTML += `
        <div class="comments-info">
                <img
                src="${post.author.profile_image}"
                alt="user"
                class="img-user-comment mx-2 rounded-circle border border-2 my-3"
                />
            <div class="user-comment" > 
                
                 <h5 >${post.author.username}</h5> 
                 <p>${post.body}</p> 
             </div>
        </div>
        
        `;
      });
    });
}
getPost();

/* =====showComments===== */
function showComments() {
  if (document.querySelector(".comments-post").style.display === "none") {
    document.querySelector(".comments-post").style.display = "block";
  } else {
    document.querySelector(".comments-post").style.display = "none";
  }
}

/* =====addComment===== */
function addComment() {
  // get body Comment value from input comment
  const bodyComment = document.querySelector(".add-comment-input").value;
  // get token  from  localStorage
  const token = localStorage.getItem("token");
  // declaration of headers
  const headers = {
    authorization: `Bearer ${token}`,
  };

  axios
    // post comment by axios and send body params and headers.
    .post(
      `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
      { body: bodyComment },
      {
        headers,
      }
    )
    // promise fulfilled ( resolve )
    .then((response) => {
      // call function getPosts for show the new comment
      getPost();
      // call  showAlert for show success add comment message
      showAlert(`success add new comment`, "success");
    })
    // promise rejected ( reject )
    .catch((errors) => {
      console.log(errors);
      // call  showAlert for show errors message
      showAlert(`${errors.response.data.message}`, "danger");
    });
}
