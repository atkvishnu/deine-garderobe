import { useContext } from 'react';
import './checkout-item.styles.scss';

import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { id, name, imageUrl, quantity, price } = cartItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const handleDecrement = () => removeItemFromCart(cartItem);
    const handleIncrement = () => addItemToCart(cartItem);

    return (
        <div className='checkout-item-container' key={id}>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={handleDecrement}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={handleIncrement}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;