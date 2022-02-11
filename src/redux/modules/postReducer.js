import produce from "immer";
import moment from "moment";
import { createAction, handleActions } from "redux-actions";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));
const deletePost = createAction(DELETE_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

const initialState = {
  list: [],
};

const initalPost = {
  id: 0,
  user_info: {
    user_name: "유저이름",
    user_profile:
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  image_url:
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  contents: "콘텐츠입니다.",
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const getPost = () => {
  return function (dispatch, getState, { history }) {};
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.push(...action.payload.post_list);
        draft.list = draft.list.reduce((acc, curr) => {
          if (acc.findIndex((a) => a.id === curr.id) === -1) {
            return [...acc, curr];
          } else {
            acc[acc.findIndex((a) => a.id === curr.id)] = curr;
            return acc;
          }
        }, []);
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post_list);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex(
          (p) => p.id === action.payload.post_id
        );
        draft.list[index] = { ...draft.list[index], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionsCreators = {
  setPost,
  addPost,
  editPost,
  deletePost,
};

export { actionsCreators };
