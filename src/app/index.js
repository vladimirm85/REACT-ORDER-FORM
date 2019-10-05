import React from 'react';
import { Spinner } from 'react-bootstrap';
import routesList from '~/routes'
import withStore from '~/hocs/withStore.js';
import styles from './app.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { RoutesMap } from '~/routes';

class App extends React.Component {

    componentDidMount() {
        this.props.store.cart.getData();
    };

    render() {

        const Cart = this.props.store.cart;
        const App = this.props.store.app;

        const routesComponent = routesList.map((route) => {
            return <Route
                path={route.url}
                component={route.component}
                exact={route.exact}
                key={route.url}
            />
        });
        
        return (
            <Router>
                <header>
                    <div className="container">
                        <hr/>
                        <div className="row justify-content-between">
                            <div className="col col-4">
                                <div className="alert alert-success">Site name</div>
                            </div>
                            <div className="col col-3">
                                {(App.getServerResponseStatus === 'pending')
                                ?<Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                :<strong>
                                    In Cart: {Cart.cartsProductsCnt}
                                    <br/>
                                    Total: {Cart.totalPrice}
                                </strong>}
                            </div>
                        </div>
                        <hr/>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col col-3">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <NavLink to={RoutesMap.home} exact activeClassName={styles.active}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="list-group-item">
                                    <NavLink to={RoutesMap.cart} activeClassName={styles.active}>
                                        Cart
                                    </NavLink>
                                </li>
                                <li className="list-group-item">
                                    <NavLink to={RoutesMap.checkout} activeClassName={styles.active}>
                                        Order
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col col-9">
                            {(App.getServerResponseStatus === 'pending')
                            ?<Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            :<Switch>                                
                                {routesComponent}
                            </Switch>
                            }
                        </div>
                    </div>
                </div>
            </Router>
        );
    }    
};

export default withStore(App);