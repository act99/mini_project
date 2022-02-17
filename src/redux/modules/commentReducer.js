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
const setComment = createAction(SET_COMMENT, (list) => ({
  list,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));
const editComment = createAction(EDIT_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const initialState = {
  list: [],
};

const initalComment = {
  userinfo: { email: "", nickname: "" },
  comment: "댓글 내용",
  postId: 0,
};

//middlewares
const getCommentDB = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getComments(postId)
      .then((res) => {
        dispatch(setComment(res.data));
      })
      .catch((error) => console.log(error));
  };
};
const deleteCommentDB = (commentId) => {
  return function (dispatch, getState, { history }) {
    apis.delComment(commentId).then((res) => {
      dispatch(deleteComment(commentId));
    });
  };
};

const addCommentDB = (userinfo, contents, postId) => {
  const comment = {
    ...initalComment,
    comment: contents,
    postId: postId,
    userinfo: { ...userinfo },
  };
  return function (dispatch, getState, { history }) {
    apis
      .addComment(postId, contents)
      .then((res) => {
        dispatch(addComment(comment));
      })
      .catch((error) => console.log(error));
  };
};

//reducer
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [...action.payload.list];
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.comment);
      }),
    [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const index = draft.list.indexOf(action.payload.commentId);
        draft.list.splice(index, 1);
      }),
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
  deleteCommentDB,
};

export { actionCreators };
