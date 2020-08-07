import { INPUT_CHANGE, DEL_ITEM, ADD_ITEM } from "../store/actionTypes";
const defaultState = {
  placeholder: 'Write Something',
  inputVal: '',
  list: [
    {
      id: 1,
      type: 'React',
    },
    {
      id: 2,
      type: 'Vue',
    },
    {
      id: 3,
      type: 'Angela',
    },
  ],
} // 默认数据
export default (state = defaultState, action) => {
  if (action.type === DEL_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.value, 1)
    return newState
  }
  if (action.type === INPUT_CHANGE) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputVal = action.value
    return newState
  }
  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push({
      id: newState.list.length + 1,
      type: newState.inputVal
    })
    newState.inputVal = ''
    return newState
  }
  return state
}