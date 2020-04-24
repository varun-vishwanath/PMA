
const initialState = {
    dataFromLS: [],
};
const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case "FETCH_ITEM_SUCCESS":
            console.log("Inside reducer", action.result)
            newState.dataFromLS = (action.result && JSON.parse(action.result).length > 0) ? JSON.parse(action.result) : []
            break;
    }
    return newState;
};

export default reducer;