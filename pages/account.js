import React from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";

const AccountDetails = styled.div`
    margin: 1em;
`;
const EditAccountBtn = styled.button`
    margin: 1em;
    position: absolute;
    right: 0;
    top: 9em;
`;

const LineDivider = styled.hr`
    margin: 0 auto;
    width: 92%;
`
const PreviousOrders = styled.div`
    margin: 1em;
    h2 {
        margin-bottom: 0.4em;
    }
    .orderList {
        .singleOrder {
            padding: 0.25em 0.5em;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .leftInfo {
                .order {
                    font-weight: bold;
                }
                .itemCt {
                    font-style: italic;
                }
            }

            &:nth-child(odd) {
                background-color: lightgray;
            }
        }
    }
`;

function Account() {
    let user = JSON.parse(localStorage.getItem("user"));
    // 'user' does not have orders attached yet, so i have input some dummy data
    let orders = [{
        id: "5A89JA",
        price: "458.58",
        items: [0, 0, 0, 0]
    },
    {
        id: "8N20DA",
        price: "120.09",
        items: [0]
    },
    {
        id: "1GADJB",
        price: "6718.77",
        items: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }];

    return (<>
        <AccountDetails>
            <h2>Account Details</h2>
            {user ? <>
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <p>{user.email}</p>
            </> : <>
                <p>Loading content...</p>
            </>}
        </AccountDetails>
        {/* this button can link to new page, or open a form here - undecided */}
        <EditAccountBtn>Edit Account Details</EditAccountBtn>

        <LineDivider />

        <PreviousOrders>
            <h2>Order History</h2>
            <div className="orderList">
                {user ? <>
                    {orders.map((order) => {
                        return (
                            <div className="singleOrder">
                                {/* clicking orderId should link to order page */}
                                <div className="leftInfo">
                                    <p className="order">{`Order ${order.id}`}</p>
                                    <p className="itemCt">{`${order.items.length} items`}</p>
                                </div>
                                <p>${order.price}</p>
                            </div>
                        )
                    })}
                </> : <>
                    <p>Loading content...</p>
                </>}
            </div>
        </PreviousOrders>
    </>)
}

// disabling server-side-rendering, since the data is acquired from localStorage
// might export this to use separately, since many components might need it
export default dynamic(() => Promise.resolve(Account), {ssr: false});
