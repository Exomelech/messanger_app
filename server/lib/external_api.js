const mysql_api = require("./mysql_api");

module.exports = external_api = (function(){

  const external_api = {};
  const utils = {};

  utils.prepareDataForSql = function(data){
    let sql_req = {};
    for( let [key, value] of Object.entries(data) ){
      sql_req[key] = [value];
    };
    return {
      sql:sql_req,
      type: Object.keys(sql_req).length == 2 ? 'login' : 'reg'
    };
  };

  utils.catchSQLError = function(err){
    let ret = {
      status: 'error'
    };
    if( err.code === 'ER_DUP_ENTRY' ){
      ret.data = 'Login already used';
    }else{
      ret.status = 'sql-error'
      ret.data = {
        message: err.message,
        code: err.code
      };
    };
    return ret;
  };

  utils.login_request = function(sql){
    return mysql_api.select('users', sql)
      .then( req => {
        let state = req[0][0];
        if( !state ){
          return {
            status: 'error',
            data: 'Wrong login or password!'
          };
        }else{
          return {
            status: 'ok',
            data: {
              name: state.name,
              id: state.id
            }
          };
        };
      }).catch(err => {
        return utils.catchSQLError(err);
      });
  }

  utils.reg_request = function(sql){
    return mysql_api.insert('users', sql)
      .then( (req) => {
        return {
          status: 'ok',
        };
      }).catch( err => {
        return utils.catchSQLError(err);
      });
  };

  external_api.auth_request = function(request){
    let sql = utils.prepareDataForSql(request);
    if( sql.type === 'login' ){
      return utils.login_request(sql.sql);
    }else{
      return utils.reg_request(sql.sql);
    };
  };

  external_api.reg_request = function(request){
    let sql = utils.prepareDataForSql(request);
    return utils.reg_request(sql.sql);
  };

  return external_api;

}());