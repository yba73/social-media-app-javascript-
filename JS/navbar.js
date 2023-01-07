function getNavbar() {
  // get user from the localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  // get token from the localStorage
  const token = localStorage.getItem("token");
  document.querySelector(".navbar-header").innerHTML = `

  <!-- ======== lodear======= -->
  <div class="lodear">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <!-- ========// lodear //======= -->


  <div class="container-fluid  ">
    <h1 class="navbar-brand" href="#">social media</h1>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active navbar-home" aria-current="page" href="home.html"
              >home</a
            >
          </li>
        
        </ul>
        <div class="d-flex justify-content-end w-100">
        
          ${
            token
              ? `<div class="my-profile" onclick="goToProfileUser(${user.id})"> <img class="nav-profile-img" src="${user.profile_image}" alt="profile-img">
              <button  type="button" class="btn btn-outline-success mx-3 btn-login-nav">  ${user.username}</button> </div>
              <button id="liveAlertBtn" type="button" class="btn btn-outline-danger btn-logout" onclick="logout()"><a href="#">logout</a> </button> `
              : ` <button type="button" class="btn btn-outline-success mx-3 btn-login-nav"> <a href="login.html">login</a> </button> 
              <button type="button" class="btn btn-outline-success btn-register-nav"> <a href="register.html">register</a> </button>`
          }
        </div>
    </div>
  </div>`;
}
getNavbar();
