const API_BASE_URL = 'production-api.etheroscope.info';

export default function fetchJson(url) {
  return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", API_BASE_URL + url); 
    xmlHttp.responseType = 'json';
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200 || xmlHttp.status == 304) {
          return resolve(xmlHttp.response);          
        }
        reject(new Error("Invalid server response"))        
      }
    }
    xmlHttp.send();
  });
};
