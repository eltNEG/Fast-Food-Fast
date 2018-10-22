const baseUrl = 'http://localhost:3000/api/v1';

const handleCheckout = (event) => {
  event.preventDefault();
  const data = {
    customerName: document.getElementById('name').value,
    customerAddress: document.getElementById('address').value,
    foodOrdered: localStorage.getItem('fffFoodname'),
  };
  const url = `${baseUrl}/orders`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('fffToken'),
    },
  };
  fetch(url, options)
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData.success) {
        document.getElementById('form1').classList.add('hide');
        document.getElementById('form2').classList.remove('hide');
      } else {
        console.log(jsonData);
      }
    });
};

const handleDone = (event) => {
  event.preventDefault();
  window.location.href = './order-food.html';
};

window.handleDone = handleDone;
window.handleCheckout = handleCheckout;
