import React from 'react'
import PropTypes from 'prop-types';
import ProductsForm from '~/checkout/productsForm.js'
import styles from './index.module.css'
import { Button, Modal, Form } from 'react-bootstrap'

export default class CustomerData extends React.Component {
        
    state = {
        showModalError: false,
        showModalSubmit: false
    };

    static defaultProps = {
        moveToCart: function(){},
        moveToResult: function(){},
        changeCustData: function(){}
    }

    static propTypes = {
        customerData: PropTypes.object.isRequired,
        changeCustData: PropTypes.func,
        products: PropTypes.array.isRequired,
        moveToCart: PropTypes.func,
        moveToResult: PropTypes.func
    }

    showModalHandler = () => {
        if (this.props.customerData.customerName == 'Enter your name' ||
            this.props.customerData.customerMail == 'Enter your e-mail' ||
            this.props.customerData.deliveryAddress == 'Enter delivery address') {
                this.setState({showModalError: true})
                return;
        };
        
        if (this.state.showModalSubmit) {
            this.setState({showModalSubmit: false});
            return;
        };
        this.setState({showModalSubmit: true})
    }

    showModalError = () => {        
        if (this.state.showModalError) {
            this.setState({showModalError: false});
            return;
        };
        this.setState({showModalError: true})
    }

    render () {
        let formFilds = [];
        
        for (let name in this.props.customerData) {
            let field = this.props.customerData[name];
            formFilds.push(
                <Form.Group key={name} controlId={'checkout-form-' + name}>
                    <Form.Label>{field.lable}</Form.Label>
                    <Form.Control
                        type="text"
                        value={field.value}
                        onChange={(e)=>{this.props.changeCustData(e.target.value, name)}}
                    />
                </Form.Group>
            );
        }

        
        return (
            <div>
                <h1 className={styles.h1}>Tell us about you</h1>
                <Form>
                    {formFilds}
                </Form>
                <Button variant="primary" onClick={this.showModalHandler}>Submit</Button>
                <Button variant="secondary" onClick={() => {this.props.moveToCart()}}>Back to Cart</Button>

                <Modal show={this.state.showModalSubmit} onHide={this.showModalHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Verify you order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductsForm
                            products={this.props.products}
                        />
                        <strong>Delivery address: </strong>{this.props.customerData.deliveryAddress.value}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {this.props.moveToResult()}}>
                            Buy
                        </Button>
                        <Button variant="secondary" onClick={this.showModalHandler}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}