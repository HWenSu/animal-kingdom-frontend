const initialState = {
  selectedSpecie: null, // 品種
  selectedCity: null, // 收容所縣市
  selectedShelter: null, // 收容所
  selectedGender: null, // 動物性別
  selectedAge: null, // 入所年齡
  selectedDistrict: null, // 來源行政區
  selectedFurColor: null, // 毛色（僅限犬）
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_SPECIE":
      return { ...state, selectedSpecie: action.payload };
    case "SET_CITY":
      return { ...state, selectedCity: action.payload };
    case "SET_SHELTER":
      return { ...state, selectedShelter: action.payload };
    case "SET_GENDER":
      return { ...state, selectedGender: action.payload };
    case "SET_AGE":
      return { ...state, selectedAge: action.payload };
    case "SET_DISTRICT":
      return { ...state, selectedDistrict: action.payload };
    case "SET_FUR_COLOR":
      return { ...state, selectedFurColor: action.payload };
    default:
      return state;
  } 
}

export { initialState, filterReducer };