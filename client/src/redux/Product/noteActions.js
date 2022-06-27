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

import axios from 'axios';

export const listNotes = () => async (dispatch, getState) => {

    try{

        dispatch({type: NOTE_LIST_REQUEST});

        const { userLogin: {userInfo} } = getState();

        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.user.token}`
            }
        }

        const {data} = await axios.get('/api/notes', config);

        dispatch({type: NOTE_LIST_SUCCESS, payload: data});

    }
    catch(err){

        dispatch({
            type: NOTE_LIST_FAILURE, 
            payload: 
            err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        });

    }
}

export const createNoteAction = (title, content ,category ) => async (dispatch, getState) => {
            
    try{
    
        dispatch({type: NOTE_CREATE_REQUEST});
    
        const { userLogin: {userInfo} } = getState();
    
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.user.token}`,
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.post(
            '/api/notes/create', 
            {title,content,category}, 
            config
        );

        dispatch({type: NOTE_CREATE_SUCCESS, payload: data});

    } catch(err){
        dispatch({
            type: NOTE_CREATE_FAILURE, 
            payload: 
            err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        });
    }
}

export const updateNoteAction = (id, title, content ,category ) => async (dispatch, getState) => {
            
    try{
    
        dispatch({type: NOTE_UPDATE_REQUEST});
    
        const { userLogin: {userInfo} } = getState();
    
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.user.token}`,
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.put(
            `/api/notes/${id}`, 
            {title,content,category}, 
            config
        );

        dispatch({type: NOTE_UPDATE_SUCCESS, payload: data});

    } catch(err){
        dispatch({
            type: NOTE_UPDATE_FAILURE, 
            payload: 
            err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        });
    }
}

export const deleteNoteAction = (id) => async (dispatch, getState) => {
            
    try{
    
        dispatch({type: NOTE_DELETE_REQUEST});
    
        const { userLogin: {userInfo} } = getState();

        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.user.token}`,
            }
        };

        console.log(config);

        const {data} = await axios.delete(
            `/api/notes/${id}`, 
            config
        );

        dispatch({type: NOTE_DELETE_SUCCESS, payload: data});

    } catch(err){
        dispatch({
            type: NOTE_DELETE_FAILURE, 
            payload: 
            err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        });
    }
}


