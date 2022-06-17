import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './cart-dropdown.styles.scss';

import { CartContext } from '../../contexts/cart.context';

import Button from '../../components/button/button.component';
import CartItem from '../cart-item/cart-item.components';


const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToChecoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
                }
            </div>

            <Button onClick={goToChecoutHandler}>GO TO CHECKOUT</Button>

        </div>
    )
}

export default CartDropdown