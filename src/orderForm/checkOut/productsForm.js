import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap'

const submitForm = ({products}) => {
    let totalCount = 0;

    let productsRows = products.map((product) => {
        totalCount += product.quantity*product.price;
        return (
            <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.price * product.quantity}</td>
            </tr>
        );
    });
    return (
        <div>
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Count</td>
                    <td>Total</td>
                </tr>
                {productsRows}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>{totalCount}</strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

submitForm.propTypes = {
    products: PropTypes.array.isRequired
}

export default submitForm;