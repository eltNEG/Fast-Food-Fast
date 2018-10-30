const baseUrl = 'http://localhost:3000/api/v1';

$(document).ready(() => {
  // load foods from db and set
  fetch(`${baseUrl}/menu`)
    .then(response => response.json())
    .then(jsonData => jsonData.data.menu.forEach((food) => {
      if (food.foodname) {
        $('#food-item-list').append(`
          <div class='food-item-case'>
            <img  class='food-items' src='${food.url}' alt='food-item'>
            <div class='food-item-footer'>
                <div class="food-name">${food.foodname}</div>
                <div class="food-price"> ₦1,200.00</div>
                <div onclick="addToCart(event,'${
  food.foodname
}', '${
  food.url
}', true)" class='food-item-btn'>Buy Now</div>
            </div>
        </div>
        `);
      }
    }));
});

const addToCart = (event, foodname, foodurl, gotoBuy = false) => {
  if (gotoBuy) {
    localStorage.setItem('fffFoodname', foodname);
    localStorage.setItem('fffFoodurl', foodurl);
    if (localStorage.getItem('fffToken')) {
      window.location.href = './checkout.html';
    } else {
      window.location.href = './login.html';
    }
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
  // document.getElementById('cart-item').innerText =
  // Number(document.getElementById('cart-item').innerText) + 1;
};

const handleSearch = () => {
  const searchBoxVal = document.getElementById('search-box').value.toLowerCase();
  const foodList = document.getElementsByClassName('food-item-case');
  /*eslint-disable */
  for (const food of foodList) {
    const foodName = (food.getElementsByClassName('food-name'))[0].innerText.toLowerCase();
    if (foodName.includes(searchBoxVal)) {
      food.style.display = '';
    } else {
      food.style.display = 'none';
    }
  }
  /* eslint-enable */
};

window.handleSearch = handleSearch;
window.addToCart = addToCart;
