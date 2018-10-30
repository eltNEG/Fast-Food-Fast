const token = localStorage.getItem('fffToken');
const baseUrl = './api/v1';

const loadOrders = () => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: token,
    },
  };
  fetch(`${baseUrl}/orders`, options)
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData.success) {
        jsonData.data.orders.forEach((order) => {
          $('tbody').append(`
                <tr id='${order.orderid}tr'>
                <td>${order.customername}</td>
                <td>${order.foodordered}</td>
                <td>${order.customeraddress}</td>
                <td>${new Date(order.dateordered).toLocaleDateString()}</td>
                <td>
                    <select id='${
  order.orderid
}select' onchange="handleChange('${order.orderid}', '${
  order.orderstatus
}')">
                        <option hidden class="accepted">--------</option>
                        <option value="processing" class="accepted">processing</option>
                        <option value="cancelled" class="declined">cancelled</option>
                        <option value="complete" >complete</option>
                    </select>
                </td>
                <td id='${order.orderid}td'>
                    ${order.orderstatus}
                </td>
            </tr>
                `);
        });
      }
    });
};

loadOrders();

const handleChange = (orderId, orderStatus) => {
  const newOrderStatus = document.getElementById(`${orderId}select`).value;
  const currentOrder = document.getElementById(`${orderId}td`);
  if (newOrderStatus !== orderStatus) {
    currentOrder.innerHTML = `<button class="update-order-btn" id='${orderId}button' onclick="handleClick('${orderId}', '${newOrderStatus}')">Update</button>`;
  } else {
    currentOrder.innerHTML = orderStatus;
  }
};
const handleClick = (orderId, newOrderStatus) => {
  const data = {
    orderStatus: newOrderStatus,
  };
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: token,
    },
  };
  fetch(`${baseUrl}/orders/${orderId}`, options)
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData.success) {
        const currentOrder = document.getElementById(`${orderId}td`);
        currentOrder.innerHTML = newOrderStatus;
      }
    });
};
const logout = () => {
  localStorage.removeItem('fffFoodurl');
  localStorage.removeItem('fffFoodname');
  localStorage.removeItem('fffToken');
  localStorage.removeItem('fffUser');
};

window.logout = logout;

window.handleChange = handleChange;
window.handleClick = handleClick;
