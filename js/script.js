// Note: given api have server side issue, while running the code im getting "status code 500" error many time, after sometimes it is working.
// As i checked in internet it is due to overload of server or server under maintenanece issue. please consider while checking the webcode.

// get all the references
let form = document.getElementById("form");
let searchInput = document.getElementById("searchInput");
let display = document.getElementById("display");
let searchButton = document.getElementById("btnSearch");
let spinner = document.querySelector(".loading");

function updateDisplay(data) {
  searchInput.value = "";
  data.forEach((eachData) => {
    let brand = eachData.brand;
    let imgUrl = eachData.image_link;
    let product = eachData.name;
    let category = eachData.category;
    let price = eachData.price;
    let link = eachData.product_link;
    let sign = eachData.price_sign;
    let description = eachData.description;
    let cardBox = document.createElement("div");
    cardBox.id = "cardBox";
    cardBox.className = "col-12 mt-3 text-light";
    cardBox.innerHTML = `
          <div class="card">
              <h3
                class="text-center bg-secondary text-bg-dark p-2 display-6"
                id="product"
              >
              ${brand}
              </h3>
              <img
                class="card-img img-fluid img-thumbnail"
                src="${imgUrl}"
                alt="Image N/A" 
                id="productImg"
                style="height: 250px; object-fit: contain"
              />
              <div class="text-center fs-9 p-1" id="productName">
              ${product}
              </div>
              <div class="text-center fs-6 p-1" id="productCategory">
                Category: "${category}"
              </div>
              <div class="text-center fs-6 p-1" id="productPrice">
                price: ${price} ${sign}
              </div>
              <a
              class="text-center text-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="${link} target="_blank""
              >Visit out Official website</a
            >
              <div class="text-center fs-6 p-1" id="Description">
                <h3>Description</h3>
                <p>
                ${description}
                </p>
              </div>
            </div>
          `;
    display.appendChild(cardBox);
  });
}
async function updateData() {
  spinner.classList.add("active");
  try {
    let response = await fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json" /*,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }*/
    );
    let data = await response.json();
    display.innerHTML = "";
    updateDisplay(data);
    if (display.innerHTML != "") {
      spinner.classList.remove("active");
    }
  } catch (error) {
    console.log("error on fetching data");
  }
}
function highLight(product) {
  let searchInputHTML = document.getElementById("searchInput");
  const searchInput = searchInputHTML.value.toLowerCase();
  const startIndex = product.toLowerCase().indexOf(searchInput);
  product = `${product.substring(
    0,
    startIndex
  )} <mark>${searchInput}</mark>${product.substring(
    startIndex + searchInput.length
  )}`;
  return product;
}
async function updateDisplayByValue(data) {
  data.forEach((eachData) => {
    let brand = eachData.brand;
    let imgUrl = eachData.image_link;
    let product = eachData.name;
    let category = eachData.category;
    let price = eachData.price;
    let link = eachData.product_link;
    let sign = eachData.price_sign;
    let description = eachData.description;
    let cardBox = document.createElement("div");
    cardBox.id = "cardBox";
    cardBox.className = "col-12 mt-3 text-light";
    cardBox.innerHTML = `
          <div class="card">
              <h3
                class="text-center bg-black text-bg-dark p-2 display-6"
                id="product"
              >
              ${brand}
              </h3>
              <img
                class="card-img img-fluid img-thumbnail"
                src="${imgUrl}"
                alt="Image N/A"
                id="productImg"
                style="height: 250px; object-fit: contain"
              />
              <div class="text-center fs-6 p-1" id="productName">
              ${highLight(product)}
              </div>
              <div class="text-center fs-6 p-1" id="productCategory">
                Category: "${category}"
              </div>
              <div class="text-center fs-6 p-1" id="productPrice">
                price: ${price} ${sign}
              </div>
              <a
              class="text-center text-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="${link} target="_blank""
              >Visit out Official website</a
            >
              <div class="text-center fs-6 p-1" id="Description">
                <h3>Description</h3>
                <p>
                ${description}
                </p>
              </div>
            </div>
          `;
    display.appendChild(cardBox);
  });
}
async function updateDataBySearchInput(input) {
  spinner.classList.add("active");
  try {
    let response = await fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json"
    );
    let data = await response.json();
    display.innerHTML = "";
    let filteredData = data.filter((e) => {
      let EproductName = e.name.toLowerCase();
      if (EproductName.includes(input)) {
        return e;
      }
    });
    // console.log(filteredData);
    updateDisplayByValue(filteredData);
    if (display.innerHTML != "") {
      spinner.classList.remove("active");
    }
  } catch (error) {
    console.log("error on fetching the data");
  }
}
function handleEvent(e) {
  e.preventDefault();
  let searchValue = searchInput.value.trim().toLowerCase();
  updateDataBySearchInput(searchValue);
}

//adding required event listener for DOM Maniputlation

document.addEventListener("DOMContentLoaded", updateData);
form.addEventListener("submit", handleEvent);
searchButton.addEventListener("click", handleEvent);