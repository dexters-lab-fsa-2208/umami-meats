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

    const { cart } = useSelector((state) => state.cart);
    const { cart: usersCart, cartId } = useSelector((state) => state.usersCart);
    console.log(usersCart);

    // const [total, setTotal] = useState(0)

	return (
    <CheckoutContainer>
        <h2>Checkout</h2>
        <br></br>
        <ProductsContainer>
            {(usersCart ? usersCart : cart).map(product => (
                <>
                <Product>
                <p>{product.product.name} ({product.qty})</p>
                <p>{Math.round((product.product.price * product.qty + Number.EPSILON) * 100) / 100}</p>
                {/* {setTotal(total + (product.price * product.quantity))} */}
                </Product>
                <br></br>
                </>
            ))}
        </ProductsContainer>
        <TotalContainer>
            <h2>Total:</h2>
            <Total>{Math.round(((usersCart ? usersCart : cart).reduce((prev, curr) => (curr.product.price * curr.qty) + prev,0) + Number.EPSILON) * 100) / 100}</Total>
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
