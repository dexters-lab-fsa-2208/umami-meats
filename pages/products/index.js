import React from 'react';
import styled from 'styled-components';
import { FaPhone, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import {
	useGetProductsQuery,
	useCreateOrderMutation,
} from '../../src/redux/reducers/apiSlice';
import Link from 'next/link';

const tags = [
	{ name: 'tuna' },
	{ name: 'beef' },
	{ name: 'japanese' },
	{ name: 'american' },
];
const BodyContainer = styled.div`
	display: flex;
`;
// const Filter = styled.div`
//   width: 15%;
// `;

const TagContainer = styled.div`
	// width: 100%;
	// width 200px;
	display: flex;
	flex-direction: column;
`;
const TagName = styled.p`
	width: 100%;
`;

const ProductsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	// margin-left: 15%;
`;

const ProductTitle = styled.h2`
	flex: 2 2 200%;
	text-align: center;
`;

const Product = styled.div`
	width: 150px;
	height: 200px;
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	button {
	}
`;
const ProductImage = styled.img`
	width: 150px;
	height: 150px;
`;
const ProductName = styled.p`
	text-align: center;
	font-size: 12px;
	span {
		color: red;
	}
`;

export default function Index() {
	const { data: products, isLoading } = useGetProductsQuery();

	const addToCart = (productId) => {
		useCreateOrderMutation({
			userId: userId,
			productId: productId,
			qty: qty,
		});
	};

	return (
		<BodyContainer>
			<TagContainer>
				{tags.map((tag) => (
					<TagName>
						{tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
					</TagName>
				))}
			</TagContainer>
			<ProductsContainer>
				<ProductTitle>Our Products</ProductTitle>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					products.map((product) => (
						<Link
							href={`api/${
								product.type === 'steak'
									? product.type + 's'
									: product.type
							}/${product.id}`}
						>
							<Product>
								<ProductImage src={product.img} />
								<ProductName>
									{product.name}{' '}
									<span>{product.price + '/lb'}</span>
								</ProductName>
								<button
									onClick={() => addToCart(product.id, qty)}
								>
									Add To Cart
								</button>
							</Product>
						</Link>
					))
				)}
			</ProductsContainer>
		</BodyContainer>
	);
}
