const baseUrl = "http://localhost:3000/api/v1";

$(document).ready(() => {
  //load foods from db and set
  console.log('getting data')
  fetch(`${baseUrl}/menu`)
    .then(response => response.json())
    .then(jsonData => {
      //load data into html
      jsonData.data.menu.forEach(food => {
        if (food.foodname) {
          return $("#food-item-list").append(`
          <div class='food-item-case'>
            <img class='food-items' src="https://www.dropbox.com/s/fgt9obc0tdrx5hd/pancake.jpeg?raw=1" alt='food-item'>
            <div class='food-item-footer'>
                <div class="food-name">${food.foodname}</div>
                <div class="food-price"> ₦1,200.00</div>
                <div class='food-item-btn'>Add to cart</div>
            </div>
        </div>
        `);
        }
      });
    });
});
