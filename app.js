// Fetch products and populate page with them
fetch("./product-list.json")
  .then((response) => response.json())
  .then((data) => {
    let items = data.List;
    let resultsWrapper = document.querySelector("#results");
    console.log(items);
    for (i = 0; i < items.length; i++) {
      resultsWrapper.innerHTML += `<div class="product__card">
        <a href=${items[i].productUrl} class="product__image-link">
        <img src=${items[i].mediumImageURL} alt="" class="product__thumbnail" />
        </a>
        <h3 class="product__name">
        <a href=${items[i].productUrl} class="product__name-link">
        ${items[i].caption}</a>
        </h3>
        <h4 class="product__price">${items[i].price.toFixed(2)}</h4>
        </div>`;
    }
  })
  .catch((error) => console.log(error));
