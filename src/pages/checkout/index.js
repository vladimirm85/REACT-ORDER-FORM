import React from 'react';
import styles from './index.module.css';
import LoaderComponent from '~c/loaderComponent.js';
import ProductsTable from '~c/productsTable.js';
import СheckoutForm from '~f/checkoutForm.js';
import { Button, Modal } from 'react-bootstrap';
import withStore from '~/hocs/withStore.js'
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes';
const {Header, Title, Body, Footer} = Modal;

class Checkout extends React.Component {
        
    state = {
        showModalSubmit: false
    };   

    showModal = () => {  
        this.setState({showModalSubmit: true})
    };

    hideModal = () => {      
        this.setState({showModalSubmit: false});        
    };

    placeOrder = () => {
        this.setState({showModalSubmit: false});
        this.props.store.serverResponse.setServerResponseStatus('pending');
        this.props.store.checkout.placeOrder().then( response => {
            this.props.history.push(RoutesMap.result);
            this.props.store.serverResponse.setServerResponseError(false);
        }).catch(text => {
            this.props.store.notifications.addNotification('placeOrder');
            this.props.store.serverResponse.setServerResponseError(true);
        }).finally(() => {
            this.props.store.serverResponse.setServerResponseStatus('fulfilled');
    });
    };

    render () {

        const { checkout: Customer, serverResponse: ServerResponseStore } = this.props.store;

        return (
            <div>
                {(ServerResponseStore.getServerResponseStatus === 'pending')
                ?<LoaderComponent/>
                :<div>
                    <Link to={RoutesMap.home} className="btn btn-secondary">Back to Cart</Link>
                    <h1 className={styles.h1}>Tell us about you</h1>
                    <СheckoutForm
                        showModal={this.showModal}
                    />

                    <Modal show={this.state.showModalSubmit} onHide={this.hideModal} backdrop='static'>
                        <Header closeButton>
                            <Title>Verify you order</Title>
                        </Header>
                        <Body>
                            <ProductsTable
                                cartsProducts={this.props.store.cart.cartsProducts}
                                totalPrice={this.props.store.cart.totalPrice}
                            />
                            <strong>Delivery address: </strong>{Customer.getCustomerData.address}
                        </Body>
                        <Footer>
                            <Button variant="primary" onClick={this.placeOrder}>
                                Place your order
                            </Button>
                            <Button variant="secondary" onClick={this.hideModal}>
                                Close
                            </Button>
                        </Footer>
                    </Modal>
                </div>}
            </div>
        )
    }
}

export default withStore(Checkout);