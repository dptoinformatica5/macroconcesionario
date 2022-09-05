export const setSelectedVehicle = payload => {
    return { type: "SET_SELECTED_VEHICLE", payload }
};

export const setFormattedPricePlazoImage = payload => {
    return { type: "SET_PRICE_PLAZO_IMAGE_FORMATTED", payload }
};

export const resetSelectedVehicle = payload => {
    return { type: "RESET_SELECTED_VEHICLE", payload }
};

export const login = payload => {
    return { type: "LOGIN", payload }
};

export const tokenRefresh = payload => {
    return { type: "REFRESH_TOKEN", payload }
};

export const logout = payload => {
    return { type: "LOGOUT", payload }
};

export const googleRegister = payload => {
    return { type: "GOOGLE_REGISTER", payload }
};

export const remember_message = payload => {
    return { type: "REMEMBER_MESSAGE", payload: { rememberMessage: payload } }
};