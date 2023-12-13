// Sample shopping cart data
const cartItems = [
  { id: 1, name: 'Item 1', quantity: 2, price: 10, liked: false },
  { id: 2, name: 'Item 2', quantity: 1, price: 15, liked: true },
  { id: 3, name: 'Item 3', quantity: 3, price: 8, liked: false }
];

// Function to adjust the quantity of an item
function adjustQuantity(itemId, newQuantity) {
  const item = cartItems.find(item => item.id === itemId);
  if (item) {
    item.quantity = newQuantity;
    updateCart();
  }
}

// Function to delete an item from the cart
function deleteItem(itemId) {
  const index = cartItems.findIndex(item => item.id === itemId);
  if (index !== -1) {
    cartItems.splice(index, 1);
    updateCart();
  }
}

// Function to toggle like status of an item
function toggleLike(itemId) {
  const item = cartItems.find(item => item.id === itemId);
  if (item) {
    item.liked = !item.liked;
    updateCart();
  }
}

// Function to update the cart display
function updateCart() {
  const cartElement = document.getElementById('shopping-cart');
  cartElement.innerHTML = '';

  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('shopping-cart-item');

    const nameElement = document.createElement('span');
    nameElement.innerText = item.name;
    itemElement.appendChild(nameElement);

    const minusButton = document.createElement('button');
    minusButton.innerText = '-';
    minusButton.classList.add('button');
    minusButton.addEventListener('click', () => {
      adjustQuantity(item.id, item.quantity - 1);
    });
    itemElement.appendChild(minusButton);

    const quantityElement = document.createElement('span');
    quantityElement.innerText = item.quantity;
    itemElement.appendChild(quantityElement);

    const plusButton = document.createElement('button');
    plusButton.innerText = '+';
    plusButton.classList.add('button');
    plusButton.addEventListener('click', () => {
      adjustQuantity(item.id, item.quantity + 1);
    });
    itemElement.appendChild(plusButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('button');
    deleteButton.addEventListener('click', () => {
      deleteItem(item.id);
    });
    itemElement.appendChild(deleteButton);

    const likeButton = document.createElement('button');
    likeButton.innerText = item.liked ? '❤️' : '♡';
    likeButton.classList.add('button');
    if (item.liked) {
      likeButton.classList.add('liked');
    }
    likeButton.addEventListener('click', () => {
      toggleLike(item.id);
      likeButton.classList.toggle('liked');
    });
    itemElement.appendChild(likeButton);

    cartElement.appendChild(itemElement);
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const totalPriceElement = document.createElement('p');
  totalPriceElement.innerText = `Total Price: ${totalPrice}`;
  cartElement.appendChild(totalPriceElement);
}

// Initial cart update
updateCart();