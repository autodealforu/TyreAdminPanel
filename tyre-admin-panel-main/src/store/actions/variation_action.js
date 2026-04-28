import api from "../../domain/api";
import {
    GET_VARIATIONS_STATED,
    GET_VARIATIONS,
    GET_VARIATIONS_ENDED,
    ADD_VARIATION_STATED,
    ADD_VARIATION,
    ADD_VARIATION_ENDED,
    EDIT_VARIATION_STATED,
    EDIT_VARIATION,
    EDIT_VARIATION_ENDED,
    GET_VARIATION_STATED,
    GET_VARIATION,
    GET_VARIATION_ENDED,
    GET_ALL_VARIATIONS_STATED,
    GET_ALL_VARIATIONS,
    GET_ALL_VARIATIONS_ENDED,
} from "../types/variation_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addVariation = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_VARIATION_STATED,
        });
        const { data } = await api.post(`/variations`, formData);
        dispatch({
            type: ADD_VARIATION,
            payload: data,
        });
        dispatch({
            type: ADD_VARIATION_ENDED,
        });
    } catch (error) {
        dispatch({
            type: ADD_VARIATION_ENDED,
        });
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
    }
};
export const getVariations =
    ({ pageNumber = "" }) =>
        async (dispatch) => {
            try {
                dispatch({
                    type: GET_VARIATIONS_STATED,
                });
                const queryParams = qs.parse(window.location.search.replace("?", ""));
                const query = qs.stringify(queryParams, {
                    encodeValuesOnly: true, // prettify url
                });

                const { data } = await api.get(`/variations?&${query}`);

                dispatch({
                    type: GET_VARIATIONS,
                    payload: data,
                });
                dispatch({
                    type: GET_VARIATIONS_ENDED,
                });
            } catch (error) {
                dispatch({
                    type: GET_VARIATIONS_ENDED,
                });
                dispatch(handleErrorLocal(error));
                dispatch(handleError(error));
            }
        };
export const getVariation = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_VARIATION_STATED,
        });
        const { data } = await api.get(`/variations/${id}`);

        dispatch({
            type: GET_VARIATION,
            payload: data,
        });
        dispatch({
            type: GET_VARIATION_ENDED,
        });
    } catch (error) {
        dispatch({
            type: GET_VARIATION_STATED,
        });
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
    }
};
export const editVariation = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: EDIT_VARIATION_STATED,
        });
        const { data } = await api.put(`/variations/${id}`, formData);
        dispatch({
            type: EDIT_VARIATION,
            payload: data,
        });
        dispatch({
            type: EDIT_VARIATION_ENDED,
        });
    } catch (error) {
        dispatch({
            type: EDIT_VARIATION_ENDED,
        });
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
    }
};
export const deleteVariation = (id) => async (dispatch) => {
    try {
        const { data } = await api.delete(`/variations/${id}`);
        dispatch(setAlert("Variation Deleted Successfully", "success"));
    } catch (error) {
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
    }
};
export const getAllVariations =
    ({ term, value }) =>
        async (dispatch) => {
            try {
                dispatch({
                    type: GET_ALL_VARIATIONS_STATED,
                });
                const { data } = await api.get(
                    `/variations/all?term=${term}&value=${value}`
                );

                dispatch({
                    type: GET_ALL_VARIATIONS,
                    payload: data,
                });
                dispatch({
                    type: GET_ALL_VARIATIONS_ENDED,
                });
            } catch (error) {
                dispatch({
                    type: GET_ALL_VARIATIONS_ENDED,
                });
                dispatch(handleErrorLocal(error));
                dispatch(handleError(error));
            }
        };

export const handleErrorLocal = () => async (dispatch) => { };
