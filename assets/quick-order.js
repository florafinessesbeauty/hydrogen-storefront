document.addEventListener("DOMContentLoaded", function() {
    const quickOrderForm = document.getElementById("quick-order-form");
  
    quickOrderForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(quickOrderForm);
      const products = formData.getAll("product");
      const quantities = formData.getAll("quantity");
  
      products.forEach((productId, index) => {
        fetch(`/cart/add.js`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: JSON.stringify({
            items: [
              {
                id: productId,
                quantity: quantities[index]
              }
            ]
          })
        });
      });
  
      alert("Products added to cart!");
    });
  });
  