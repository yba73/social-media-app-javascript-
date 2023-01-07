/****====== Register Function ========****/
function register(e) {
  //cancels the event if it is cancelable
  e.preventDefault();
  // take username value from input
  const username = document.querySelector(".username").value;
  // take email value from input
  const email = document.querySelector(".email").value;
  // take name value from input
  const name = document.querySelector(".name").value;
  // take password value from input
  const password = document.querySelector(".password").value;
  // take password value from input
  const image = document.querySelector(".image").files[0];
  // declared form-data
  let formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("name", name);
  formData.append("password", password);
  formData.append("image", image);
  // call toggleLodear to Waiting until the response (then) is done
  toggleLodear(true);
  axios

    .post(
      `https://tarmeezacademy.com/api/v1/register
      `,
      formData // send form-data
    )
    .then((response) => {
      //   console.log(response);
      showAlert(`           register user  successfully   `, "success");
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
      showAlert(
        `    ${
          error.response.data.errors.username // Alert error username
            ? error.response.data.errors.username
            : ""
        }
        
        ${
          error.response.data.errors.email // Alert error email
            ? error.response.data.errors.email
            : ""
        }
           ${
             error.response.data.errors.name // Alert error name
               ? error.response.data.errors.name
               : ""
           }
           ${
             error.response.data.errors.password // Alert error password
               ? error.response.data.errors.password
               : ""
           },
          `,
        "danger"
      );
    })
    .finally(() => {
      // call toggleLodear function to hide lodear because the response (then) is done
      toggleLodear(false);
    });
}

//  btn Regsiter DOM
let btnRegister = document.querySelector(".btn-register");
// addEventListener to button of register
btnRegister.addEventListener("click", register);
