import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";

const CheckoutContainer = styled.div`
display: flex column;
justify-content: center;
text-align: center;
`;

const ProductsContainer = styled.div`
border-top: 1px solid black;
`;

const Product = styled.div`
border-bottom: 1px solid black;
display: flex;
justify-content: space-between;
padding: 5px 15px 5px 15px;
`;

const TotalContainer = styled.div`
// text-align: center;
`;

const Total = styled.h2`

`;

const ThirdPartyPaymentMethodContainer = styled.div`
display: flex;
justify-content: space-around;
`;

const PaymentMethodContainer = styled.div`

`;

const Checkout = () => {

    const { cart, cartId, usersCart } = useSelector((state) => state.cart);
    console.log(cart);

    // const [total, setTotal] = useState(0)

	return (
    <CheckoutContainer>
        <h2>Checkout</h2>
        <br></br>
        <ProductsContainer>
            {(usersCart && usersCart ? usersCart : cart).map(product => (
                <>
                <Product>
                <p>{product.name} ({product.quantity})</p>
                <p>{Math.round((product.price * product.quantity + Number.EPSILON) * 100) / 100}</p>
                {/* {setTotal(total + (product.price * product.quantity))} */}
                </Product>
                <br></br>
                </>
            ))}
        </ProductsContainer>
        <TotalContainer>
            <h2>Total:</h2>
            <Total>{Math.round(((usersCart && usersCart ? usersCart : cart).reduce((prev, curr) => (curr.price * curr.quantity) + prev,0) + Number.EPSILON) * 100) / 100}</Total>
        </TotalContainer>
        <ThirdPartyPaymentMethodContainer>
            <button>Placeholder</button>
            <button>Placeholder</button>
        </ThirdPartyPaymentMethodContainer>
        <PaymentMethodContainer>
            
        </PaymentMethodContainer>
    </CheckoutContainer>
    );
};

export default Checkout;
