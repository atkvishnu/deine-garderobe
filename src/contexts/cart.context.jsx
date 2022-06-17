import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    // if found increment quantity
    if (existingCartItem) {
        return cartItems.map(item => {
            if (item.id === existingCartItem.id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item;
            // (item.id === existingCartItem.id) ? { ...item, quantity: item.quantity + 1 } : item;
        })
    } else {
        // else return new array with modified cartItems/ new cart item
        return [...cartItems, { ...productToAdd, quantity: 1 }]
    }

}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
})

/*
product {
    id, name, price, imageUrl
}

Cart Item {
    id, name, price, imageUrl, quantity
}
*/


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    // we are recounting the cartCount every time the cartItems change for this we use useEffect

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }


    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}