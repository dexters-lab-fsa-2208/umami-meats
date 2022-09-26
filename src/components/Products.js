import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useCreateLineItemMutation,
  useGetTagsQuery,
  useUpdateLineItemMutation,
} from "../../src/redux/reducers/apiSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToUsersCart } from "../redux/reducers/cart-slice";

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

// COMPONENT STARTS HERE

export default function Products({ products, isLoading }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const { cart, cartId, usersCart } = useSelector((state) => state.cart);
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { data: tags, isSuccess } = useGetTagsQuery();
  const [createLineItem] = useCreateLineItemMutation();
  const [updateLineItem] = useUpdateLineItemMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products, cartId, usersCart]);

  const tagFilter = (tag) => {
    console.log(tag);
    setFiltered(true);
    setFilteredProducts(products?.filter((product) => product.tagName === tag));
    console.log(filteredProducts);
  };

  // if a user is logged in
  const updateOrAddLineItem = (payload) => {
    console.log("isLoggedIn", payload);
    // keeping track of previous quantity
    let prevQty;
    // find out if the item exists in our redux store
    // if it does, we are able to call PUT
    // if it dosent, we are calling POST
    const existingItem = usersCart.find(
      ({ productId }) => productId === payload.productId
    );

    // setting the previous quantity to the quantity of the exisiting
    // in the database
    if (existingItem && existingItem.qty) prevQty = existingItem.qty;

    // update line item and sending it to redux store
    const update = async () => {
      console.log("editing");
      await updateLineItem({
        id: existingItem.id,
        data: {
          orderId: cartId,
          productId: payload.productId,
          qty: (prevQty += payload.qty),
        },
      });
      dispatch(addToUsersCart(payload));
    };

    // add line item and sending it to redux store
    const add = async () => {
      console.log("creating");
      let { data } = await createLineItem(payload);
      dispatch(addToUsersCart(data));
    };

    // if the lineitem found has an id (meaning it exists in our DB)
    // update it, if not, add new line item
    existingItem && existingItem.id ? update() : add();
    console.log("checking my cart", usersCart);
  };

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
        <ProductTitle>
          Our{" "}
          {products &&
            products.length &&
            products[0].type.charAt(0).toUpperCase() +
              products[0].type.slice(1)}
        </ProductTitle>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          (filtered ? filteredProducts : products).map((product) => (
            <Product key={product.id}>
              <Link href={`${product.type}/${product.id}`}>
                <ProductImage src={product.img} />
              </Link>
              <Link href={`${product.type}/${product.id}`}>
                <ProductName>
                  {product.name} <span>{product.price + "/lb"}</span>
                </ProductName>
              </Link>

              {/* if a user is logged in, onClick will post new line items
              if user is not logged in, dispatch to redux store */}
              {isLoggedIn ? (
                <button
                  onClick={() =>
                    updateOrAddLineItem({
                      orderId: cartId,
                      productId: product.id,
                      qty: 1,
                      product: product,
                    })
                  }
                >
                  Add To Cart
                </button>
              ) : (
                <button
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
