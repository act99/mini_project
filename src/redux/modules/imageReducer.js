import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  preview: null,
};

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
};

export { actionCreators };
