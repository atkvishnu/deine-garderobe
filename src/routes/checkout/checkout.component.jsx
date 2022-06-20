// need access to cartItems and cartCount contexts

import { useContext } from "react";

import { CheckoutContainer, CheckoutHeader, HeaderBlock, TotalContainer } from './checkout.styles.jsx';

import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);


    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>

                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>

                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>

                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map(cartItem => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    );
                })
            }
            <TotalContainer>Total: ${cartTotal}</TotalContainer>
        </CheckoutContainer>
    )
}

export default Checkout;