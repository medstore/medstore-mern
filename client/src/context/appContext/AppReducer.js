const AppReducer = (state, actions) => {
    switch (actions.type) {
        case "FETCH_START":
            return {
                authenticated: false,
                user: null,
                isFetching: true,
                error: false
            };
        case "FETCH_SUCCESS":
            return {
                authenticated: true,
                user: actions.payload,
                isFetching: false,
                error: false
            };
        case "FETCH_FAILED":
            return {
                authenticated: false,
                user: null,
                isFetching: false,
                error: actions.payload
            };
        case "LOGOUT":
            return {
                authenticated: false,
                user: null,
                isFetching: false,
                error: false
            };
        default:
            return state;
    }
}
export default AppReducer;