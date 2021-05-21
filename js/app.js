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
        <a href=${items[i].productUrl}>
        <div class="product__thumbnail-wrapper">
        <img src=${
          items[i].mediumImageURL
        } alt="" class="product__thumbnail-img" />
        </div>
        </a>
        <div class="product__info-wrapper">
        <h3 class="product__name">
        <a href=${items[i].productUrl} class="product__name-link">
        ${items[i].caption}</a>
        </h3>
        <h4 class="product__brand">${items[i].brand}</h4>
        <h5 class="product__price">$${items[i].price.toFixed(2)}</h5>
        <button class="btn product__add-button">Add to cart</button>
        </div>
        </div>`;
      }

      //Attach click event listeners to each of the add buttons
      for (let i = 0; i < allAddButtons.length; i++) {
        allAddButtons[i].addEventListener("click", handleAddToCartClick, false);
      }
    })
    .catch((error) => console.log(error));

  function handleAddToCartClick(event) {
    const button = event.target;
    const product = button.parentElement.parentElement;
    const title =
      product.getElementsByClassName("product__name-link")[0].innerText;
    const price = product.getElementsByClassName("product__price")[0].innerText;
    const imageSource = product.getElementsByClassName(
      "product__thumbnail-img"
    )[0].src;
    addItemToCart(title, price, imageSource);
    // updateCartTotal();
  }

  function addItemToCart(title, price, imageSource) {
    console.log(title, price, imageSource);
    const cartItemsWrapper = document.getElementById("cart");
    let cartItem = document.createElement("div");
    cartItem.innerHTML += `
      <div class="cart__item">
          <img class="cart__item-image" src="${imageSource}">
          <h4 class="cart__item-title">${title}</h4>
          <h5 class="cart__item-price">${price}</h5>
          <input class="cart__item-quantity" type="number" value="1">
          <button class="btn btn-danger" type="button">Remove</button>
      </div>`;
    cartItemsWrapper.appendChild(cartItem);
  }
})();
