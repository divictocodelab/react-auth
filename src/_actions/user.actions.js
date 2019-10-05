import { userConstants } from '../_constants';
import { userService } from '../_services';
import { history } from '../_helpers';

export const userActions = {
    login,
    getAll,
    addUser
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password).then(
            user => {
                dispatch(success(user));
                history.push('/users');
            },
            error => {
                dispatch(failure(error));
            }
        );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function addUser(formData) {
    return dispatch => {
        userService.addUser(formData)
            .then(
                user => {dispatch(success(user))
                    history.push('/users');  
                },
                error => dispatch(failure(error))
            );
    }

    function success(user) { return { type: userConstants.ADD_USER, user } }
    function failure(error) { return { type: userConstants.ADD_USER_FAILURE, error } }
}
