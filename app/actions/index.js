import request from 'superagent'

export const REQUEST_ADDRESS = 'REQUEST_ADDRESS'

const API_URL = 'http://etheroscope.alice.si/api/'

export function requestAddress(address) {
  const data = request.get(`${API_URL}${address}`);

  return {
    type: REQUEST_ADDRESS,
    payload: data
  }
}