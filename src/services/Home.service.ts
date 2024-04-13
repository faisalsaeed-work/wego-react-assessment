import { useCallback, useEffect, useMemo, useState } from "react";
import HttpClient from "./HttpClient.service"; // Importing HTTP client service
import { useDispatch } from "react-redux"; // Importing useDispatch hook from Redux
import { hideLoader, showLoader } from "../store/LoaderSlice"; // Importing loader actions from Redux store

// Environment variables for API URLs
const ALL_CATEGORIES_API_URL = process.env.REACT_APP_CATEGORIES_API_URL || "";
const ALL_RESTAURANT_FOODS_API_URL = process.env.REACT_APP_RESTAURANT_FOODS_API_URL || "";

// Interface representing a restaurant category
export interface categoryInterface {
    id: string;
    name: string;
}

// Interface representing a restaurant food item
export interface ResturantFoodInterface {
    id: string;
    index: number;
    rating: number;
    promotion: string;
    isNew: boolean;
    categoryId: string;
    minCookTime: number;
    maxCookTime: number;
    restaurant: string;
    name: string;
    imageUrl: string;
}

// Custom hook to fetch all categories from the server
export const useGetAllCategories = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<categoryInterface[]>([]); // State to hold categories

    useEffect(() => {
        dispatch(showLoader()); // Display loader while fetching data

        // Fetch categories from the server
        HttpClient.get(ALL_CATEGORIES_API_URL)
            .then((data: any) => {
                setCategories(data); // Update categories state with fetched data
            })
            .finally(() => {
                dispatch(hideLoader()); // Hide loader after fetching data
            });
    }, []);

    return { categories }; // Return categories to the component
};

// Custom hook to manage filters for restaurant foods
export const useFilters = () => {
    const [filters, setFilters] = useState({ categoryId: "", searchKeywords: "" }); // State to hold filters

    // Function to handle category selection
    const handleSelectCategory = useCallback((id: string) => {
        setFilters({ searchKeywords: "", categoryId: id }); // Update categoryId filter
    }, []);

    // Function to handle search keyword input
    const handleSearchKeyword = useCallback(
        (keyword: string) => {
            setFilters({ ...filters, searchKeywords: keyword }); // Update searchKeywords filter
        },
        [filters.categoryId]
    );

    return { filters, handleSelectCategory, handleSearchKeyword }; // Return filters and functions to the component
};

// Custom hook to fetch and filter restaurant foods
export const useRestaurantFoods = (filters: any) => {
    const dispatch = useDispatch();
    const [allFoods, setAllFoods] = useState<ResturantFoodInterface[]>([]); // State to hold all restaurant foods
    const [pagination, setPagination] = useState({ pageNo: 1, recordsPerPage: 9, totalCount: allFoods.length, isNextPage: true }); // State to manage pagination

    useEffect(() => {
        dispatch(showLoader()); // Display loader while fetching data

        // Fetch all restaurant foods from the server
        HttpClient.get(ALL_RESTAURANT_FOODS_API_URL)
            .then((data: any) => {
                setAllFoods(data.foods); // Update allFoods state with fetched data
            })
            .finally(() => {
                dispatch(hideLoader()); // Hide loader after fetching data
            });
    }, []);

    useEffect(() => {
        setPagination({ pageNo: 1, recordsPerPage: 9, totalCount: allFoods.length, isNextPage: true }); // Reset pagination when filters change
    }, [filters.categoryId]);

    // Memoized calculation of filtered restaurant foods
    const filteredFoods = useMemo(() => {
        setPagination((prevSt) => ({ ...prevSt, isNextPage: true })); // Reset pagination
        return allFoods.filter(
            (food) => 
                (filters.categoryId === "" || food.categoryId === filters.categoryId) && 
                (filters.searchKeywords === "" || food.name.toLocaleLowerCase().includes(filters.searchKeywords.toLocaleLowerCase()))
        ); // Filter foods based on category and search keywords
    }, [filters, allFoods]);

    // Function to load more restaurant foods
    const onClickShowMore = useCallback(() => {
        setPagination({ ...pagination, pageNo: pagination.pageNo + 1, totalCount: filteredFoods.length, isNextPage: pagination.recordsPerPage * pagination.pageNo + 1 < filteredFoods.length });
    }, [pagination, filteredFoods]);

    return { restaurantFoods: filteredFoods.slice(0, pagination.pageNo * pagination.recordsPerPage), onClickShowMore, isNextPage: pagination.isNextPage }; // Return filtered restaurant foods and pagination info to the component
};
