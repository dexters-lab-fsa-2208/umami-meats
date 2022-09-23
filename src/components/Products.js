import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaPhone, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import {
	useGetProductsQuery,
	useCreateOrderMutation,
	useCreateLineItemMutation,
	useGetTagsQuery
} from '../../src/redux/reducers/apiSlice';
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cart-slice";


// const tags = [
// 	{ tagName: 'tuna' },
// 	{ tagName: 'beef' },
// 	{ tagName: 'japanese' },
// 	{ tagName: 'american' },
//     { tagName: 'sushi' }
// ];
const BodyContainer = styled.div`
	display: flex;
`;

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


export default function Products({products, isLoading}) {
	// const { data: products, isLoading } = useGetProductsQuery();
	  
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filtered, setFiltered] = useState(false);
    
    const [user, setUser] = useState("");

	  const {data: tags, isSuccess} = useGetTagsQuery()
    const dispatch = useDispatch();

  useEffect(() => {
    setFilteredProducts(products);
    if (typeof window !== "undefined") {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    } else {
    }
  }, [products]);

    const tagFilter = (tag) => {
        console.log(tag);
        setFiltered(true);
        setFilteredProducts(products?.filter(product => product.tagName === tag));
        console.log(filteredProducts);
    }


	return (
		<BodyContainer>
			<TagContainer>
				{(products && products.length && isSuccess) && tags.filter(tag => tag.tagType === products[0].type).map((tag) => (
					<TagName onClick={(e)=>tagFilter(tag.tagName)}>
						{tag.tagName.charAt(0).toUpperCase() + tag.tagName.slice(1)}
					</TagName>
				))}
			</TagContainer>
            {//TODO CHANGE PRODUCTS && TO ISLOADING ? BY MOVING TERNARY HERE
            }
			{products && console.log(products)}
			<ProductsContainer>
				<ProductTitle>Our {(products && products.length) && products[0].type.charAt(0).toUpperCase() + products[0].type.slice(1)}</ProductTitle>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					(filtered ? filteredProducts: products).map((product) => (
						<Link
							href={`${product.type}/${product.id}`}
						>
							<Product>
								<ProductImage src={product.img} />
								<ProductName>
									{product.name}{' '}
									<span>{product.price + '/lb'}</span>
								</ProductName>
                </Link>
								<button
                onClick={() =>
                  dispatch(
                    addToCart({
                      name: product.name,
                      image: product.img,
                      price: product.price,
                      quantity: 1,
                    })
                  )
                }
              >
                Add To Cart
              </button>
            </Product>
          ))
        )}
      </ProductsContainer>
    </BodyContainer>
	);
}
