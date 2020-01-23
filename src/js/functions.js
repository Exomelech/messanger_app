export function request(method, url, json){
  return new Promise( (res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.addEventListener('load', res);
    xhr.addEventListener('error', rej);
    if( json ){
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(json));
    }else{
        xhr.send();
    };
  }).then( res => JSON.parse(res.target.response) );
};