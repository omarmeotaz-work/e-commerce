const loginButton = document.getElementById("LoginButton");
const signoutButton = document.getElementById("signoutButton");
const accountIcon = document.getElementById("account");
const accountdropdown = document.getElementById("dropdownMenuButton");
const accessToken = JSON.parse(localStorage.getItem("token"));
const homelogo = document.getElementById("shopco");
const closeoffer = document.getElementById("close");
const offer = document.getElementById("offertext");
const productDesc = window.localStorage.getItem("desc");

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
    "https://dummyjson.com/products?limit=4&skip=2&select=title,price,thumbnail,images,description"
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
    const ProductImg = productdata[i].thumbnail;
    const prodimglist = productdata[i].images;
    const prodDesc = productdata[i].description;

    prodsideimg1 = prodimglist[0];
    prodsideimg2 = prodimglist[1];
    prodsideimg3 = prodimglist[2];
    const products = `<div class="product col-lg-3" data-id="${i}" 
                        data-title="${ProductTitle}" 
                        data-price="${ProductPrice}" 
                        data-img="${ProductImg}"
                        data-sideimg1= "${prodsideimg1}"
                        data-sideimg2= "${prodsideimg1}"
                        data-sideimg3= "${prodsideimg1}"
                        data-description= "${prodDesc}">
                        <img src=${ProductImg} class="img-fluid mb-2">
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
  }
}

displayProducts();

//get productpage html
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function saveprodinfo(event) {
    let card = event.target.closest(".product");
    if (!card) return; // Exit if not clicking a product card

    const productId = card.getAttribute("data-id");
    const productTitle = card.getAttribute("data-title");
    const productPrice = card.getAttribute("data-price");
    const productImg = card.getAttribute("data-img");
    const productSideImg1 = card.getAttribute("data-sideimg1");
    const productSideImg2 = card.getAttribute("data-sideimg2");
    const productSideImg3 = card.getAttribute("data-sideimg3");
    const productDesc = card.getAttribute("data-description");
    window.localStorage.setItem("desc", productDesc);
    window.location.href = `productdetails.html?id=${productId}&title=${encodeURIComponent(
      productTitle
    )}&price=${productPrice}&img=${encodeURIComponent(
      productImg
    )}&simg1=${encodeURIComponent(productSideImg1)}&simg2=${encodeURIComponent(
      productSideImg2
    )}&simg3=${encodeURIComponent(productSideImg3)}
    )}`;
  });
});

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
  reviewssection.style.display = "block";
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
  description.textContent = productDesc;
}

displaydetail();

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productTitle = urlParams.get("title");
  const productPrice = urlParams.get("price");
  const productImg = urlParams.get("img");
  const productsideImg1 = urlParams.get("simg1");
  const productsideImg2 = urlParams.get("simg2");
  const productsideImg3 = urlParams.get("simg3");
  const productDesc = window.localStorage.getItem("desc");

  if (productTitle) {
    const productDetails = `       <div class="prodinfo row">
                <div id="sideImgs" class="col-2 ms-5">
                    <img src=${productsideImg1} class="img-fluid">
                    <img src=${productsideImg2} class="img-fluid">
                    <img src=${productsideImg3} class="img-fluid">
                </div>
                <div id="mainImg" class="col-lg-3 col-6">
                    <img id="product-image" src=${productImg} class="img-fluid">
                </div>
                <div class="col-lg-6">
                    <h1 id="product-name" class="fw-bold">${productTitle}</h1>
                    <div id="rating" class="rating mb-1 d-flex">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <p class="text-dark ms-3">4.5/5</p>
                    </div>
                    <h2 id="price" class="fw-bold">$${productPrice}</h2>
                    <p>${productDesc}.</p>
                    <p>Select Colors</p>
                    <img src="/imgs/colors2.png" class="img-fluid">
                    <p>Choose Size</p>
                    <ul id="sizes" class="list-unstyled gap-3">
                        <li>Small</li>
                        <li>Medium</li>
                        <li id="active">Large</li>
                        <li>X-Large</li>
                    </ul>
                    <div class="row">
                        <ul id="quantity"
                            class="col-2 list-unstyled d-flex justify-content-between ps-2 pe-2 pt-1 pb-1 gap-3">
                            <li>-</li>
                            <li>1</li>
                            <li>+</li>
                        </ul>
                        <button id="addtocart" class="btn btn-dark col-6 ms-5">Add to Cart</button>
                    </div>
                </div>
            </div>`;

    const prodcontainer = document.getElementById("prodContainer");
    prodcontainer.innerHTML += productDetails;
    // document.getElementById("product-name").textContent = productTitle;
    // document.getElementById("price").textContent = `$${productPrice}`;
    // document.getElementById("product-image").src = productImg;
    // document.getElementById("product-image").alt = productTitle;
  }
});
