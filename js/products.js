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

//double range slider
let rangeMin = 100;
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price input");

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minRange = parseInt(rangeInput[0].value);
    let maxRange = parseInt(rangeInput[1].value);
    if (maxRange - minRange < rangeMin) {
      if (e.target.className === "min") {
        rangeInput[0].value = maxRange - rangeMin;
      } else {
        rangeInput[1].value = minRange + rangeMin;
      }
    } else {
      rangePrice[0].value = minRange;
      rangePrice[1].value = maxRange;
      range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
    }
  });
});

const filtericon = document.getElementById("filterImg");
const filtercol = document.getElementById("filtercol");
let filteropen = true;

filtericon.addEventListener("click", function () {
  if (filteropen == true) {
    filtercol.style.display = "none";
    filteropen = false;
  } else {
    filtercol.style.display = "block";
    filteropen = true;
  }
});

async function categoryList() {
  const categoryList = document.querySelectorAll("#categorylist > li");
  const response = await fetch("https://dummyjson.com/products/categories");
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  for (let i = 0; i <= categoryList.length; i++) {
    categoryList[i].textContent = data[i].name;
  }
}
categoryList();

async function displayProducts() {
  const productGrid = document.getElementById("product-grid");
  const response = await fetch(
    "https://dummyjson.com/products?limit=10&skip=10&select=title,price"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  const productdata = data.products;
  console.log(productdata);

  for (let i = 0; i < productdata.length; i++) {
    const ProductTitle = productdata[i].title;
    const ProductPrice = productdata[i].price;

    const products = `
    <a href = "/pages/productdetails.html">
    <div class="card">
                        <img src="/imgs/np-1.png" class="img-fluid">
                        <p id="productTitle" class="fw-bold">${ProductTitle}</p>
                        <div id="rating" class="rating d-flex">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <p class="text-dark ms-3">4.5/5</p>
                        </div>
                        <p id="price">$ ${ProductPrice}</p>
                    </div>
                    </a>`;

    productGrid.innerHTML += products;
  }
}

displayProducts();

const cat5 = document.getElementById("cat5");
cat5.addEventListener(`click`, async function displaycat() {
  const response = await fetch(
    "https://dummyjson.com/products/category/home-decoration"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  const products = document.querySelectorAll("#productTitle");
  const prices = document.querySelectorAll("#price");
  for (let i = 0; i <= products.length; i++) {
    products[i].textContent = data.products[i].title;
    prices[i].textContent = data.products[i].price;
  }
});
const cat4 = document.getElementById("cat4");
cat4.addEventListener(`click`, async function displaycat() {
  const response = await fetch(
    "https://dummyjson.com/products/category/groceries"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  const products = document.querySelectorAll("#productTitle");
  const prices = document.querySelectorAll("#price");
  for (let i = 0; i <= products.length; i++) {
    products[i].textContent = data.products[i].title;
    prices[i].textContent = data.products[i].price;
  }
});
const cat3 = document.getElementById("cat3");
cat3.addEventListener(`click`, async function displaycat() {
  const response = await fetch(
    "https://dummyjson.com/products/category/furniture"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  const products = document.querySelectorAll("#productTitle");
  const prices = document.querySelectorAll("#price");
  for (let i = 0; i <= products.length; i++) {
    products[i].textContent = data.products[i].title;
    prices[i].textContent = data.products[i].price;
  }
});
const cat2 = document.getElementById("cat2");
cat2.addEventListener(`click`, async function displaycat() {
  const response = await fetch(
    "https://dummyjson.com/products/category/fragrances"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  const products = document.querySelectorAll("#productTitle");
  const prices = document.querySelectorAll("#price");
  for (let i = 0; i <= products.length; i++) {
    products[i].textContent = data.products[i].title;
    prices[i].textContent = data.products[i].price;
  }
});

const cat1 = document.getElementById("cat1");
cat1.addEventListener(`click`, async function displaycat() {
  const response = await fetch(
    "https://dummyjson.com/products/category/beauty"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  console.log(data);
  const products = document.querySelectorAll("#productTitle");
  const prices = document.querySelectorAll("#price");
  for (let i = 0; i <= products.length; i++) {
    products[i].textContent = data.products[i].title;
    prices[i].textContent = data.products[i].price;
  }
});

const productcards = document.querySelectorAll(".card");

for (let i = 0; i <= productcards.length; i++) {
  productcards[i].addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5500/pages/productdetails.html";
  });
}
