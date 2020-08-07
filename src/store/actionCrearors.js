import {DEL_ITEM, ADD_ITEM, INPUT_CHANGE} from './actionTypes';

export const changeInputAction = value => ({
  type: INPUT_CHANGE,
  value
})

export const addItemAction = value => ({
  type: ADD_ITEM,
  value
})

export const delItemAction = index => ({
  type: DEL_ITEM,
  value: index
})