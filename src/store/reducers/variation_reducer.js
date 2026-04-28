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
    GET_ALL_VARIATIONS_ENDED
} from "../types/variation_type";

const initialState = {
    variations_loading: true,
    variations: null,
    page: null,
    pages: null,
    total_variations: 0,

    variation: null,
    variation_loading: null,

    loading: true,

    variation_message: null,
    all_variations: null,
    all_variations_loading: null,
    add_variation_loading: true,
    edit_variation_loading: true
};

export const variation_reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_VARIATIONS_STATED:
            return {
                ...state,
                variations: null,
                pages: null,
                page: null,
                total_variations: 0,
                variations_loading: true
            };
        case GET_VARIATIONS:
            return {
                ...state,
                variations: payload.variations,
                pages: payload.pages,
                page: payload.page,
                total_variations: payload.count
            };
        case GET_VARIATIONS_ENDED:
            return {
                ...state,
                variations_loading: false
            };
        case GET_ALL_VARIATIONS_STATED:
            return {
                ...state,
                all_variations_loading: true,
                all_variations: null
            };
        case GET_ALL_VARIATIONS:
            return {
                ...state,
                all_variations: payload
            };
        case GET_ALL_VARIATIONS_ENDED:
            return {
                ...state,
                all_variations_loading: false
            };

        case ADD_VARIATION_STATED:
            return {
                ...state,
                variation_message: null,
                add_variation_loading: true
            };
        case ADD_VARIATION:
            return {
                ...state,
                variation_message: payload
            };
        case ADD_VARIATION_ENDED:
            return {
                ...state,
                add_variation_loading: false
            };
        case GET_VARIATION_STATED:
            return {
                ...state,
                variation: null,
                variation_loading: true
            };
        case GET_VARIATION:
            return {
                ...state,
                variation: payload
            };
        case GET_VARIATION_ENDED:
            return {
                ...state,
                variation_loading: false
            };
        case EDIT_VARIATION_STATED:
            return {
                ...state,
                variation_message: null,
                edit_variation_loading: true
            };
        case EDIT_VARIATION:
            return {
                ...state,
                variation_message: payload
            };
        case EDIT_VARIATION_ENDED:
            return {
                ...state,
                edit_variation_loading: false
            };

        default:
            return state;
    }
};
