const loginButton = document.getElementById("LoginButton");
const signoutButton = document.getElementById("signoutButton");
const accessToken = JSON.parse(localStorage.getItem("token"));

loginButton.addEventListener(`click`, function () {
  window.location.href = "http://127.0.0.1:5500/pages/login.html";
});

signoutButton.addEventListener(`click`, function () {
  localStorage.removeItem("token");
  loginButton.style.display = "block";
  signoutButton.style.display = "none";
});

function isLoggedIN() {
  if (accessToken != null) {
    loginButton.style.display = "none";
    signoutButton.style.display = "block";
  }
}

isLoggedIN();
