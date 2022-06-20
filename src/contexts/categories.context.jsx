import { useState, createContext, useEffect } from "react";

import SHOP_DATA from '../shop-data.js';

// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// as the actual value that you want to access
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    // used once for creating collection in firebase. DO NOT USE again.
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            setCategoriesMap(categoryMap);
            // console.log(categoryMap);
        };
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}