const URL = "https://striveschool-api.herokuapp.com/api/product/";
const AuthorizationKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjZlZDEyYjUwYzAwMTQ5ZTRlZWQiLCJpYXQiOjE2ODg3MTI5NDIsImV4cCI6MTY4OTkyMjU0Mn0.bI4w5yXaxDcri-EHXYGI5TRIX03M8NReqw6TYAwZF2k";

const spinnerContainer = document.getElementById("spinner-container");
spinnerContainer.classList.add("d-none");

const filteredProducts = JSON.parse(localStorage.getItem("searchedProducts"));
console.log(filteredProducts);
filteredProducts.forEach((product) => {
  let newCol = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-sm-6", "text-center");
  newCol.innerHTML = `
            <div class="card text-bg-secondary h-100">
                <img
                    src = ${product.imageUrl}
                    style = "height: 500px"
                  class="card-img-top"
                  alt="product placeholder image"
                />
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">
                    ${product.description}
                  </p>
                  <p class="card-text">
                    ${product.brand}
                  </p>
                  <p class="card-text fw-bold">
                    ${product.price}€
                  </p>
                </div>
              </div>
          `;
  const eventsRow = document.getElementById("product-row");
  eventsRow.appendChild(newCol);
});

//   SEARCH FUNCTION
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  fetch(URL, {
    headers: {
      Authorization: AuthorizationKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error in API Call");
      }
    })
    .then((data) => {
      const searchInputField = document.querySelector(".search-input");
      const filteredArray = data.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchInputField.value.toLowerCase())
      );
      localStorage.setItem("searchedProducts", JSON.stringify(filteredArray));
      console.log(filteredArray);
      location.assign("filtered.html");
    })
    .catch((err) => console.log(err));
});
