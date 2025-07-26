import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import sideImage from '../assets/SideImage.svg';
import { useAuth } from '../AuthContext';

const LogIn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.email,
                    password: formData.password
                })
            });

            if (response.ok) {
                const result = await response.json();

                // Extract and save auth data correctly
                const userData = {
                    email: result.username,
                    tokenType: result.tokenType,
                    expiresIn: result.expiresIn
                };

                login(result.accessToken, userData); // Save to context and localStorage

                setMessage('Login successful! Redirecting...');
                setMessageType('success');

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Invalid credentials.');
                setMessageType('error');
            }
        } catch (err) {
            console.error('Login error:', err);
            setMessage('An error occurred. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className='flex justify-around items-center my-20'>
                <div className='mr-10'>
                    <img src={sideImage} alt="Login Illustration" className='w-[750px]' />
                </div>
                <div className='flex flex-col w-[370px] space-y-6'>
                    <h2 className='text-[36px]/[36px] font-medium'>Log In to EasyCart</h2>
                    <h4 className='text-[16px] font-normal'>Enter your details below</h4>

                    {message && (
                        <div className={`py-2 px-4 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleLoginSubmit} className='space-y-7 w-full'>
                        <div className='w-full border-b'>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className='focus:outline-none pb-2 w-full'
                            />
                        </div>
                        <div className='w-full border-b'>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className='focus:outline-none pb-2 w-full'
                            />
                        </div>

                        <div className='flex items-center justify-between'>
                            <button
                                type="submit"
                                className='w-[143px] rounded py-[16px] bg-[#DB4444] text-[16px] font-medium text-white disabled:bg-gray-400'
                                disabled={loading}
                            >
                                {loading ? 'Logging In...' : 'Log In'}
                            </button>
                            <a href="/forgot-password" className='text-[#DB4444] hover:underline text-[16px]'>Forgot Password?</a>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">Don't have an account? <Link to="/SignUp" className="text-[#DB4444] hover:underline">Sign Up</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LogIn;
