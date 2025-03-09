const loginButton = document.getElementById("LoginButton");
const signoutButton = document.getElementById("signoutButton");
const accountIcon = document.getElementById("account");
const accountdropdown = document.getElementById("dropdownMenuButton");
const accessToken = JSON.parse(localStorage.getItem("token"));
const homelogo = document.getElementById("shopco");
const closeoffer = document.getElementById("close");
const offer = document.getElementById("offertext");

closeoffer.addEventListener("click", function () {
  offer.style.display = "none";
});

homelogo.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/";
});

loginButton.addEventListener(`click`, function () {
  window.location.href = "http://127.0.0.1:5500/pages/login.html";
});

signoutButton.addEventListener(`click`, function () {
  localStorage.removeItem("token");
  loginButton.style.display = "block";
  signoutButton.style.display = "none";
  accountIcon.style.visibility = "hidden";
});

accountdropdown.addEventListener("click", function () {
  signoutButton.style.visibility = "visible";
});

function isLoggedIN() {
  if (accessToken != null) {
    loginButton.style.display = "none";
    signoutButton.style.display = "block";
    accountIcon.style.visibility = "visible";
  }
}

isLoggedIN();
const revholder = document.getElementById("revholder");

async function displayReviews() {
  let reviewers = document.querySelectorAll("#revbox > h4");
  let reviewertext = document.querySelectorAll("#revbox > p");
  console.log(reviewers);
  console.log(reviewertext);

  const response = await fetch(
    "https://dummyjson.com/comments?limit=20&skip=20&select=body,postId"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  console.log(reviewers.length);

  for (let i = 0; i <= reviewers.length; i++) {
    reviewers[i].innerHTML = data.comments[i].user.fullName;
    reviewertext[i].innerHTML = data.comments[i].body;
  }
}
displayReviews();

async function displayProducts() {
  const products = document.querySelectorAll("#productTitle");
  const prices = document.querySelectorAll("#price");
  console.log(products);
  const response = await fetch(
    "https://dummyjson.com/products?limit=10&skip=2&select=title,price"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  for (let i = 0; i <= products.length; i++) {
    products[i].textContent = data.products[i].title;
    prices[i].textContent = data.products[i].price;
  }
}

displayProducts();

const detailTab = document.getElementById("detailTab");
const detailsection = document.getElementById("detailsection");
const ratingTab = document.getElementById("ratingTab");
const reviewssection = document.getElementById("reviewssection");
const revheader = document.getElementById("revheader");

const faqTab = document.getElementById("faqTab");
const FAQsection = document.getElementById("FAQsection");

detailTab.addEventListener(`click`, function () {
  detailsection.style.display = "block";
  reviewssection.style.display = "none";
  revheader.style.display = "none";
  FAQsection.style.display = "none";
});
ratingTab.addEventListener(`click`, function () {
  detailsection.style.display = "none";
  reviewssection.style.display = "flex";
  revheader.style.display = "flex";
  FAQsection.style.display = "none";
});
faqTab.addEventListener(`click`, function () {
  detailsection.style.display = "none";
  reviewssection.style.display = "none";
  revheader.style.display = "none";
  FAQsection.style.display = "block";
});

async function displaydetail() {
  const description = document.getElementById("description");
  const response = await fetch("https://dummyjson.com/products/1");
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  description.textContent = data.description;
}

displaydetail();
