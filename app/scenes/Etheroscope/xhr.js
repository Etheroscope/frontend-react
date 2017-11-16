export default function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', BACKEND_BASE_URL + url)
    xmlHttp.responseType = 'json'
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200 || xmlHttp.status === 304) {
          return resolve(xmlHttp.response)
        }
        reject(new Error('Invalid server response'))
      }
    }
    xmlHttp.send()
  })
}
