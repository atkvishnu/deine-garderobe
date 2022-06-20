
import { ItemDetails, CartItemContainer } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span>{name}</span>
                <span>
                    {quantity} x ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;