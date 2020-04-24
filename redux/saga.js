// import { delay } from "redux-saga";
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';


function* fetchUser(action) {
    try {
        // const user = yield call(Api.fetchUser, action.payload.userId);
        yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}


function* onFetchItem() {
    // yield delay(4000);
    console.log("Inside sAga")
    // yield put({ type: "DELETE_ITEM_SUCCESS", value: 1 });
    let res = localStorage.getItem("parentReleaseData")
    yield put({ type: "FETCH_ITEM_SUCCESS", result: res });
}

// export function* watchAgeUp() {
//     yield takeLatest("AGE_UP", ageUpAsync);
// }


export default function* rootSaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
    yield takeEvery("FETCH_ITEM", onFetchItem);
}