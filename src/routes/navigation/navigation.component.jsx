import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as PlusLogo } from '../../assets/plus.svg';

import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    // console.log(currentUser);

    const signOutHandler = async () => {
        const res = await signOutUser();
        // console.log(res);
        setCurrentUser(null);
    }


    return (
        <Fragment>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <PlusLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }

                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;