import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Ensure the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  var quantityInput = document.getElementById('quantity');
  if (quantityInput) {
    quantityInput.addEventListener('change', function() {
      var quantity = this.value;
      var unitPrice = parseFloat(document.getElementById('total-price').dataset.unitPrice);
      var totalPrice = unitPrice * quantity;
      document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    });
  }
});

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));
