const submit = document.getElementById("loginSubmit");
const emailField = document.getElementById("email");
const passField = document.getElementById("password");
const errorMessage = document.getElementById("error");

submit.addEventListener("click", async function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email, // Ensure this matches API expectations
        password: password,
        expiresInMins: 30, // Optional, defaults to 60
      }),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    console.log("Login successful:", data);
    (emailField.style.borderColor = "green"),
      (passField.style.borderColor = "green");
    errorMessage.style.display = "none";

    localStorage.setItem("token", JSON.stringify(data.accessToken)); // Store access token in localstorage
    window.location.href = "http://127.0.0.1:5500/";
  } catch (error) {
    errorMessage.style.display = "block";
    (emailField.style.borderColor = "red"),
      (passField.style.borderColor = "red");
  }
});
