import {
    NOTE_LIST_REQUEST,
    NOTE_LIST_SUCCESS,
    NOTE_LIST_FAILURE,
    NOTE_CREATE_REQUEST,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_FAILURE,
    NOTE_UPDATE_REQUEST,
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_FAILURE,
    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAILURE
} from '../constants/noteConstants';

export const noteListReducer = (state = { notes: []}, action) => {
    switch (action.type) {
        case NOTE_LIST_REQUEST:
            return { loading: true };
        case NOTE_LIST_SUCCESS:
            return { loading: false, notes: action.payload };
        case NOTE_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const noteCreateReducer = (state = { notes: []}, action) => {
    switch (action.type) {
        case NOTE_CREATE_REQUEST:
            return { loading: true };
        case NOTE_CREATE_SUCCESS:
            return { loading: false, success: true };
        case NOTE_CREATE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const noteUpdateReducer = (state = { notes: []}, action) => {
    switch (action.type) {
        case NOTE_UPDATE_REQUEST:
            return { loading: true };
        case NOTE_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case NOTE_UPDATE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const noteDeleteReducer = (state = { notes: []}, action) => {
    switch (action.type) {
        case NOTE_DELETE_REQUEST:
            return { loading: true };
        case NOTE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case NOTE_DELETE_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}