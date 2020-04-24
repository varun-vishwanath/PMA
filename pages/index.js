import Link from 'next/link';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import ReleaseList from "../containers/parentReleaseList";
import React from "react";
import ReactDOM from "react-dom";
import reducer from "../redux/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux/saga";


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid red'
}

export default function Page() {
    return (
        <Provider store={store}>
            <Header />
            <Layout >
                <ReleaseList />
            </Layout>
        </Provider>
    )
}

