export default function fetchEtherscan(url) {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', `https://api.etherscan.io${url}`)
    xmlHttp.responseType = 'json'
    xmlHttp.onreadystatechange = function () {
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