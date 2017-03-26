import {
    POST, POST_SUCCESS, POST_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* POST */
export function postRequest(title, content) {
    return (dispatch) => {
        dispatch(post());

        return axios.post('/api/post', {title, content})
            .then((res) => {
                dispatch(postSuccess());
            })
            .catch( (err) => {
                dispatch(postFailure(err.response.data.error));
            });
    };
}

export function post() {
    return {
        type: POST
    };
}

export function postSuccess() {
    return {
        type: POST_SUCCESS
    };
}

export function postFailure(error) {
    return {
        type: POST_FAILURE,
        error
    };
}
