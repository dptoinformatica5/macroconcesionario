const initialState = {
  vehicle_name: '',
  img: '',
  autonomia: '',
  potencia_velocidad: '',
  precio: 0,
  plazo: 12,
};

const reducer = (state = initialState, { type, payload }) => {
    let newSelectedVehicle = {};
    switch(type) {
        case 'SET_SELECTED_VEHICLE':
            newSelectedVehicle = {...state, ...payload};
            //localStorage.setItem('vehicle', JSON.stringify(newSelectedVehicle));
            return newSelectedVehicle;

        case 'RESET_SELECTED_VEHICLE':
            localStorage.removeItem('vehicle');
            return initialState;

        case 'SET_PRICE_PLAZO_IMAGE_FORMATTED':
          const {precioFormatted, plazoFormatted, imageFormatted, precio, plazo} = payload;
          newSelectedVehicle = {
            ...state,
              precio,
              plazo,
              precioFormatted,
              plazoFormatted,
              imageFormatted
          };
          //localStorage.setItem('vehicle', JSON.stringify(newSelectedVehicle));
          return newSelectedVehicle;
    }

    return state;
}

export default reducer;