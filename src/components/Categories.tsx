import React, { FC } from "react";
import { useGetAllCategories } from "../services/Home.service";

interface CategoriesProps {
    handleSelect : (id:string) => void;
    selectedCategoryId: string;
}
const Categories: FC<CategoriesProps> = ({handleSelect, selectedCategoryId}) => {
    const {categories} = useGetAllCategories();

    return <div className="categories">
        <div onClick={() => handleSelect('')} className={`category-item ${selectedCategoryId === '' && 'active'}`}>
            <span>All</span>
        </div>
        {
            categories.map((category) => <div onClick={() => handleSelect(category.id)} key={category.id} 
                className={`category-item ${selectedCategoryId === category.id && 'active'}`}>
                <span>{category.name}</span>
            </div>)
        }

    </div>
}

export default React.memo(Categories)