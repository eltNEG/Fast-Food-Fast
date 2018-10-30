const baseUrl = 'http://localhost:3000/api/v1';

$(document).ready(() => {
  // load foods from db and set
  fetch(`${baseUrl}/menu`)
    .then(response => response.json())
    .then(jsonData => jsonData.data.menu.forEach((food) => {
      if (food.foodname) {
        $('#food-table').append(`
        <tr id=${food.foodid} class="row">
          <td>${food.foodname}</td>
          <td onclick="startEditFood('${food.foodid}', '${food.foodname}', '${food.url}')">Edit</td>
          <td onclick="deleteFood('${food.foodid}')">Delete</td>
        </tr>
        `);
      }
    }));

  $('#btn-add').click((event) => {
    event.preventDefault();
    const data = {
      menu: $('#food-name').val(),
      imgUrl: $('#img-url').val(),
    };
    const url = `${baseUrl}/menu`;
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
      .catch(err => console.log(err))
      .then((jsonData) => {
        if (jsonData.success) {
          jsonData.data.menu.forEach((food) => {
            if (food.foodname) {
              $('#food-table').append(`
            <tr id=${food.foodid} class="row">
              <td>${food.foodname}</td>
              <td onclick="startEditFood('${food.foodid}', '${food.foodname}', '${food.url}')">Edit</td>
              <td onclick="deleteFood('${food.foodid}')">Delete</td>
            </tr>
            `);
            }
          });
        }
      });
  });

  $('#btn-edit').click((event) => {
    event.preventDefault();
    const data = {
      menu: $('#food-name').val(),
      imgUrl: $('#img-url').val(),
    };
    const url = `${baseUrl}/menu/${$('#food-id').val()}`;

    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('fffToken'),
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then((jsonData) => {
        if (jsonData.success) {
          jsonData.data.menu.forEach((food) => {
            if (food.foodname) {
              $(`#${food.foodid}`).html(`
            <tr id=${food.foodid} class="row">
              <td>${food.foodname}</td>
              <td onclick="startEditFood('${food.foodid}', '${food.foodname}', '${food.url}')">Edit</td>
              <td onclick="deleteFood('${food.foodid}')">Delete</td>
            </tr>
            `);
            }
          });
        }
      })
      .then(() => {
        document.getElementById('btn-add').classList.remove('hide');
        document.getElementById('btn-edit').classList.add('hide');
        document.getElementById('food-name').value = '';
        document.getElementById('img-url').value = '';
        document.getElementById('food-id').value = '';
      });
  });
});


const deleteFood = (foodid) => {
  const url = `${baseUrl}/menu/${foodid}`;
  const options = {
    method: 'DELETE',
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
        const deletedFood = document.getElementById(foodid);
        deletedFood.parentNode.removeChild(deletedFood);
      }
    });
};

const startEditFood = (foodid, foodname, url) => {
  let imgURL;
  if (url === 'null') {
    imgURL = '';
  } else {
    imgURL = url;
  }
  document.getElementById('btn-add').classList.add('hide');
  document.getElementById('btn-edit').classList.remove('hide');
  document.getElementById('food-name').value = foodname;
  document.getElementById('img-url').value = imgURL;
  document.getElementById('food-id').value = foodid;
};

const logout = () => {
  localStorage.removeItem('fffFoodurl');
  localStorage.removeItem('fffFoodname');
  localStorage.removeItem('fffToken');
  localStorage.removeItem('fffUser');
};

window.logout = logout;
window.deleteFood = deleteFood;
window.startEditFood = startEditFood;
