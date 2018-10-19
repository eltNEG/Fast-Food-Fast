const baseUrl = 'http://localhost:3000/api/v1';

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
  $('#btn').click((event) => {
    event.preventDefault();
    console.log('clicked');
  });
});
