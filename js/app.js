(function () {
  // Fetch products and build product listings with them
  const resultsWrapper = document.querySelector("#results");
  if (resultsWrapper) {
    fetch("./product-list.json")
      .then((response) => response.json())
      .then((data) => {
        const items = data.List;
        const allAddButtons = document.getElementsByClassName(
          "product__add-button"
        );

        // Dynamically set number of search results
        if (document.getElementById("number-results")) {
          document.getElementById("number-results").innerText = items.length;
        }

        const selectBox = document.getElementById("select");
        selectBox.addEventListener("change", sortItems, false);

        // Sort item array according to user selection
        function sortItems() {
          const selectValue = document.getElementById("select").value;
          switch (selectValue) {
            case "price":
              populateIndexPage(items.sort((a, b) => a.price - b.price));
              break;
            case "brand":
              populateIndexPage(
                items.sort((a, b) => a.brand.localeCompare(b.brand))
              );
              break;
            case "title":
              populateIndexPage(
                items.sort((a, b) => a.caption.localeCompare(b.caption))
              );
              break;
            case "availability":
              populateIndexPage(
                items.sort((a, b) => a.availability - b.availability)
              );
            default:
              populateIndexPage(items);
              break;
          }
        }

        sortItems();

        function populateIndexPage(items) {
          resultsWrapper.innerHTML = "";
          // Add products to index page
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
            allAddButtons[i].addEventListener(
              "click",
              handleAddToCartClick,
              false
            );
          }
        }
        updateCartQuantity();
      });
  }

  // Shopping cart logic

  function handleAddToCartClick(event) {
    const button = event.target;
    const product = button.parentElement.parentElement;
    const title =
      product.getElementsByClassName("product__name-link")[0].innerText;
    const price = product.getElementsByClassName("product__price")[0].innerText;
    const imageSource = product.getElementsByClassName(
      "product__thumbnail-img"
    )[0].src;
    addItemToLocalStorage(title, price, imageSource);
    updateCartQuantity();
  }

  // Add cart items to cart array
  function addItemToLocalStorage(title, price, imageSource) {
    // TODO: Check to see if item is already in cart before adding and update quantity accordingly
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
      storage = [];
    }
    let cartItem = {};
    cartItem.title = title;
    cartItem.price = price;
    cartItem.imageSource = imageSource;

    storage.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(storage));
    updateCartTotal();
  }

  // Use cart items in local storage to populate cart page
  const cartItemsWrapper = document.getElementById("cart");
  if (cartItemsWrapper) {
    populateCartPage();
  }

  function populateCartPage() {
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
      storage = [];
    }
    let cartArray = storage;

    // TODO: Increment quantity rather than duplicate items within cart
    cartItemsWrapper.innerHTML = "";
    cartArray.forEach(function (item, i) {
      let cartItem = document.createElement("div");
      cartItem.setAttribute("class", "cart__item");
      cartItem.innerHTML += `
      <img class="cart__item-image" src="${item.imageSource}">
      <h4 class="cart__item-title">${item.title}</h4>
      <h5 class="cart__item-price">${item.price}</h5>
      <input class="cart__item-quantity" type="number" value="1">
      <button class="cart__remove-btn btn btn-danger" type="button">Delete</button>`;
      cartItemsWrapper.appendChild(cartItem);

      // Attach event listeners
      document
        .getElementsByClassName("cart__item-quantity")
        [i].addEventListener("change", handleQuantityUpdated);
      document
        .getElementsByClassName("cart__remove-btn")
        [i].addEventListener("click", removeCartItem);
    });

    updateCartTotal();
  }

  function removeCartItem(event) {
    const itemToRemoveButton = event.target;
    const itemToRemoveTitle =
      itemToRemoveButton.parentElement.getElementsByClassName(
        "cart__item-title"
      )[0].innerText;
    let storageList = JSON.parse(localStorage.getItem("cart"));
    // Remove from localstorage
    for (var i = 0; i < storageList.length; i++) {
      if (storageList[i].title == itemToRemoveTitle) {
        storageList.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(storageList));
    // Remove from UI
    populateCartPage();
  }

  // Checks to make sure the quantity is valid and then updates total
  function handleQuantityUpdated(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value < 1) {
      input.value = 1;
    }
    // updateCartTotal();
  }

  // Iterates through the items in the cart to update the total cost of items in cart
  function updateCartTotal() {
    let items = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = 0;
    items.forEach(function (item) {
      const priceString = item.price;
      const priceNum = parseFloat(priceString.substring(1));
      totalPrice += priceNum;
    });
    if (document.getElementById("total")) {
      document.getElementById("total").innerText = "$" + totalPrice.toFixed(2);
    }
  }

  function updateCartQuantity() {
    const quantityCounter = document.getElementById("cart-counter");
    quantityCounter.innerText = "";
    const quantityValues = document.getElementsByClassName(
      "cart__item-quantity"
    );
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
      storage = [];
    }
    let totalQuantity = storage.length;
    if (quantityCounter && totalQuantity > 0) {
      quantityCounter.innerText = totalQuantity;
      document
        .getElementById("cart-counter")
        .classList.add("header__cart-counter");
    }
  }

  // Clear cart and simulate checkout with an alert
  const checkoutButton = document.getElementById("checkout");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", checkout, false);
  }
  function checkout() {
    alert("Congratulation! You checked out.");
    localStorage.removeItem("cart");
    window.location.href = "/";
  }
})();
