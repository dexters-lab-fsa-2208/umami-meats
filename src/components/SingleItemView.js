import React from "react";
import styled from "styled-components";
import { useGetSingleSteakQuery, useGetSingleSushiQuery } from "../../src/redux/reducers/apiSlice";

const MainProductContainer = styled.div`
    max-width: 100%;
    margin: 1em;

    > p {
        text-align: center;
        font-style: italic;
        margin-top: 0.5em;
    }
`;
const ProductContainerTop = styled.div`
    img {
        width: 55%;
    }

    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
`;
const ProductInfoRight = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const BuyProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    .qty {
        /* margin-top: 0.5em; */
        display: flex;
        button {
            height: 1.8em;
            width: 1.8em;
            text-align: center;

            border: 0.1em solid gray;
            border-radius: 50%;
        }
        p {
            margin: 0 0.4em;
        }
    }
`;

export default function SingleItemView({ type, id }) {
    // gets data relevant to the item
    let response;
    if (type === "sushi" && id) {
        response = useGetSingleSushiQuery(id)
    } else {
        response = useGetSingleSteakQuery(id);
    }
    const data = response.data;
    
    const [currentQty, setCurrentQty] = React.useState(1);

    return(<>
        {data ? (
            <>
                <MainProductContainer>
                    <ProductContainerTop>
                        <img src={data.img}/>

                        <ProductInfoRight>
                            <div>
                                <h1>{data.name}</h1>
                                <p><i>{`${data.price} / lb`}</i></p>
                            </div>

                            <BuyProductContainer>
                                <div className="qty">
                                    <button onClick={() => incrementAmt(-1)}>-</button>
                                    <p>{currentQty}</p>
                                    <button onClick={() => incrementAmt(1)}>+</button>
                                </div>
                            </BuyProductContainer>
                        </ProductInfoRight>
                    </ProductContainerTop>

                    <p>{data.desc}</p>
                </MainProductContainer>
            </>
        ) : (<p>Loading content</p>)}
    </>)
}
