const login = {};

login.login = (login, password, backendurl) => {
  fetch(`${backendurl}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  })
  .then( res => res.json())
  .then( res => {
    if( res.status == "ok" ){
      return res.user_data;
    }else{
      return res.error;
    };
  })
  .catch(err => console.warn('error '+err.message));
};

login.registration = (login, password, name, backendurl) => {
  fetch(`${backendurl}/registration`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      password: password,
      name: name
    }),
  })
  .then( res => res.json())
  .then( res => {
    if( res.status == "ok" ){
      return res.user_data;
    }else{
      return res.error;
    };
  })
  .catch(err => console.warn('error '+err.message));
}

export default login;