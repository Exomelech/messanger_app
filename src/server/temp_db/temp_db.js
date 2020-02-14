const fs = require('fs');
const path = require('path');
const db = JSON.parse( 
  fs.readFileSync( 
    path.join(__dirname, "./db.json" ) 
  )
);

module.exports = temp_db = (() => {
  const api = {};

  api.registration = ({login, password, name}) => {
    return new Promise( res => {
      for( const [k, user] of Object.entries(db.users) ){
        if( login === user.login ){
          res({
            status: 'error',
            errmsg: 'Login already used'
          });
          return;
        };
      };
      const id = ++db.counter;
      const newUser = {
        login,
        password,
        name,
        id
      };
      db.users[id] = newUser;
      fs.writeFileSync(
        path.join(__dirname, "./db.json" ), 
        JSON.stringify( db )
      );
      res({
        status: 'ok'
      });
    });
  };

  api.login = ({login, password}) => {
    return new Promise( res => {
      for( const [k, user] of Object.entries(db.users) ){
        if( login === user.login ){
          if( password === user.password ){
            res({
              status: 'ok',
              data: {
                name: user.name,
                id: user.id
              }
            });
          };
          return;
        };
      };
      res({
        status: 'error',
        errmsg: 'Invalid password or login'
      });
    });
  };

  return api;

})();