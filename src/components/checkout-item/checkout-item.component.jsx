import { useContext } from 'react';
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles.jsx';

import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { id, name, imageUrl, quantity, price } = cartItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const handleDecrement = () => removeItemFromCart(cartItem);
    const handleIncrement = () => addItemToCart(cartItem);

    return (
        <CheckoutItemContainer key={id}>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={handleDecrement}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={handleIncrement}>&#10095;</Arrow>
            </Quantity>
            <Value>{price}</Value>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;