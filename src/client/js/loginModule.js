const login = {};

login.login = async (login, password, backendurl) => {
  try {
    const res = await fetch(`http://${backendurl}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password
      })
    });
    return await res.json();
  }
  catch (err) {
    return console.warn('error ' + err.message);
  }
};

login.registration = async (login, password, name, backendurl) => {
  try {
    const res = await fetch(`http://${backendurl}/registration`, {
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
    });
    return await res.json();
  }
  catch (err) {
    return console.warn('error ' + err.message);
  }
}

export default login;