const userid = localStorage.getItem("fffUser")
const token = localStorage.getItem("fffToken")

const loadOrders = () => {
    const url = `http://localhost:3000/api/v1/users/${userid}/orders`

    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          authorization: token,
        },
      };
    fetch(url, options).then(res => res.json()).then(jsonData => {
        if(jsonData.success) {
            jsonData.data.orders.forEach(order => {
                $("tbody").append(`
                <tr>
                <td>${order.customername}</td>
                <td>${order.foodordered}</td>
                <td>${order.customeraddress}</td>
                <td>${(new Date(order.dateordered)).toLocaleDateString()}</td>
                <td>
                    <select>
                        <option class="accepted">--------</option>
                        <option class="accepted">Accept</option>
                        <option class="declined">Reject</option>
                        <option class="accepted">complete</option>
                    </select>
                </td>
                <td>
                    ${order.orderstatus}
                </td>
            </tr>
                `)
            })
        }
    })
}

loadOrders()