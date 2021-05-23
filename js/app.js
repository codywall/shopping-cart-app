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
        <div class="product__thumbnail-wrapper">
        <a href=${items[i].productUrl}>
        <img src=${
          items[i].mediumImageURL
        } alt="" class="product__thumbnail-img" />
        </a>
        </div>
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

  // Shopping cart logic
  const cartItemsWrapper = document.getElementById("cart");
  const cartItems = document.getElementsByClassName("cart__item");

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
    updateCartTotal();
  }

  // Add and display items in cart
  function addItemToCart(title, price, imageSource) {
    const cartItemTitles =
      cartItemsWrapper.getElementsByClassName("cart__item-title");
    const cartQuantityInputs = cartItemsWrapper.getElementsByClassName(
      "cart__item-quantity"
    );

    // If the item is already in the cart then update the item quantity
    for (var i = 0; i < cartItemTitles.length; i++) {
      if (cartItemTitles[i].innerText == title) {
        cartQuantityInputs[i].value = parseInt(cartQuantityInputs[i].value) + 1;
        return;
      }
    }

    // Else create new cart item
    let cartItem = document.createElement("div");
    cartItem.setAttribute("class", "cart__item");
    cartItem.innerHTML += `
          <img class="cart__item-image" src="${imageSource}">
          <h4 class="cart__item-title">${title}</h4>
          <h5 class="cart__item-price">${price}</h5>
          <input class="cart__item-quantity" type="number" value="1">
          <button class="cart__remove-btn btn btn-danger" type="button">Delete</button>`;

    // Event listeners
    cartItem
      .getElementsByClassName("cart__item-quantity")[0]
      .addEventListener("change", handleQuantityUpdated);
    cartItem
      .getElementsByClassName("cart__remove-btn")[0]
      .addEventListener("click", removeCartItem, false);

    cartItemsWrapper.appendChild(cartItem);
  }

  function removeCartItem(event) {
    const itemToRemoveButton = event.target;
    itemToRemoveButton.parentElement.remove();
    updateCartTotal();
  }

  // Checks to make sure the quantity is valid and then updates total
  function handleQuantityUpdated(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value < 1) {
      input.value = 1;
    }
    updateCartTotal();
  }

  // Iterates through the items in the cart to update the total cost of items in cart
  function updateCartTotal() {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const priceString =
        cartItems[i].getElementsByClassName("cart__item-price")[0].innerText;
      const priceNum = parseFloat(priceString.substring(1));
      const quantity = cartItems[i].getElementsByClassName(
        "cart__item-quantity"
      )[0].value;
      totalPrice += priceNum * quantity;
    }
    document.getElementById("total").innerText = "$" + totalPrice;
    updateCartQuantity();
  }

  function updateCartQuantity() {
    const quantityCounter = document.getElementById("cart__quantity-counter");
    const quantityValues = document.getElementsByClassName(
      "cart__item-quantity"
    );
    let totalQuantity = 0;
    for (let i = 0; i < quantityValues.length; i++) {
      totalQuantity += parseInt(quantityValues[i].value);
    }
    quantityCounter.innerText = totalQuantity;
  }
})();
