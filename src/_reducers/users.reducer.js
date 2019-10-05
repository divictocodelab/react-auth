import { userConstants } from '../_constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userConstants.ADD_USER:
            return {
                user: action.user
            };
        case userConstants.ADD_USER_FAILURE: 
            return {
                error: action.error
            };
        default: 
            return state
    }
}