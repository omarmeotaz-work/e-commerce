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
  const response = await fetch(
    "https://dummyjson.com/comments?limit=6&skip=6&select=body,postId"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();

  const reviewholder = document.getElementById("revHolder");
  for (let i = 0; i <= data.comments.length; i++) {
    const revtext = data.comments;
    const revbody = revtext[i].body;
    const revwriter = revtext[i].user.username;

    console.log(revwriter);

    const reviews = `    <div id="revbox" class="revbox col-lg-5">
                    <div class="ratingholder d-flex justify-content-between">
                        <div id="rating" class="rating mb-1 d-flex">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <p class="fw-bold h3">...</p>
                    </div>
                    <h4 id="reviewer">${revwriter} <i class="fa-solid fa-circle-check"></i></h4>
                    <p>${revbody}</p>
                    <h6>Posted on August 14, 2023</h6>
                </div>`;

    reviewholder.innerHTML += reviews;
  }
}
displayReviews();

async function displayProducts() {
  const prodholder = document.getElementById("productHolder");
  const response = await fetch(
    "https://dummyjson.com/products?limit=4&skip=2&select=title,price"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  const productdata = data.products;
  for (let i = 0; i <= productdata.length; i++) {
    const ProductTitle = productdata[i].title;
    const ProductPrice = productdata[i].price;
    const products = `      <div class="col-lg-2">
                    <img src="/imgs/np-0.png" class="img-fluid mb-2">
                    <h5 id="productTitle" class="mb-3">${ProductTitle}</h5>
                    <div id="rating" class="rating d-flex justify-content-center">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <p class="text-dark ms-3">4.0/5</p>
                    </div>
                    <h5 id="price">$${ProductPrice}</h5>
                </div>`;
    prodholder.innerHTML += products;
    // products[i].textContent = data.products[i].title;
    // prices[i].textContent = data.products[i].price;
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
  description.textContent = data.description;
}

displaydetail();

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productTitle = urlParams.get("title");
  const productPrice = urlParams.get("price");
  const productImg = urlParams.get("img");

  if (productTitle) {
    document.getElementById("product-name").textContent = productTitle;
    document.getElementById("price").textContent = `$${productPrice}`;
    document.getElementById("product-image").src = productImg;
    document.getElementById("product-image").alt = productTitle;
  }
});
