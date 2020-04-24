// exporting default actions;

const actions = {
    FETCH_ITEM: "FETCH_ITEM",
    FETCH_ITEM_SUCCESS: "FETCH_ITEM_SUCCESS",


    onFetchItem: () => ({
        type: actions.FETCH_ITEM,
        value: 1
    }),

    onFetchItemSuccess: (result) => ({
        type: actions.FETCH_ITEM_SUCCESS,
        result
    })

}


export default actions;