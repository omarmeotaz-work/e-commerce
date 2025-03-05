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

async function displayProducts() {
  let products = document.querySelectorAll("#pTitle");

  let productprices = document.querySelectorAll("#pPrices");
  console.log(products);
  console.log(productprices);

  const response = await fetch(
    "https://dummyjson.com/products?limit=8&skip=8&select=title,price"
  );
  if (!response.ok) {
    console.error("There was an error:", res.statusText);
    return;
  }
  const data = await response.json();
  const productdata = data.products;
  for (let i = 0; i <= productdata.length; i++) {
    products[i].textContent = productdata[i]?.title;
    productprices[i].textContent = productdata[i]?.price;
  }
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
        const likes = data.comments[i].likes;
        if (!comment) continue;

        const reviewDev = `<div class="revbox">
            <div id="likes" class="likes mb-1">
                <p>${likes} <i class="fa-solid fa-thumbs-up"></i></p>
            </div>
            <h5>${comment?.user?.username || "Anonymous"} 
                <i id="checkmark" class="fa-solid fa-circle-check"></i>
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
displayBrands();

function counter() {
  const stat1 = document.getElementById("stat1");
  const stat2 = document.getElementById("stat2");
  const stat3 = document.getElementById("stat3");

  const target1 = 200;
  const target2 = 2000;
  const target3 = 30000;

  let start1 = 0;
  let start2 = 0;
  let start3 = 0;

  const steps = 100; // so that the numbers dont show up instantly

  const increment1 = Math.ceil(target1 / steps); // remove decimals and increment values
  const increment2 = Math.ceil(target2 / steps);
  const increment3 = Math.ceil(target3 / steps);

  function updateCounter() {
    start1 = start1 + increment1;
    start2 = start2 + increment2;
    start3 = start3 + increment3;

    stat1.textContent = start1;
    stat2.textContent = start2;
    stat3.textContent = start3;

    if (start1 === target1 && start2 === target2 && start3 === target3) {
      clearInterval(interval);
    }
  }

  const interval = setInterval(updateCounter, 10); //execute on a 100 steps each step is 10ms
}

counter();

async function displayCategory() {
  const categroyText = document.querySelectorAll("#Categorytext");
}

displayCategory();

productImgs1 = document.getElementById("products1");
productImgs1.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/pages/products.html";
});
productImgs2 = document.getElementById("products2");
productImgs2.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/pages/products.html";
});
