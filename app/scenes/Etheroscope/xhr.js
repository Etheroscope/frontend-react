export function fetchJson(url) {
  return new Promise((resolve) => {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', BACKEND_BASE_URL + url)
    xmlHttp.responseType = 'json'
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState === 4) {
        resolve({ response: xmlHttp.response, status: xmlHttp.status})
      }
    }
    xmlHttp.send()
  })
}

export function postJson(url) {
  return new Promise((resolve) => {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('POST', BACKEND_BASE_URL + url)
    xmlHttp.responseType = 'json'
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4) {
        resolve({ response: xmlHttp.response, status: xmlHttp.status})
      }
    }
    xmlHttp.send()
  })
}