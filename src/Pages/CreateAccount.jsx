import React, { useState } from 'react';
import NavBar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import sideImage from '../assets/SideImage.svg';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const response = await fetch('http://localhost:8080/api/v1/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Account created successfully! Redirecting to login...');
                setMessageType('success');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                const backendMessage = result?.message || result?.error || 'Registration failed.';
                setMessage(backendMessage);
                setMessageType('error');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setMessage('An error occurred. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className='flex items-center justify-start my-20'>
                <div className='mr-10'>
                    <img src={sideImage} alt="Illustration" className='w-[750px]' />
                </div>
                <div className='flex flex-col w-[370px] space-y-6'>
                    <h2 className='text-[36px]/[30px] font-medium'>Create an account</h2>
                    <h4 className='text-[16px] font-normal'>Enter your details below</h4>

                    {message && (
                        <div className={`py-2 px-4 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-7 w-full'>
                        <div className='w-full border-b'>
                            <input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className='focus:outline-none pb-2 w-full'
                            />
                        </div>
                        <div className='w-full border-b'>
                            <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className='focus:outline-none pb-2 w-full'
                            />
                        </div>
                        <div className='w-full border-b'>
                            <input
                                name="email"
                                type="email"
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
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className='focus:outline-none pb-2 w-full'
                            />
                        </div>
                        <button
                            type="submit"
                            className='w-full rounded py-[16px] bg-[#DB4444] text-[16px] font-medium text-white disabled:bg-gray-400'
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">Already have an account? <a href="/login" className="text-[#DB4444] hover:underline">Log in</a></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateAccount;
