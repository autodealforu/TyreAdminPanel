import api from "../../domain/api";
import {
    GET_FRAMES_STATED,
    GET_FRAMES,
    GET_FRAMES_ENDED,
    ADD_FRAME_STATED,
    ADD_FRAME,
    ADD_FRAME_ENDED,
    EDIT_FRAME_STATED,
    EDIT_FRAME,
    EDIT_FRAME_ENDED,
    GET_FRAME_STATED,
    GET_FRAME,
    GET_FRAME_ENDED,
    GET_ALL_FRAMES_STATED,
    GET_ALL_FRAMES,
    GET_ALL_FRAMES_ENDED,
} from "../types/frame_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addFrame = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_FRAME_STATED,
        });
        const { data } = await api.post(`/frames`, formData);
        dispatch({
            type: ADD_FRAME,
            payload: data,
        });
        dispatch({
            type: ADD_FRAME_ENDED,
        });
    } catch (error) {
        dispatch({
            type: ADD_FRAME_ENDED,
        });
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
    }
};
export const getFrames =
    ({ pageNumber = "" }) =>
        async (dispatch) => {
            try {
                dispatch({
                    type: GET_FRAMES_STATED,
                });
                const queryParams = qs.parse(window.location.search.replace("?", ""));
                const query = qs.stringify(queryParams, {
                    encodeValuesOnly: true, // prettify url
                });

                const { data } = await api.get(`/frames?&${query}`);

                dispatch({
                    type: GET_FRAMES,
                    payload: data,
                });
                dispatch({
                    type: GET_FRAMES_ENDED,
                });
            } catch (error) {
                dispatch({
                    type: GET_FRAMES_ENDED,
                });
                dispatch(handleErrorLocal(error));
                dispatch(handleError(error));
            }
        };
export const getFrame = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_FRAME_STATED,
        });
        const { data } = await api.get(`/frames/${id}`);

        dispatch({
            type: GET_FRAME,
            payload: data,
        });
        dispatch({
            type: GET_FRAME_ENDED,
        });
    } catch (error) {
        dispatch({
            type: GET_FRAME_STATED,
        });
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
    }
};
export const editFrame = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: EDIT_FRAME_STATED,
        });
        const { data } = await api.put(`/frames/${id}`, formData);
        dispatch({
            type: EDIT_FRAME,
            payload: data,
        });
        dispatch({
            type: EDIT_FRAME_ENDED,
        });
    } catch (error) {
        dispatch({
            type: EDIT_FRAME_ENDED,
        });
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
    }
};
export const deleteFrame = (id) => async (dispatch) => {
    try {
        const { data } = await api.delete(`/frames/${id}`);
        dispatch(setAlert("Frame Deleted Successfully", "success"));
    } catch (error) {
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
    }
};
export const getAllFrames =
    ({ term, value }) =>
        async (dispatch) => {
            try {
                dispatch({
                    type: GET_ALL_FRAMES_STATED,
                });
                const { data } = await api.get(`/frames/all?term=${term}&value=${value}`);

                dispatch({
                    type: GET_ALL_FRAMES,
                    payload: data,
                });
                dispatch({
                    type: GET_ALL_FRAMES_ENDED,
                });
            } catch (error) {
                dispatch({
                    type: GET_ALL_FRAMES_ENDED,
                });
                dispatch(handleErrorLocal(error));
                dispatch(handleError(error));
            }
        };

export const handleErrorLocal = () => async (dispatch) => { };
