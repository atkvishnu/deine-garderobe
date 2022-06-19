import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';

import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';

import Authentication from './routes/authentication/authentication.component.jsx';

import Checkout from './routes/checkout/checkout.component';


const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop/*' element={<Shop />} />
                <Route path='auth' element={<Authentication />} />
                <Route path="*" element={
                    <main style={{ textAlign: "center", margin: "35vh" }}>
                        <h1>There's nothing here!</h1>
                    </main>
                }
                />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes >
    )

}

export default App;
