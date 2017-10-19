import { REQUEST_ADDRESS } from '../actions';

const initialState =  {
  data: []
};

export default function address(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case REQUEST_ADDRESS:
      return {
        ...state, data: action.payload.body
      }
    default:
      return state
  }
}