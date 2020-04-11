import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMMENT:
      if (state.comments.some(el => el.id === action.payload.id))
        return state;
      else
        return {...state,comments:state.comments.concat(action.payload)};

    default:
      return state;
  }
};
