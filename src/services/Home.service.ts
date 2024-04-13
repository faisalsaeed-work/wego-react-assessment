import { useCallback, useEffect, useMemo, useState } from "react";
import HttpClient from "./HttpClient.service";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../store/LoaderSlice";

const ALL_CATEGORIES_API_URL = process.env.REACT_APP_CATEGORIES_API_URL || "";
const ALL_RESTAURANT_FOODS_API_URL = process.env.REACT_APP_RESTAURANT_FOODS_API_URL || "";

export interface categoryInterface {
	id: string;
	name: string;
}

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

export const useGetAllCategories = () => {
	const dispatch = useDispatch();
	const [categories, setCategories] = useState<categoryInterface[]>([]);
	useEffect(() => {
		dispatch(showLoader());
		HttpClient.get(ALL_CATEGORIES_API_URL)
			.then((data: any) => {
				setCategories(data);
			})
			.finally(() => {
				dispatch(hideLoader());
			});
	}, []);
	return { categories };
};

export const getAllRestaurantFoods = (successCallback: any) => {
	HttpClient.get(ALL_RESTAURANT_FOODS_API_URL).then((data: any) => {
		successCallback(data.foods);
	});
};

export const useFilters = () => {
	const [filters, setFilters] = useState({ categoryId: "", searchKeywords: "" });
	const handleSelectCategory = useCallback((id: string) => {
		setFilters({ searchKeywords: "", categoryId: id });
	}, []);
	const handleSearchKeyword = useCallback(
		(keyword: string) => {
			setFilters({ ...filters, searchKeywords: keyword });
		},
		[filters.categoryId]
	);
	return { filters, handleSelectCategory, handleSearchKeyword };
};

export const useRestaurantFoods = (filters: any) => {
	const dispatch = useDispatch();
	const [allFoods, setAllFoods] = useState<ResturantFoodInterface[]>([]);
	const [pagination, setPagination] = useState({ pageNo: 1, recordsPerPage: 9, totalCount: allFoods.length, isNextPage: true });
	useEffect(() => {
		dispatch(showLoader());
		HttpClient.get(ALL_RESTAURANT_FOODS_API_URL)
			.then((data: any) => {
				setAllFoods(data.foods);
			})
			.finally(() => {
				dispatch(hideLoader());
			});
	}, []);
	useEffect(() => {
		setPagination({ pageNo: 1, recordsPerPage: 9, totalCount: allFoods.length, isNextPage: true });
	}, [filters.categoryId]);
	const filteredFoods = useMemo(() => {
		setPagination((prevSt) => ({ ...prevSt, isNextPage: true }));
		return allFoods.filter(
			(food) => (filters.categoryId == "" || food.categoryId == filters.categoryId) && (filters.searchKeywords == "" || food.name.toLocaleLowerCase().includes(filters.searchKeywords.toLocaleLowerCase()))
		);
	}, [filters, allFoods]);
	const onClickShowMore = useCallback(() => {
		setPagination({ ...pagination, pageNo: pagination.pageNo + 1, totalCount: filteredFoods.length, isNextPage: pagination.recordsPerPage * pagination.pageNo + 1 < filteredFoods.length });
	}, [pagination, filteredFoods]);
	return { restaurantFoods: filteredFoods.slice(0, pagination.pageNo * pagination.recordsPerPage), onClickShowMore, isNextPage: pagination.isNextPage };
};
