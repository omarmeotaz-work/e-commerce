const loginButton = document.getElementById("LoginButton");

loginButton.addEventListener(`click`, function () {
  window.location.href = "http://127.0.0.1:5500/pages/login.html";
});

function isLoggedIN() {
  const accessToken = JSON.parse(sessionStorage.getItem("token"));

  if (accessToken != null) {
    loginButton.style.display = "none";
  }
}

isLoggedIN();
