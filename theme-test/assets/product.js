//product
function getVariants(id) {
  return fetch(`/admin/api/2021-04/products/${id}/variants.json`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

function getImage(id) {
  return fetch(`/admin/api/2021-04/products/${id}/images.json`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

async function searchVariant() {
  try {
    let inputSize = Array.from(document.getElementsByName("size"));
    let inputColor = Array.from(document.getElementsByName("color"));

    let sizeActive = inputSize.find((res) => res.checked === true);
    let colorActive = inputColor.find((res) => res.checked === true);

    let productValues = getProductValues();
    const { variants } = await this.getVariants(productValues.productId);
    const { images } = await this.getImage(productValues.productId);

    let variantSelected = variants.find(
      (res) => res.title === `${sizeActive.value} / ${colorActive.value}`
    );
    let imageSelected = images.find(
      (res) => res.id === variantSelected?.image_id
    );

    variantSelected ? (variantSelected.image = imageSelected?.src) : "";

    return variantSelected;
    
  } catch (error) {
    console.error(error);
  }
}

async function assingImageAndId() {
  try {
    let principalImage = document.getElementById("principalImage");
    let selectProduct = document.getElementsByName("id");
    let variantError = document.getElementById("variantError");

    let variant = await this.searchVariant();
    let productValues = getProductValues();

    if(variant){
      selectProduct[0].value = variant?.id
      principalImage.src = variant?.image 
      variantError.style = "display:none;"
    }else{
      selectProduct[0].value = undefined
      principalImage.src = productValues.productImage
      variantError.style = "display:block;"
    }
  } catch (error) {
    console.error(error);
  }
}

//customer
(function () {
  let vars = {
    alertCard: document.getElementById('alert-card'),
    customerSubmit: document.getElementById('customerSubmit'),
    customerEmail: document.getElementById('customerEmail'),
    data: data() 
  }

  vars.customerSubmit.addEventListener('click', async function (){
    let email = vars.customerEmail.value
    let customer = await getCustomer(email)

    vars.alertCard.style.display = "block"

    if(customer.status){

      vars.alertCard.style.backgroundColor = "red"
      vars.alertCard.innerHTML = vars.data.messageError

    } else {

      vars.alertCard.style.backgroundColor = "green"
      vars.alertCard.innerHTML = vars.data.messageSuccess

    }
  });

})()

function getCustomer(email) {
  return fetch(`https://app-gradiweb-test.herokuapp.com/customer?email=${email}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}