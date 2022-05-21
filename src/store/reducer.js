const initialState = {
    user: {},
    view: 'Profile',
    error: '',
    middle: { isActive: false },
  };

  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_VIEW':
        return {
          ...state,
          view: action.payload,
        };
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      case 'SET_GLOBAL_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'EMPTY_USER':
        return {
          ...state,
          user: {},
        };
      case 'ACTIVATE_MIDDLE':
        return {
          ...state,
          middle: { ...action.payload, isActive: true },
        };
      case 'DEACTIVATE_MIDDLE':
        return {
          ...state,
          middle: { isActive: false },
        };
      default:
        return state;
    }
  }
  
  export default reducer;