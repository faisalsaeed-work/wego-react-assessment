import React, { FC } from "react"
import { ResturantFoodInterface } from "../services/Home.service";

interface RestaurantsProps {
    foodDetails: ResturantFoodInterface
}
interface FoodPromotionBadgeProps {
    promotion: string|null
}
const Restaurants:FC<RestaurantsProps> = ({foodDetails}) => {
    return <div className="restaurant">
        <div>
            <img src={foodDetails.imageUrl} alt={foodDetails.name} />
            <FoodPromotionBadge promotion={foodDetails.promotion}/>
        </div>
        <div className="restaurant-name">{foodDetails.name}</div>
        <div className="restaurant-info">
            <span className="star-rating">★ {Number(foodDetails.rating).toFixed(1)}</span>
            <span className="delivery-time">{foodDetails.minCookTime}-{foodDetails.maxCookTime} min</span>
            {foodDetails.isNew && <span className="new">New</span>}
        </div>
    </div>
}

const FoodPromotionBadge:FC<FoodPromotionBadgeProps> = ({promotion}) => {
    return promotion == 'gift' ? 
    <span className="badge badge-gift"><i className="fa-solid fa-gift" /></span>
    : promotion == '1+1' ? 
    <span className="badge badge-by-get-one">1+1</span>
    : promotion == 'discount' ? 
    <span className="badge badge-percentage">%</span>
    : <></>
}

export default Restaurants;