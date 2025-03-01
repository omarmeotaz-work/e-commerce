const loginButton = document.getElementById("LoginButton");
const signoutButton = document.getElementById("signoutButton");
const accountIcon = document.getElementById("account");
const accountdropdown = document.getElementById("dropdownMenuButton");
const accessToken = JSON.parse(localStorage.getItem("token"));

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

$(revholder).slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
});

async function displayProducts() {
  let product1 = document.getElementById("p1");
  let product2 = document.getElementById("p2");
  let product3 = document.getElementById("p3");
  let product4 = document.getElementById("p4");
  let product5 = document.getElementById("p5");
  let product6 = document.getElementById("p6");
  let product7 = document.getElementById("p7");
  let product8 = document.getElementById("p8");

  let product1p = document.getElementById("p1p");
  let product2p = document.getElementById("p2p");
  let product3p = document.getElementById("p3p");
  let product4p = document.getElementById("p4p");
  let product5p = document.getElementById("p5p");
  let product6p = document.getElementById("p6p");
  let product7p = document.getElementById("p7p");
  let product8p = document.getElementById("p8p");

  const response = await fetch(
    "https://dummyjson.com/products?limit=8&skip=8&select=title,price"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  console.log(data.products[0].title);
  console.log(data.products[1].title);
  product1.textContent = data.products[0].title;
  product2.textContent = data.products[1].title;
  product3.textContent = data.products[2].title;
  product4.textContent = data.products[3].title;
  product5.textContent = data.products[4].title;
  product6.textContent = data.products[5].title;
  product7.textContent = data.products[6].title;
  product8.textContent = data.products[7].title;

  product1p.textContent = data.products[0].price;
  product2p.textContent = data.products[1].price;
  product3p.textContent = data.products[2].price;
  product4p.textContent = data.products[3].price;
  product5p.textContent = data.products[4].price;
  product6p.textContent = data.products[5].price;
  product7p.textContent = data.products[6].price;
  product8p.textContent = data.products[7].price;
}
displayProducts();

async function displayReviews() {
  let reviewers = document.querySelectorAll(".revbox > h5");
  let reviewertext = document.querySelectorAll(".revbox > p");
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

shopButton = document.getElementById("shopButton");
shopButton.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/pages/products.html";
});

productImgs1 = document.getElementById("products1");
productImgs1.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/pages/products.html";
});
productImgs2 = document.getElementById("products2");
productImgs2.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/pages/products.html";
});
categories = document.getElementById("categoryBox");
categories.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/pages/products.html";
});
