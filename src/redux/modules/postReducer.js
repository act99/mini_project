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
const deletePost = createAction(DELETE_POST, (post_list) => ({ post_list }));
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
        console.log(res.data);
        dispatch(setPost(res.data));
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
};
// const editPostDB = (postID, contents) => {
//   apis.edit(postID, contents).then((res) => {
//     console.log(res);
//   });
// };

const addPostDB = (contents) => {
  console.log(contents);
  let postContent = {
    ...initalPost,
    title: contents.title,
    content: contents.content,
    endAt: contents.endAt,
    price: contents.price,
    minimum: contents.minimum,
  };
  console.log(postContent);
  return function (dispatch, getState, { history }) {
    apis
      .add(postContent)
      .then((res) => {
        dispatch(addPost(postContent));
        history.push("/");
      })
      .catch((error) => {
        alert("저장에 실패했습니다. 네트워크 상태를 확인해주세요.");
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post_list);
        draft.list = [...action.payload.post_list];
        // draft.list = [...action.payload.list];
        // draft.push(...action.payload.post_list);
        // draft.list = draft.list.reduce((acc, curr) => {
        //   if (acc.findIndex((a) => a.id === curr.id) === -1) {
        //     return [...acc, curr];
        //   } else {
        //     acc[acc.findIndex((a) => a.id === curr.id)] = curr;
        //     return acc;
        //   }
        // }, []);
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

const actionCreators = {
  setPost,
  addPost,
  editPost,
  deletePost,
  addPostDB,
  getPostDB,
};

export { actionCreators };
