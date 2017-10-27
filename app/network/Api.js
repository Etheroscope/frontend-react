import 'isomorphic-fetch'
import Promise from 'es6-promise'
import { merge, identity, gt, type, trim, toLower, toUpper } from 'ramda'
import { futurizeP } from 'futurize'
Promise.polyfill()

export const ETHEROSCOPE_INFO = 'http://etheroscope.alice.si/'
export const API_ETHEROSCOPE_INFO = 'http://etheroscope.alice.si/api/'

const createApi = ({ rootUrl = ETHEROSCOPE_INFO, apiUrl = API_ETHEROSCOPE_INFO } = {}, returnType) => {
  const future = returnType ? futurizeP(returnType) : identity
  const request = ({ url, method, endPoint, data, extraHeaders }) => {
    // options
    let options = {
      method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'omit'
    }
    
    // body
    const body = encodeFormData({...data})

    switch (method) {
      case 'GET':
        const urlGET = `${url}${endPoint}?${body}`
        return fetch(urlGET, options).then(checkStatus).then(extractData)
      case 'POST':
        const urlPOST = `${url}${endPoint}`
        options.body = body
        return fetch(urlPOST, options).then(checkStatus).then(extractData)
      default:
        return Promise.reject(new Error('HTTP_ACTION_NOT_SUPPORTED'))
    }
  }

  // checkStatus :: Response -> Promise Response
  const checkStatus = (r) => r.ok ? Promise.resolve(r) : r.text().then(j => Promise.reject(j))

  // extractData :: Response -> Promise (JSON | BLOB | TEXT)
  const extractData = (r) => {
    const responseOfType = (t) =>
      r.headers.get('content-type') &&
      r.headers.get('content-type').indexOf(t) > -1

    switch (true) {
      case responseOfType('application/json'):
        return r.json()
      case responseOfType('image/jpeg'):
        return r.blob()
      default:
        return r.text()
    }
  }

  // encodeFormData :: Object -> String
  const encodeFormData = (data) => {
    return data
      ? Object.keys(data)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
        .join('&')
      : ''
  }

  const fetchVariables = (address) => {
      const data = { format: 'json' }
      return request({ url: apiUrl, method: 'GET', endPoint: `explore/${address}`, data })
  }

  const fetchHistory = (address, variable) => {
    const data = { format: 'json' }
    return request({ url: apiUrl, method: 'GET', endPoint: `getHistory/${address}/${variable}`, data })
  }

  return {
      fetchVariables: future(fetchVariables),
      fetchHistory: future(fetchHistory)
  }
}

export default createApi