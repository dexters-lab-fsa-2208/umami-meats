import React, { useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import Router from 'next/router';
import authService from '../services/auth.service';
// import { User } from '../../server/db';


const Login = () => {
    const { login } = authService;

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const credentials = {email: emailRef.current.value, password: passwordRef.current.value}

        try {
            setError('');
            setLoading(true);
            await login(credentials);
            Router.push('/account');
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
        
    }

	return (
    <>
    <div>
        <form  onSubmit={handleSubmit}>
            <label>Username: </label>
            <input type='text' ref={emailRef}></input>
            <label>Password: </label>
            <input type='password' ref={passwordRef}></input>
            <button type='submit'>Log In</button>
        </form>
    </div>
    {/* <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px'}}>
        <Card>
            <Card.Body>
                <h2 className="text-center bm-4">Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to='/forgot-password'>Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
        </div>
        </Container> */}
    </>
    );
};

export default Login;
