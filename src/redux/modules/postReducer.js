import produce from "immer";
import moment from "moment";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/api";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

const initialState = {
  list: [],
};

const initalPost = {
  title: "제목",
  content: "내용",
  imageUrl:
    "https://firebasestorage.googleapis.com/v0/b/sparta-advanced.appspot.com/o/images%2F8vbGIWMVoacxfxM7KmOKBJJF7ED2_1644239482543?alt=media&token=8fd07d45-d907-46b6-ad86-e47a1c6b73cf",
  startAt: moment().format("YYYY-MM-DD"),
  endAt: moment().format("YYYY-MM-DD"),
  price: 3000,
  minimum: 100,
};

const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .get()
      .then((res) => {
        dispatch(setPost(res.data));
      })
      .catch((error) => console.log(error));
  };
};

const editPostDB = (postId, contents) => {
  return function (dispatch, getState, { history }) {
    apis
      .edit(postId, contents)
      .then((res) => {
        dispatch(editPost(contents));
        history.push("/");
      })
      .catch((error) => {
        alert("게시글 수정에 실패했습니다.");
      });
  };
};

const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .delete(postId)
      .then((res) => {
        dispatch(deletePost(postId));
        alert("게시글이 삭제되었습니다.");
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        alert("게시글이 삭제되지 않았습니다.");
      });
  };
};

const addPostDB = (contents) => {
  let postContent = {
    ...initalPost,
    title: contents.title,
    content: contents.content,
    endAt: contents.endAt,
    price: contents.price,
    minimum: contents.minimum,
    imageUrl: contents.imageUrl,
  };
  console.log(postContent);
  return function (dispatch, getState, { history }) {
    apis
      .add(postContent)
      .then((res) => {
        dispatch(addPost(postContent));
        history.replace("/");
      })
      .catch((error) => {
        alert("저장에 실패했습니다. 네트워크 상태를 확인해주세요.");
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [...action.payload.post_list];
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
        let dummyIndex = draft.list.findIndex(
          (item) => item["postId"] === action.payload.post_id
        );
        draft.list.splice(dummyIndex, 1);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  deletePost,
  addPostDB,
  getPostDB,
  deletePostDB,
  editPostDB,
};

export { actionCreators };
