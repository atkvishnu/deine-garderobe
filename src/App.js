import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './routes/sign-in/sign-in.component';

const Shop = () => {
    return (
        <h1>Shop</h1>
    )
}


const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path="*" element={
                    <main style={{ textAlign: "center", margin: "35vh" }}>
                        <h1>There's nothing here!</h1>
                    </main>
                }
                />
            </Route>
        </Routes >
    )

}

export default App;
