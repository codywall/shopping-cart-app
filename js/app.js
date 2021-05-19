(function () {
  // Fetch products and build product listings with them
  fetch("./product-list.json")
    .then((response) => response.json())
    .then((data) => {
      const items = data.List;
      const allAddButtons = document.getElementsByClassName(
        "product__add-button"
      );
      const resultsWrapper = document.querySelector("#results");

      // Add products to page
      for (let i = 0; i < items.length; i++) {
        resultsWrapper.innerHTML += `<div class="product__card">
        <a href=${items[i].productUrl} class="product__image-link">
        <img src=${items[i].mediumImageURL} alt="" class="product__thumbnail" />
        </a>
        <h3 class="product__name">
        <a href=${items[i].productUrl} class="product__name-link">
        ${items[i].caption}</a>
        </h3>
        <h4 class="product__price">${items[i].price.toFixed(2)}</h4>
        <button class="product__add-button">Add to cart</button>
        </div>`;
      }

      //Attach click event listeners to each of the add buttons
      for (let i = 0; i < allAddButtons.length; i++) {
        allAddButtons[i].addEventListener("click", addToCartClicked, false);
      }
    })
    .catch((error) => console.log(error));

  function addToCartClicked(event) {
    const button = event.target;
    console.log(button);
    const product = button.parentElement;
    const title = product.getElementsByClassName("product__name")[0].innerText;
    console.log(title);
    const price = product.getElementsByClassName("product__price")[0].innerText;
    const imageSrc =
      product.getElementsByClassName("product__thumbnail")[0].src;
    // addItemToCart(title, price, imageSrc);
    // updateCartTotal();
  }
})();
