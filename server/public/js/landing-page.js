const baseUrl = 'http://localhost:3000/api/v1';

$(document).ready(() => {
  // load foods from db and set
  console.log('getting data');
  fetch(`${baseUrl}/menu`)
    .then(response => response.json())
    .then(jsonData => jsonData.data.menu.forEach((food) => {
      if (food.foodname) {
        $('#food-item-list').append(`
          <div class='food-item-case'>
            <img onclick="addToCart(event,'${
  food.foodname
}', true)" class='food-items' src="https://www.dropbox.com/s/fgt9obc0tdrx5hd/pancake.jpeg?raw=1" alt='food-item'>
            <div class='food-item-footer'>
                <div class="food-name">${food.foodname}</div>
                <div class="food-price"> ₦1,200.00</div>
                <div onclick="addToCart(event,'${
  food.foodname
}')" class='food-item-btn'>Add to cart</div>
            </div>
        </div>
        `);
      }
    }));
});

const addToCart = (event, foodname, gotoBuy = false) => {
  if (gotoBuy) {
    localStorage.setItem('fffFoodname', foodname);
    console.log(localStorage.getItem('fffFoodname'));
    window.location.href = './checkout.html';
    return;
  }

  // console.log(foodname)
  // let fffCart = localStorage.getItem('fffCart')
  // if(fffCart){
  //   fffCart += ` ${foodname}`
  // }else{
  //   fffCart = foodname
  // }
  // localStorage.setItem('fffCart', fffCart)
  // localStorage.removeItem('fffCart');
  document.getElementById('cart-item').innerText = Number(document.getElementById('cart-item').innerText) + 1;
};

window.addToCart = addToCart;
