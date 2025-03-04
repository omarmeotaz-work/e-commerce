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
  try {
    const response = await fetch(
      "https://dummyjson.com/comments?limit=20&skip=20&select=body,postId"
    );
    if (!response.ok) {
      console.error("There was an error:", response.statusText);
      return;
    }

    const data = await response.json();
    const revholder = $("#revholder");

    if (data && data.comments) {
      for (let i = 0; i < data.comments.length; i++) {
        const comment = data.comments[i];
        if (!comment) continue;

        const reviewDev = `<div class="revbox">
            <div id="rating" class="rating mb-1">
                <i class="fa-regular fa-star"></i>
            </div>
            <h5>${comment?.user?.username || "Anonymous"} 
                <i class="fa-solid fa-circle-check"></i>
            </h5>
            <p id="revText">${comment?.body || "No review text available."}</p>
        </div>`;

        revholder.append(reviewDev);
      }

      if (revholder.hasClass("slick-initialized")) {
        revholder.slick("unslick");
      }
      revholder.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
      });
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
displayReviews();

async function displayBrands() {
  const brands = $("#brands"); // jQuery object
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
      console.error("There was an error:", response.statusText);
      return;
    }

    const data = await response.json();

    if (data && Array.isArray(data)) {
      brands.empty(); // Clear previous content before appending new elements

      // Append brand elements inside divs (required for Slick)
      for (let i = 0; i < data.length; i++) {
        const brandname = data[i].name; // API returns strings, not objects
        brands.append(`<div class="brand-item"><h1>${brandname}</h1></div>`);
      }

      // Destroy previous slick instance if initialized
      if (brands.hasClass("slick-initialized")) {
        brands.slick("unslick");
      }

      // Reinitialize slick
      brands.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
      });
    }
  } catch (error) {
    console.error("Error fetching brands:", error);
  }
}

// Run function after document is ready
$(document).ready(() => {
  displayBrands();
});

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
