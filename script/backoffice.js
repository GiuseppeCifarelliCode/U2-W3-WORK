const URL = "https://striveschool-api.herokuapp.com/api/product/";
const AuthorizationKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjZlZDEyYjUwYzAwMTQ5ZTRlZWQiLCJpYXQiOjE2ODg3MTI5NDIsImV4cCI6MTY4OTkyMjU0Mn0.bI4w5yXaxDcri-EHXYGI5TRIX03M8NReqw6TYAwZF2k";

const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("id");

const nameInput = document.getElementById("product-name");
const descriptionInput = document.getElementById("product-description");
const brandInput = document.getElementById("product-brand");
const imgInput = document.getElementById("product-img");
const priceInput = document.getElementById("product-price");

let urlToUse;
if (productId) {
  urlToUse = URL + "/" + productId;
} else {
  urlToUse = URL;
}

let methodToUse;
if (productId) {
  methodToUse = "PUT";
} else {
  methodToUse = "POST";
}

if (productId) {
  modifyButton = document.querySelector(".save-button");
  modifyButton.innerText = "Save Changes";
  modifyButton.classList.add("btn-warning");
  document.querySelector(".btn-danger").classList.remove("d-none");
  document.querySelector("h1").innerText =
    "CRUDAZON - Modify Or Delete Product";

  fetch(URL + productId, {
    headers: {
      Authorization: AuthorizationKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error");
      }
    })
    .then((detail) => {
      nameInput.value = detail.name;
      descriptionInput.value = detail.description;
      brandInput.value = detail.brand;
      imgInput.value = detail.imageUrl;
      priceInput.value = detail.price;
    })
    .catch((err) => {
      const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
      const appendAlert = () => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert">`,
          `   <div>${err} Error for taking Product detail</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          "</div>",
        ].join("");

        alertPlaceholder.append(wrapper);
      };

      const alertTrigger = document.getElementById("liveAlertBtn");
      if (alertTrigger) {
        alertTrigger.addEventListener("click", () => {
          appendAlert("Error for taking Product detail");
        });
      }
    });
}

const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imgInput.value,
    price: priceInput.value,
  };

  console.log(newProduct);

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: AuthorizationKey,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("PRODUCT SAVED");
        nameInput.value = "";
        descriptionInput.value = "";
        brandInput.value = "";
        imgInput.value = "";
        priceInput.value = "";
        location.assign("index.html");
      } else {
        throw new Error("Error");
      }
    })
    .catch((err) => {
      const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
      const appendAlert = () => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert">`,
          `   <div>${err} Error for taking Product detail</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          "</div>",
        ].join("");

        alertPlaceholder.append(wrapper);
      };

      const alertTrigger = document.getElementById("liveAlertBtn");
      if (alertTrigger) {
        alertTrigger.addEventListener("click", () => {
          appendAlert("Error for taking Product detail");
        });
      }
    });
});

const confirmDeleteButton = document.querySelector(".confirm-delete-button");
confirmDeleteButton.addEventListener("click", function () {
  fetch(URL + productId, {
    method: "DELETE",
    headers: {
      Authorization: AuthorizationKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Product deleted");
        location.assign("index.html");
      } else {
        throw new Error("Error to Delete product");
      }
    })
    .catch((err) => {
      const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
      const appendAlert = () => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert">`,
          `   <div>${err} Error for Delete Product</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          "</div>",
        ].join("");

        alertPlaceholder.append(wrapper);
      };

      const alertTrigger = document.getElementById("liveAlertBtn");
      if (alertTrigger) {
        alertTrigger.addEventListener("click", () => {
          appendAlert("Error for Delete Product");
        });
      }
    });
});

const confirmResetButton = document.querySelector(".confirm-reset-button");
confirmResetButton.addEventListener("click", function () {
  nameInput.value = "";
  descriptionInput.value = "";
  brandInput.value = "";
  imgInput.value = "";
  priceInput.value = "";
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
