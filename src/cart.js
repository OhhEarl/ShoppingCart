let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");



let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();



let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
      <div class="cart-item">
          <img  width="100" src="${img}"/>
          
          <div class="details">
              <div class="title-price-x">
                  <h4 class="title-price">
                  <p>${name}</p>
                  <p class="price" >P${price}</p>
                  
                  </h4>
                  <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>

              <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                     <div id=${id} class="quantity">${
                      item
                      }</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>

              <h3>$${item * price}</h3>
          </div>

      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `;
  }
};

generateCartItems();



let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();  
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {  
  let selectedItem = id;
  basket = basket.filter((x)=> x.id !== selectedItem.id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  // console.log(selectedItem.id);
  totalAmount();
  calculation();
} 


let clearCart = () => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  calculation();
}

let totalAmount = () => {
    if(basket.length  !==0){
        let amount = basket.map((x) => {
          let {item, id} = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
          return item * search.price;
        })
        .reduce(( x, y) => x + y, 0);  
        // console.log(amount)

        label.innerHTML = `
        <h2>Total Amount: P${amount}</h2>
        <button class="checkOut">Checkout</button>
        <button  onclick="clearCart() "class="removeAll">Clear Cart</button>
        `;
    }else return
    
}

totalAmount();




