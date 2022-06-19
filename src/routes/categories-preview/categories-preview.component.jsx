import './categories-preview.styles.scss';

import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const product = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={product} />
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;