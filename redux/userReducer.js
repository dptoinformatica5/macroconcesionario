const reducer = (state = {}, { type, payload }) => {
    switch(type) {
        case 'LOGIN': return {...payload, date: Date.now()};
        case 'LOGOUT': return {};
        case 'REFRESH_TOKEN': return {...state, ...payload}
        case 'GOOGLE_REGISTER': return {...state, ...payload, googleRegister: true}
    }
    return state;
}

export default reducer;