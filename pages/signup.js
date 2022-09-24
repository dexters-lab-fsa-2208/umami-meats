import React, { useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import Router from 'next/router';
import authService from '../src/services/auth.service';
// import { User } from '../../server/db';
import { useDispatch } from 'react-redux';

const Signup = () => {
	const { register } = authService;

	const emailRef = useRef();
	const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	async function handleSubmit(e) {
		e.preventDefault();
		const credentials = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            address: addressRef.current.value,
		};

		try {
			setError('');
			setLoading(true);
			await register(credentials);
			Router.push('/login');
			// if (typeof window !== 'undefined') {
			// 	let user = JSON.parse(window.localStorage.getItem('user'));
			// }
		} catch {
			setError('Failed to sign in');
		}
		setLoading(false);
	}

	return (
		<>
			<div>
				<form onSubmit={handleSubmit}>
                    <label>First Name: </label>
					<input type='text' ref={firstNameRef}></input>
                    <label>Last Name: </label>
					<input type='text' ref={lastNameRef}></input>
                    <label>Address: </label>
					<input type='text' ref={addressRef}></input>
					<label>Email: </label>
					<input type='text' ref={emailRef}></input>
					<label>Password: </label>
					<input type='password' ref={passwordRef}></input>
                    <label>Confirm Password: </label>
					<input type='password' ref={confirmPasswordRef}></input>
					<button type='submit'>Sign Up</button>
				</form>
			</div>
		</>
	);
};

export default Signup;
