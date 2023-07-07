const URL = "https://striveschool-api.herokuapp.com/api/product/";
const AuthorizationKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjZlZDEyYjUwYzAwMTQ5ZTRlZWQiLCJpYXQiOjE2ODg3MTI5NDIsImV4cCI6MTY4OTkyMjU0Mn0.bI4w5yXaxDcri-EHXYGI5TRIX03M8NReqw6TYAwZF2k";

const addressBarContent = new URLSearchParams(location.search);

const productId = addressBarContent.get("id");

fetch(URL + productId, {
  headers: {
    Authorization: AuthorizationKey,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error to recover product details");
    }
  })
  .then((detail) => {
    const spinnerContainer = document.getElementById("spinner-container");
    spinnerContainer.classList.add("d-none");

    let newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-sm-6", "text-center");
    newCol.innerHTML = `
            <div class="card text-bg-secondary">
                <img
                    src = ${detail.imageUrl}
                  class="card-img-top"
                  alt="product placeholder image"
                />
                <div class="card-body">
                  <h5 class="card-title">${detail.name}</h5>
                  <p class="card-text">
                    ${detail.description}
                  </p>
                  <p class="card-text">
                    ${detail.brand}
                  </p>
                  <p class="card-text fw-bold">
                    ${detail.price}€
                  </p>
                </div>
              </div>
          `;
    const eventsRow = document.getElementById("product-row");
    eventsRow.appendChild(newCol);
  })
  .catch((err) => {
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    const appendAlert = () => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>${err} Error to Recover Product Detail</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
    };

    const alertTrigger = document.getElementById("liveAlertBtn");
    if (alertTrigger) {
      alertTrigger.addEventListener("click", () => {
        appendAlert(" Error to Recover Product Detail");
      });
    }
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
