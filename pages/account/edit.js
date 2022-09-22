import React from "react";
import styled from "styled-components";
import { useUpdateUserMutation } from "../../src/redux/reducers/apiSlice";
import { RemoveSSRFromComponent } from "../../src/utils";

const EditPageContainer = styled.div`
    margin: 0.6em 1em;
    h2 {
        margin-bottom: 0.3em;
    }
    hr {
        margin-top: 0.4em;
    }
    form {
        display: flex;
        flex-direction: column;
        * {
            margin: 0.1em;
        }
        label {
            margin-bottom: 0.1em;
            display: flex;
            justify-content: space-between;
            input {
                width: 45%;
            }
        }
        button {
            margin: 0.4em auto 0;
            width: fit-content;
        }
    }
    > p {
        margin: 0.3em 0;
    }
    .passHidden {
        text-decoration: underline
    }
    .updatePass {
        font-weight: bold;
    }
`;
const UpdatePasswordContainer = styled.div`

`;

function EditAccount() {
    // might be a good idea to verify their token before allowing them to access this page
    let user = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = React.useState(user);
    const [pwDisplay, setPwDisplay] = React.useState(false);
    const [editUser] = useUpdateUserMutation();

    const togglePwDisplay = () => {
        setPwDisplay(true);
    }

    const handleChange = (e) => {
        const updatedForm = {...form};
        updatedForm[e.target.name] = e.target.value;
        setForm(updatedForm);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id: form.id,
            data: {...form},
        };
        await editUser(payload);
    }

    const handlePasswordChange = () => {

    }
    const handlePasswordSubmit = () => {

    }

    return(<>
        <EditPageContainer>
            <h2>Edit account info</h2>
            {user ? <>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input type="text" value={form.firstName} onChange={handleChange} name="firstName"/>
                    </label>
                    <label>
                        Last Name:
                        <input type="text" value={form.lastName} onChange={handleChange} name="lastName"/>
                    </label>
                    <label>
                        Email:
                        <input type="text" value={form.email} onChange={handleChange} name="email"/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <hr />
                <p className={pwDisplay ? "updatePass" : "passHidden"} onClick={() => setPwDisplay(true)}>Change password</p>
            </> : <p>Loading content...</p>
            }
        {pwDisplay ? 
            <UpdatePasswordContainer>
                <form onSubmit={handlePasswordSubmit}>
                    <label>
                        New password:
                        <input type="password" onChange={handlePasswordChange} name="password"/>
                    </label>
                    <label>
                        Confirm new password:
                        <input type="password" onChange={handlePasswordChange} name="confirmPassword"/>
                    </label>
                    <button type="submit">Update Password</button>
                    <button onClick={() => setPwDisplay(false)}>Cancel</button>
                </form>
            </UpdatePasswordContainer>
        : ""}
        </EditPageContainer>
    </>)
}

// disabling server-side-rendering, since data is acquired from localStorage
export default RemoveSSRFromComponent(EditAccount);
