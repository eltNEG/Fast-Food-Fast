const userid = localStorage.getItem("fffUser")
const token = localStorage.getItem("fffToken")

const loadHistory = () => {
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
                $(".order-table").append(`
                <tr class="order-table-row">
                <td class="order-table-left-col">${order.foodordered}</td>
                <td class="order-table-right-col">${(new Date(order.dateordered)).toLocaleDateString()}</td>
            </tr>
                `)
            })
        }
    })
}

loadHistory()