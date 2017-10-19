import { combineReducers } from 'redux'
import AddressReducer from './address'

const rootReducer = combineReducers({
  address: AddressReducer
})

export default rootReducer