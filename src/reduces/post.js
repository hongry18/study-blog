import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    }
}

export default function post(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.POST:
            return update(state, {
                post: {
                    status: { $set: 'WATTING' },
                    error: { $set: -1 }
                }
            });
        case types.POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.POST_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}
