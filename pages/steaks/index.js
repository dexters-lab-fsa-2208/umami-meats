import React from 'react';
import Products from '../../src/components/Products';
import { useGetSteaksQuery } from '../../src/redux/reducers/apiSlice';

const Index = () => {
	const { data: products, isLoading } = useGetSteaksQuery();
	return (<Products products={products} isLoading={isLoading} />);
};

export default Index;
