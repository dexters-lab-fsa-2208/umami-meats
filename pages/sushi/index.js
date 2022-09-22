import React from 'react';
import Products from '../../src/components/Products';
import { useGetSushiQuery } from '../../src/redux/reducers/apiSlice';

const Index = () => {
	const { data: products, isLoading } = useGetSushiQuery();
	return (<Products products={products} isLoading={isLoading} />);
};

export default Index;
