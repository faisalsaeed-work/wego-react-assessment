import React, { FC } from 'react';
import '../styles/restaurant-style.css'
import Categories from '../components/Categories';
import Restaurants from '../components/Restaurants';
import { useFilters, useRestaurantFoods } from '../services/Home.service';
const Home: FC = () => {
    const { filters, handleSelectCategory, handleSearchKeyword } = useFilters();
    const { restaurantFoods, onClickShowMore, isNextPage } = useRestaurantFoods(filters);
    return <>
        <div className="search">
            <i className="fas fa-search" />
            <input type="text" placeholder="Enter restaurant name..." value={filters.searchKeywords} onChange={({ target }) => handleSearchKeyword(target.value)} />
        </div>

        <Categories handleSelect={handleSelectCategory} selectedCategoryId={filters.categoryId} />
        <div className="container">
            {
                restaurantFoods.map((food) => <Restaurants key={food.id} foodDetails={food} />)
            }
        </div>
        {isNextPage && restaurantFoods.length > 0 && <div className='show-more-btn container'>
            <span onClick={onClickShowMore}>+ Show More</span>
        </div>}
    </>

}

export default React.memo(Home)