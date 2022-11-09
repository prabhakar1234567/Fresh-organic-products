const products = [
  {
    id: 0,
    name: "Cucumber",
    price: 29.00,
    instock: 10,
    imgSrc: "image/product-1.png",
  },
  {
    id: 1,
    name: "Waternelon",
    price: 24.00,
    instock: 4,
    imgSrc: "image/product-2.png",
  },
  {
    id: 2,
    name: "Banana",
    price: 19.00,
    instock: 10,
    imgSrc: "image/product-3.png",
  },
  {
    id: 3,
    name: "Coriander",
    price: 25.00,
    instock: 5,
    imgSrc: "image/product-4.png",
  },
  {
    id: 4,
    name: "Dragon Fruit",
    price: 29.00,
    instock: 4,
    imgSrc: "image/product-5.png",
  },
  {
    id: 5,
    name: "Capsicum",
    price: 39.00,
    instock: 40,
    imgSrc: "image/product-6.png",
  },
  {
    id: 6,
    name: "Tomato",
    price: 29.00,
    instock: 10,
    imgSrc: "image/product-7.png",
  },
  {
    id: 7,
    name: "Veg-Combo",
    price: 89.00,
    instock: 40,
    imgSrc: "image/product-8.png",
  },
];

const productsEl = document.querySelector(".product__items");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".total");
const totalCartItems = document.querySelector(".totalCart__Items");





//============ search icon==============

let searchForm = document.querySelector('.search');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

const searchElement=()=>{
  const searchBox=document.getElementById('search-item').value.toUpperCase();
  const productList=document.getElementById('product-List')
  const product=document.querySelectorAll('.product')
  const pname=productList.getElementsByTagName("h2")

  for(let i=0;i<pname.length;i++){
    const match=product[i].getElementsByTagName('h2')[0];
    
  if(match){
    let textvalue=match.textContent || match.innerHTML

    if(textvalue.toUpperCase().indexOf(searchBox)>-1){
      product[i].style.display="";
    }else{
      product[i].style.display="none"  
    }
    }
  }

  
}


//============ shopping cart ===============

let carticon=document.querySelector('#cart-btn')

let shoppingCart=document.querySelector('.shopping-cart')

let closecart=document.querySelector('#cart-close')

carticon.addEventListener('click',()=>{
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
})

closecart.addEventListener('click',()=>{
  shoppingCart.classList.remove('active')
})





 // ================login form=======================

 let loginIcon=document.querySelector('#login-btn')
 
 let loginForm=document.querySelector('.login-form') 
 
 let closeLogin=document.querySelector('#login-close')

 loginIcon.addEventListener('click',()=>{

  loginForm.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  navbar.classList.remove('active');


 })

 closeLogin.addEventListener('click',()=>{
  loginForm.classList.remove('active')
 })



 //  //============cart working js============

function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
              <div class="swiper-slide box">
                  <img src="${product.imgSrc}" alt="${product.name}" class="product-image">
                  <h3 class="product-title">${product.name}</h3>
                  <div class="price">₹ ${product.price}</div>
                  <div class="stars">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                  </div>
                  <a class="btn" id="add-cart" onclick="addToCart(${product.id})">add to cart</a>
          </div>
        `;
  });
}
renderProdcuts();

//---------------- Add to Cart 

// cart array
let cart=[];
// let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    console.log(cart);
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

//  update cart

function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  // localStorage.setItem("CART", JSON.stringify(cart));
}



// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `(${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalCartItems.textContent=`${totalItems}`;

  // totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
            <div class="box">
            <i class="fas fa-trash cart-close"></i>
          <img src="${item.imgSrc}" alt="${item.name}">
            <div class="content">
              <h3>${item.name}</h3>
              <span class="price">₹ ${item.price}</span>
          </div> 
          <div class="units">
                <div class="button minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="button plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}


// remove item from cart
function removeItemFromCart(id) {
  console.log('item removed')
  cart = cart.filter((item) => item.id === id);

  updateCart();
}
removeItemFromCart();
// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

