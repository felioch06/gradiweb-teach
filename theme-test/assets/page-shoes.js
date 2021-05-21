let btn = document.getElementById("btn");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("modal-close")[0];
let btnshowCart = document.getElementById("showCart");
let modalTable = document.getElementById("modal-table");

//Currency

// (function(){
//   modal.style.display = "block"
// })()


// Request

function addProduct(formData) {
  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {

      console.log(response);
      return response.json();

    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getProducts() {
  return fetch("/cart.js", {
    method: "GET",
  })
    .then((response) => {

      console.log(response);
      return response.json();

    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function removeProduct(id) {
  let formData = {
    line: id,
    quantity: 0,
  };

  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {

      console.log(response);
      getProducts().then((res) => {
        renderProducts(res);
      });
      return response.json();

    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateProduct(value, id) {
  let formData = { updates: {} };

  formData.updates[id] = value;

  fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {

      console.log(response);
      getProducts().then((res) => {
        renderProducts(res);
      });
      return response.json();

    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Activators

function execute(form) {
  let id = form["id"].value;
  let quantity = form["quantity"].value;
  let button = form["button"];

  console.log('Form',form);
  let formData = {
    id,
    quantity,
  };

  addProduct(formData);

  button.innerHTML = "Agregado";

  setTimeout(() => {
    button.innerHTML = "Agregar al carrito";
  }, 3000);
}

function renderProducts(res) {
  modalTable.innerHTML = "";

  for (const [index, item] of res.items.entries()) {
    modalTable.innerHTML += `
        <tr>
            <td class="modal-container-image">
                <img src="${item.image}" class="modal-image" alt="">
                <p>${item.title}</p>
            </td>
            <td style="width:30% !important;"><input type="number" class="modal-input" value="${
              item.quantity
            }" onchange="updateProduct(this.value,${item.id})"></td>
            <td style="width:10% !important;">
                <button class="btn btn-radius btn--red" onClick="removeProduct(${index + 1})">Quitar</button>
            </td>
        </tr>
        `;
  }
}

//Actions

span.onclick = function () {
  modal.style.display = "none";
};

btnshowCart.onclick = function () {
  getProducts().then((res) => {
    renderProducts(res);
  });
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
