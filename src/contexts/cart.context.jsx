import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    // if found increment quantity
    if (existingCartItem) {
        return cartItems.map(cartItem => {
            if (cartItem.id === existingCartItem.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            }
            return cartItem;
            // (item.id === existingCartItem.id) ? { ...item, quantity: item.quantity + 1 } : item;
        })
    } else {
        // else return new array with modified cartItems/ new cart item
        return [...cartItems, { ...productToAdd, quantity: 1 }]
    }

}


const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cartItem to remove from array
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

    // check if quantity is 1, if it is then remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== cartItemToRemove.id);   // if (item.id !== cartItemToRemove.id) evaluates true then keep the value, else remove it
    } else {
        // return back cartItems with matching cartItem with reduced quantity
        return cartItems.map(cartItem => {
            if (cartItem.id === cartItemToRemove.id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 }
            }
            return cartItem;
            // (item.id === existingCartItem.id) ? { ...item, quantity: item.quantity + 1 } : item;
        })
    }
}


const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(item => item.id !== cartItemToClear.id); // if (item.id !== cartItemToClear.id) evaluates true then keep the value, else remove it




export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    total: 0
})

/*
product {
    id, name, price, imageUrl
}

cartItems {
    id, name, price, imageUrl, quantity
}
*/

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    // we are recounting the cartCount every time the cartItems change for this we use useEffect

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}