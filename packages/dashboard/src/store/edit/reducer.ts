import { getType } from "typesafe-actions"
import {
  INewQuizQuery,
  INewQuizTranslation,
} from "../../../../common/src/types/index"
import * as edit from "./actions"

const initialState = {
  course: "",
}

export const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case getType(edit.set):
      return action.payload
    case getType(edit.create):
      return { ...initialState, ...action.payload }
    default:
      return state
  }
}
