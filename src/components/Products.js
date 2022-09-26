import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useGetProductsQuery,
  useCreateOrderMutation,
  useCreateLineItemMutation,
  useGetTagsQuery,
} from "../../src/redux/reducers/apiSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cart-slice";
import { Loading } from "./";

const BodyContainer = styled.div`
  display: flex;
`;

// TAGS
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TagName = styled.p`
  width: 100%;
`;

// PRODUCTS
const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const ProductListHeader = styled.h2`
  flex: 2 2 200%;
  text-align: center;
  margin-top: 0.3em;
`;

// SINGLE PRODUCT IN LIST
const Product = styled.div`
  width: 175px;
  max-width: 65%;
  min-width: 175px;
  min-height: 225px;

  background-color: rgb(230, 230, 230);
  box-shadow: 1px 1px 7px rgba(100, 100, 100, 0.43);

  margin: 0.5em;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    /* using 'height' alone does not make some images the required height */
    min-height: 150px;
    max-height: 150px;
    width: 150px;

    object-fit: cover;
    margin: 0.7em auto 0.15em;

    box-shadow: 1px 1px 6px rgba(100, 100, 100, 0.31);
  }
  p {
    text-align: center;
    font-size: 0.85em;
    max-width: 75%;
    margin: 0.15em auto;

    &.productPrice {
      color: red;
    }
  }
  button {
    margin: 0.15em auto 0.7em;
  }
`;

// COMPONENT STARTS HERE
export default function Products({ products, isLoading }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const { cart, cartId } = useSelector((state) => state.cart);
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [createLineItem] = useCreateLineItemMutation();

  const { data: tags, isSuccess } = useGetTagsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const tagFilter = (tag) => {
    console.log(tag);
    setFiltered(true);
    setFilteredProducts(products?.filter((product) => product.tagName === tag));
    console.log(filteredProducts);
  };

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <BodyContainer>
        <TagContainer>
          {products &&
            products.length &&
            isSuccess &&
            tags
              .filter((tag) => tag.tagType === products[0].type)
              .map((tag) => (
                <TagName onClick={(e) => tagFilter(tag.tagName)} key={tag.id}>
                  {tag.tagName.charAt(0).toUpperCase() + tag.tagName.slice(1)}
                </TagName>
              ))}
        </TagContainer>
        {
          //TODO CHANGE PRODUCTS && TO ISLOADING ? BY MOVING TERNARY HERE
        }
        <ProductsContainer>
          <ProductListHeader>
            {"Our "}
            {products &&
              products.length &&
              products[0].type.charAt(0).toUpperCase() +
                products[0].type.slice(1)}
          </ProductListHeader>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            (filtered ? filteredProducts : products).map((product) => (
              <Product key={product.id}>
                <Link href={`${product.type}/${product.id}`}>
                  <img src={product.img} />
                </Link>
                <Link href={`${product.type}/${product.id}`}>
                  <p className="productName">{product.name}</p>
                </Link>
                <p className="productPrice">{product.price + "/lb"}</p>

                {/* if a user is logged in, onClick will post new line items
              if user is not logged in, dispatch to redux store */}
                {isLoggedIn ? (
                  <button
                    className="secondaryButton"
                    onClick={() =>
                      createLineItem({
                        orderId: cartId,
                        productId: product.id,
                        qty: 1,
                      })
                    }
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    className="secondaryButton"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: cart.length - 1,
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
                )}
              </Product>
            ))
          )}
        </ProductsContainer>
      </BodyContainer>
    );
}
