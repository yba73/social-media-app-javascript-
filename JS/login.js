/****====== Login Function ========****/
function login(e) {
  // cancels the event if it is cancelable
  e.preventDefault();
  // take username value from input
  const username = document.querySelector(".username").value;
  // take password value from input
  const password = document.querySelector(".password").value;
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  axios
    .post(`https://tarmeezacademy.com/api/v1/login`, { username, password })
    .then((response) => {
      // call successAlert function
      showAlert(`           logged in successfully   `, "success");
      // set user into localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // set token of user into localStorage
      localStorage.setItem("token", response.data.token);
      // attend 2s and go to home page.
      setTimeout(() => {
        // go to home page
        window.location = "home.html";
      }, 2000);
    })
    .catch((error) => {
      // Alert error username and password
      showAlert(
        `
  ${
    error.response.data.errors.username // Alert error username
      ? error.response.data.errors.username
      : ""
  }
  
  ${
    error.response.data.errors.password // Alert error password
      ? error.response.data.errors.password
      : ""
  }
  ${
    error.response.data.errors.email ? error.response.data.errors.email : "" // Alert error email
  }

  `,
        "danger"
      );
    })
    .finally(() => {
      // call toggleLodear function to hide lodear because the response (then) is done
      toggleLodear(false);
    });
}
// login btn DOM
const btnLogin = document.querySelector(".btn-login");
// addEventListener to button of login
btnLogin.addEventListener("click", login);
