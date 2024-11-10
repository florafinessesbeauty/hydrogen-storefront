document.addEventListener("DOMContentLoaded", function() {
    const quickViewButtons = document.querySelectorAll(".quick-view-button");
    const quickViewModal = document.getElementById("quick-view-modal");
    const closeQuickView = document.querySelector(".close-quick-view");
  
    quickViewButtons.forEach(button => {
      button.addEventListener("click", function() {
        const productId = this.getAttribute("data-product-id");
        fetch(`/products/${productId}.json`)
          .then(response => response.json())
          .then(product => {
            quickViewModal.querySelector("h2").innerText = product.title;
            quickViewModal.querySelector("img").src = product.featured_image.src;
            quickViewModal.querySelector("p.price").innerText = product.price;
            quickViewModal.querySelector("p.description").innerText = product.description;
            quickViewModal.classList.add("open");
          });
      });
    });
  
    closeQuickView.addEventListener("click", function() {
      quickViewModal.classList.remove("open");
    });
  
    window.addEventListener("click", function(event) {
      if (event.target == quickViewModal) {
        quickViewModal.classList.remove("open");
      }
    });
  });
  