import * as network from '../network/'

export const api = network.createApi({
  rootUrl: 'http://etheroscope.alice.si/',
  apiUrl: 'http://etheroscope.alice.si/api/'
})