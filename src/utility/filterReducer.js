const initialState = {
  kind: null,
  age: null,
  bodytype: null,
  colour: null,
  sex: null,
  shelter_pkid: null,
  variety: null
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_AGE":
      return { ...state, age: action.payload };
    case "SET_BODY_TYPE":
      return { ...state, bodytype: action.payload };
    case "SET_COLOUR":
      return { ...state, colour: action.payload };
    case "SET_SEX":
      return { ...state, sex: action.payload };
    case "SET_SHELTER":
      return { ...state, shelters: action.payload };
    case "SET_KIND":
      return { ...state, kind: action.payload };
    case "SET_VARIETY":
      return { ...state, varieties: action.payload };
    default:
      return state;
  } 
}

export { initialState, filterReducer };