import produce from "immer";
import moment from "moment";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/api";

//Actions
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

//Action creators
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const editComment = createAction(EDIT_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const initialState = {
  list: [],
};

const initalComment = {
  userinfo: { email: "", nickname: "test" },
  comment: "댓글 내용",
};

const getCommentDB = () => {
  return function (dispatch, getState, { history }) {
    apis.getcomment().then((res) => {
      console.log(res);
    });
  };
};

const addCommentDB = (contents) => {
  let comment = {
    ...initalComment,
    post_id: contents.post_id,
    username: contents.userinfo.username,
    nicknane: contents.userinfo.nickname,
    comment: contents.comment,
  };
  return function (dispatch, getState, { history }) {
    apis.add(comment).then((res) => {
      dispatch(addComment(comment));
    });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  editComment,
  deleteComment,
  getCommentDB,
  addCommentDB,
};

export { actionCreators };
