import React from "react";
import Products from "../../src/components/Products";
import { useGetSteaksQuery } from "../../src/redux/reducers/apiSlice";

const Index = () => {
	const { data: products, isLoading, isSuccess } = useGetSteaksQuery();
	return (<Products products={products} isLoading={isLoading} isSuccess={isSuccess}/>);
};

export default Index;
