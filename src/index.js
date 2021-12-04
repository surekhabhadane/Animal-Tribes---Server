import React, { useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import client from './common/client';


// ** Import custom components for redux**
import { Provider } from 'react-redux';
import store from './store/index';
import App from "./components/app";

// Route components
import { ProductList } from "./pages";

//config data
import configDB from './data/customizer/config';

import './index.scss';


function Root() {
    const abortController = new AbortController();
    useEffect(() => {
        const layout = localStorage.getItem('layout_version') || configDB.data.color.layout_version
        document.body.classList.add(layout);

        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;

        return function cleanup() {
            abortController.abort();
        }
    }, [abortController]);

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={`/`}>
                    <ScrollContext>
                        <Switch>
                            <Fragment>
                                 <ApolloProvider client={client}>
                                    <App>
                                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={ProductList} />
                                    </App>
                                    </ApolloProvider>
                            </Fragment>
                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();