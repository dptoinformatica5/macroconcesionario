const initialState = { rememberMessage: '' };
const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case 'REMEMBER_MESSAGE': return {...payload};        
    }
  
    return state;
  }
  
  export default reducer;