import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as PlusLogo } from '../../assets/plus.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';


const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    // console.log(currentUser);

    // const signOutHandler = async () => {
    //     const res = await signOutUser();
    //     // console.log(res);
    //     setCurrentUser(null);
    // }


    return (
        <Fragment>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <PlusLogo />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>
                                {' '}
                                SIGN OUT{' '}
                            </span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;