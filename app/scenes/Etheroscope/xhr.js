import config from '../config'

const API_BASE_URL = config.API_BASE_URL

export default function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", API_BASE_URL + url); 
    xmlHttp.responseType = 'json';
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        return resolve(xmlHttp.responseText);
      }
      reject(new Error("Invalid server response"))
    }
    xmlHttp.send()
  });
}
