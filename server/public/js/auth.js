const baseUrl = 'http://localhost:3000/api/v1';

const validateLogin = (event) => {
  event.preventDefault();
  const data = {
    username: $('#username').val(),
    password: $('#password').val(),
  };
  const url = `${baseUrl}/auth/login`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.log(err))
    .then((jsonData) => {
      if (jsonData.success) {
        localStorage.setItem('fffToken', jsonData.data.token);
        localStorage.setItem('fffUser', jsonData.data.user.userid);
        if (jsonData.data.user.role === 'admin') {
          window.location.href = './manage-order.html';
          return;
        }
        window.location.href = './order-food.html';
        return;
      }
    });
};

const validateSignup = (event) => {
  event.preventDefault();
  if ($('#password').val() !== $('#confirm-password').val()) {
    return false;
  }
  const data = {
    username: $('#username').val(),
    password: $('#password').val(),
  };
  const url = `${baseUrl}/auth/signup`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.log(err))
    .then((jsonData) => {
      if (jsonData.success) {
        localStorage.setItem('fffToken', jsonData.data.token);
        localStorage.setItem('fffUser', jsonData.data.user.userid);
        if (jsonData.data.user.role === 'admin') {
          (window.location.href = './manage-order.html');
          return;
        }
        (window.location.href = './order-food.html');
        return;
      }
    });
};

window.validateLogin = validateLogin;
window.validateSignup = validateSignup;
