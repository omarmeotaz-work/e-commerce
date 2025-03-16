const loginButton = document.getElementById("LoginButton");
const signoutButton = document.getElementById("signoutButton");
const accountIcon = document.getElementById("account");
const accountdropdown = document.getElementById("dropdownMenuButton");
const accessToken = JSON.parse(localStorage.getItem("token"));
const closeoffer = document.getElementById("close");
const offer = document.getElementById("offertext");

closeoffer.addEventListener("click", function () {
  offer.style.display = "none";
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
  for (let i = 0; i <= categoryList.length; i++) {
    categoryList[i].textContent = data[i].name;
  }
}
categoryList();

async function displayProducts() {
  const productGrid = document.getElementById("product-grid");
  const response = await fetch(
    "https://dummyjson.com/products?limit=9&skip=10&select=id,title,price,thumbnail,images,description"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();

  const productdata = data.products;

  for (let i = 0; i < productdata.length; i++) {
    const productID = productdata[i].id;
    const ProductTitle = productdata[i].title;
    const ProductPrice = productdata[i].price;
    const Productimg = productdata[i].thumbnail;
    const prodimglist = productdata[i].images;
    const prodDesc = productdata[i].description;

    prodsideimg1 = prodimglist[0];
    prodsideimg2 = prodimglist[1];
    prodsideimg3 = prodimglist[2];

    const products = `
    <div class="card"   data-id="${productID}">
                        <img id ="prodIMG" src=${Productimg} class="img-fluid">
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
                    `;

    productGrid.innerHTML += products;
  }
}

displayProducts();

//filter by categories
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", async function displaycat(event) {
    const productGrid = document.getElementById("product-grid");
    let cat = event.target.closest("#categorylist > li");
    if (!cat) return; // Exit if not clicking a category
    let catname = cat.textContent;

    const response = await fetch(
      `https://dummyjson.com/products/category/${catname}`
    );
    if (!response.ok) {
      console.error("There was an error:", res.statusText);
      return;
    }

    const data = await response.json();
    const productdata = data.products;
    productGrid.innerHTML = "";

    for (let i = 0; i < productdata.length; i++) {
      const productID = productdata[i].id;
      const ProductTitle = productdata[i].title;
      const ProductPrice = productdata[i].price;
      const Productimg = productdata[i].thumbnail;
      const prodimglist = productdata[i].images;
      const prodDesc = productdata[i].description;

      prodsideimg1 = prodimglist[0];
      prodsideimg2 = prodimglist[1];
      prodsideimg3 = prodimglist[2];

      const products = `
      <div class="card"   data-id="${productID}">
                          <img id ="prodIMG" src=${Productimg} class="img-fluid">
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
                      `;

      productGrid.innerHTML += products;
    }
  });
});

//get productpage html
document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", async function saveprodinfo(event) {
    let card = event.target.closest(".card");
    if (!card) return; // Exit if not clicking a product card

    const productId = card.getAttribute("data-id");

    if (!productId) {
      console.error("Product ID is missing!");
      return;
    }

    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const product = await response.json();

      window.localStorage.setItem("product", JSON.stringify(product));

      window.location.href = `productdetails.html?id=${productId}`;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  });
});
