import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as PlusLogo } from '../../assets/plus.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";


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
            <NavigationContainer>
                <LogoContainer to="/" >
                    <PlusLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink as='span'>
                        {
                            (currentUser) ?
                                (`HELLO, ${currentUser.displayName.toUpperCase() || currentUser.email}`)
                                : (null)
                        }
                    </NavLink>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>
                                {' '}
                                SIGN OUT{' '}
                            </NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;