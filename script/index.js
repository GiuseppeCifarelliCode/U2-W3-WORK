const URL = "https://striveschool-api.herokuapp.com/api/product/";
const AuthorizationKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjZlZDEyYjUwYzAwMTQ5ZTRlZWQiLCJpYXQiOjE2ODg3MTI5NDIsImV4cCI6MTY4OTkyMjU0Mn0.bI4w5yXaxDcri-EHXYGI5TRIX03M8NReqw6TYAwZF2k";

const getProductData = function () {
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
      console.log("Products", data);
      const spinnerContainer = document.getElementById("spinner-container");
      spinnerContainer.classList.add("d-none");
      data.forEach((product) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-12", "col-sm-6", "col-md-3");
        newCol.innerHTML = `
            <div class="card h-100 text-bg-secondary">
                <img
                    src = ${product.imageUrl}
                    style = "height: 300px"
                  class="card-img-top"
                  alt="product placeholder image"
                />
                <div class="card-body d-flex flex-column justify-content-between">
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
                  <div>
                  <a href="./detail.html?id=${product._id}" class="btn btn-primary">Find More</a>
                  <a href="./backoffice.html?id=${product._id}" class="btn btn-warning">Modify</a>
                  </div>
                </div>
              </div>
          `;
        const eventsRow = document.getElementById("events-row");
        eventsRow.appendChild(newCol);
      });
      //   SEARCH FUNCTION
      const searchButton = document.querySelector(".search-button");
      searchButton.addEventListener("click", function () {
        const searchInputField = document.querySelector(".search-input");
        const filteredArray = data.filter((product) =>
          product.name
            .toLowerCase()
            .includes(searchInputField.value.toLowerCase())
        );
        console.log(filteredArray);
        if (filteredArray.length === 0) {
          alert("We can't find that Product! Try again");
        } else {
          localStorage.setItem(
            "searchedProducts",
            JSON.stringify(filteredArray)
          );
          searchButton.setAttribute("href", "./filtered.html");
        }
      });
    })
    .catch((err) => {
      const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
      const appendAlert = () => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert">`,
          `   <div>${err} Error</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          "</div>",
        ].join("");

        alertPlaceholder.append(wrapper);
      };

      const alertTrigger = document.getElementById("liveAlertBtn");
      if (alertTrigger) {
        alertTrigger.addEventListener("click", () => {
          appendAlert("Error in API Call");
        });
      }
    });
};

getProductData();
