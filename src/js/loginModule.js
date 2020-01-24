const login = {};

login.login = (login, password, backendurl) => {
  return fetch(`http://${backendurl}/registration`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      password: password
    })
  })
  .then( res => res.json())
  .catch(err => console.error('error '+err.message));
};

login.registration = (login, password, name, backendurl) => {
  return fetch(`http://${backendurl}/registration`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      password: password,
      name: name
    })
  })
  .then( res => res.json())
  .catch(err => console.error('error '+err.message));
}

export default login;