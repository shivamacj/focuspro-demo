// Product data
const product = {
  id: "FP-001",
  name: "FocusPro Headphones",
  price: 2999,
  currency: "INR"
};

const productData = {
  item_id: "FP-001",
  item_name: "FocusPro Headphones",
  price: 2999,
  quantity: 1,
  currency: "INR"
};

if (window.location.pathname.includes("product.html")) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "view_item",
    ecommerce: {
      currency: productData.currency,
      items: [productData]
    }
  });
}

const addToCartBtn = document.getElementById("add_to_cart");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {

    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: productData.currency,
        items: [productData]
      }
    });

    localStorage.setItem("cart", JSON.stringify(productData));
    window.location.href = "cart.html";
  });
}

if (window.location.pathname.includes("cart.html")) {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    window.dataLayer.push({
      event: "view_cart",
      ecommerce: {
        currency: cart.currency,
        items: [cart],
        value: cart.price
      }
    });
  }
}





// Load cart
const cartDiv = document.getElementById("cart_items");
if (cartDiv) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cartDiv.innerHTML = `
      <p>${cart.name}</p>
      <p>Price: ₹${cart.price}</p>
    `;
  }
}

// Place order

const placeOrderBtn = document.getElementById("place_order");
if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    //localStorage.removeItem("cart");
    window.location.href = "thankyou.html";
  });
}


const checkoutBtn = document.getElementById("proceed_to_checkout");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: cart.currency,
        items: [cart],
        value: cart.price
      }
    });
  });
}

