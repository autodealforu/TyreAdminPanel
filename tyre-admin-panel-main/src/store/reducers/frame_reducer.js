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
    GET_ALL_FRAMES_ENDED
} from "../types/frame_type";

const initialState = {
    frames_loading: true,
    frames: null,
    page: null,
    pages: null,
    total_frames: 0,

    frame: null,
    frame_loading: null,

    loading: true,

    frame_message: null,
    all_frames: null,
    all_frames_loading: null,
    add_frame_loading: true,
    edit_frame_loading: true
};

export const frame_reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_FRAMES_STATED:
            return {
                ...state,
                frames: null,
                pages: null,
                page: null,
                total_frames: 0,
                frames_loading: true
            };
        case GET_FRAMES:
            return {
                ...state,
                frames: payload.frames,
                pages: payload.pages,
                page: payload.page,
                total_frames: payload.count
            };
        case GET_FRAMES_ENDED:
            return {
                ...state,
                frames_loading: false
            };
        case GET_ALL_FRAMES_STATED:
            return {
                ...state,
                all_frames_loading: true,
                all_frames: null
            };
        case GET_ALL_FRAMES:
            return {
                ...state,
                all_frames: payload
            };
        case GET_ALL_FRAMES_ENDED:
            return {
                ...state,
                all_frames_loading: false
            };

        case ADD_FRAME_STATED:
            return {
                ...state,
                frame_message: null,
                add_frame_loading: true
            };
        case ADD_FRAME:
            return {
                ...state,
                frame_message: payload
            };
        case ADD_FRAME_ENDED:
            return {
                ...state,
                add_frame_loading: false
            };
        case GET_FRAME_STATED:
            return {
                ...state,
                frame: null,
                frame_loading: true
            };
        case GET_FRAME:
            return {
                ...state,
                frame: payload
            };
        case GET_FRAME_ENDED:
            return {
                ...state,
                frame_loading: false
            };
        case EDIT_FRAME_STATED:
            return {
                ...state,
                frame_message: null,
                edit_frame_loading: true
            };
        case EDIT_FRAME:
            return {
                ...state,
                frame_message: payload
            };
        case EDIT_FRAME_ENDED:
            return {
                ...state,
                edit_frame_loading: false
            };

        default:
            return state;
    }
};
