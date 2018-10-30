const baseUrl = "http://localhost:3000/api/v1";

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const foodNameElement = document.getElementById('food-name');
//   const imgUrlElement = document.getElementById('img-url');

//   const foodName = foodNameElement.value;
//   const imgUrl = imgUrlElement.value;
//   const data = {
//     menu: foodName,
//     imgUrl,
//   };
//   const url = `${baseUrl}/menu`;
//   const options = {
//     method: 'POST',
//     body: data,
//     headers: new Headers(),
//     json: true,
//   };

//   console.log(options);

//   fetch(url).then((res) => {
//     console.log(res);
//   });
// };

$(document).ready(() => {
  //load foods from db and set
  fetch(`${baseUrl}/menu`)
    .then(response => response.json())
    .then(jsonData => {
      //load data into html
      jsonData.data.menu.forEach(food => {
        if (food.foodname) {
          return $("#food-table").append(`
        <tr class="row">
          <td>${food.foodname}</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
        `);
        }
      });
    });

  $("#btn").click(event => {
    event.preventDefault();
    console.log("clicked");
    data = {
      menu: $("#food-name").val(),
      url: $("#img-url").val()
    };
    const url = `${baseUrl}/menu`;
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsInVzZXJuYW1lIjoiYWRtaW4xIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTM5OTM2NDk2LCJleHAiOjE1Mzk5NDAwOTZ9.t9oTSTLp5eaP_xL6yE_c2jPedA0Q9xVrbH8wQA1WXjE"
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(jsonData => {
        console.log(jsonData);
        if (jsonData.success) {
          return jsonData.data.menu.forEach(food => {
            if (food.foodname) {
              return $("#food-table").append(`
            <tr class="row">
              <td>${food.foodname}</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
            `);
            }
          });
        }
      });
  });
});
