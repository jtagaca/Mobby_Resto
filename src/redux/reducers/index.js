import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import RestaurantReducer from "./RestaurantReducer";
import RestaurantDetailsReducer from "./RestaurantDetailsReducer";
import ThemeReducer from "./ThemeReducer";

export default combineReducers({
    restaurant: RestaurantReducer,
    auth: AuthReducer,
    restaurantDetails: RestaurantDetailsReducer,
    theme: ThemeReducer,
})