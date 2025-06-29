import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const ManageAccount = () => {

    const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
    // const [isAddressBookOpen, setIsAddressBookOpen] = useState(false);
    // const [isPaymentOptionsOpen, setIsPaymentOptionsOpen] = useState(false);

    const handleMyProfileClick = () => {
            setIsMyProfileOpen(true);
        };

    // const handleAddressBookClick = () => {
    //         setIsAddressBookOpen(true);
    //     };

    // const handlePaymentOptionsClick = () => {
    //         setIsPaymentOptionsOpen(true);
    //     };



  // State to hold the user data fetched from the API
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const [initialUserData, setInitialUserData] = useState(null);


  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const USER_PROFILE_API_ENDPOINT = '/api/user-profile';

        // Simulate an API call
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({
              firstName: 'Jane',
              lastName: 'Doe',
              email: 'jane.doe@example.com',
              address: '123 Main St, Anytown, USA',
            })
          });
        }, 1500));

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);         
        setInitialUserData(data); 

      } catch (err) {
        setError(err.message || 'Failed to fetch user data.');
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // To reset the form fields to their initial state
  const handleCancel = () => {
    if (initialUserData) {
      setUserData(initialUserData);
    }
    // Also reset password fields
    setPasswordFields({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    // You might also want to clear any validation errors displayed
    setError(null);
  };


  // Handler for saving changes (form submission)
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    setError(null);

    try {
      // Simulate saving user profile data
      const UPDATE_PROFILE_API_ENDPOINT = '/api/update-user-profile';

      const profileUpdateResponse = await new Promise(resolve => setTimeout(() => {
        console.log("Simulating profile update with:", userData);
        resolve({ ok: true, status: 200, json: () => Promise.resolve({ message: 'Profile updated successfully!' }) });
      }, 1000));

      if (!profileUpdateResponse.ok) {
        const errorData = await profileUpdateResponse.json();
        throw new Error(errorData.message || `Failed to update profile! Status: ${profileUpdateResponse.status}`);
      }

      // Simulate saving password changes (if any)
      if (passwordFields.currentPassword || passwordFields.newPassword || passwordFields.confirmNewPassword) {
        if (passwordFields.newPassword !== passwordFields.confirmNewPassword) {
          throw new Error("New password and confirm password do not match.");
        }
        const CHANGE_PASSWORD_API_ENDPOINT = '/api/change-password';

        const passwordChangeResponse = await new Promise(resolve => setTimeout(() => {
          console.log("Simulating password change with:", passwordFields);
          resolve({ ok: true, status: 200, json: () => Promise.resolve({ message: 'Password updated successfully!' }) });
        }, 1000));

        if (!passwordChangeResponse.ok) {
          const errorData = await passwordChangeResponse.json();
          throw new Error(errorData.message || `Failed to change password! Status: ${passwordChangeResponse.status}`);
        }
      }

      alert('Changes saved successfully!');
      // After successful save, update initialUserData to reflect the new saved state
      setInitialUserData(userData);
      setPasswordFields({ currentPassword: '', newPassword: '', confirmNewPassword: '' });

    } catch (err) {
      setError(err.message || 'An error occurred while saving changes.');
      console.error("Error saving changes:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex justify-between my-40'>
        <div className='w-[30%] h-full flex flex-col items-start justify-start py-5'>
          <div className='flex flex-col w-[90%] space-y-8 p-8'>
            <div className='flex flex-col space-y-5 '>
              <p className='text-[16px]/[24px] font-semibold'>Manage My Account</p>
              <p className='ml-8 text-[16px]/[24px] font-normal cursor-pointer hover:text-[#DB4444]' onClick={handleMyProfileClick}>My Profile</p>
              <p className='ml-8 text-[16px]/[24px] font-normal cursor-pointer hover:text-[#DB4444]'>Address Book</p>
              <p className='ml-8 text-[16px]/[24px] font-normal cursor-pointer hover:text-[#DB4444]'>My Payment Options</p>
            </div>
            <div className='flex flex-col space-y-5'>
              <p className='text-[16px]/[24px] font-semibold'>My Orders</p>
              <Link to='/returns' className='ml-8 text-[16px]/[24px] font-normal'>My Returns</Link>
              <Link to='/cancellations' className='ml-8 text-[16px]/[24px] font-normal'>My Cancellations</Link>
            </div>
            <a href="/wishlist" className='text-[16px]/[24px] font-semibold'>My Wishlist</a>
          </div>
        </div>

        {isMyProfileOpen && (
        <div className='w-2/3 h-full shadow-xl flex flex-col rounded-lg p-10'>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl text-gray-600">Loading profile data...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl text-[#DB4444]">Error: {error}</p>
            </div>
          ) : (
            <form onSubmit={handleSaveChanges} className='flex flex-col space-y-8'>
              <h4 className='text-[#DB4444] text-[20px]/[28px] font-medium'>Edit Your Profile</h4>
              <div className='flex flex-col'>
                <div className='flex justify-between space-y-3 mb-3'>
                  <div className='flex flex-col w-[47%] space-y-2'>
                    <label htmlFor="firstName" className='text-[16px] font-semibold'>First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name='firstName'
                      value={userData.firstName}
                      onChange={handleUserDataChange}
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                    />
                  </div>
                  <div className='flex flex-col w-[47%] space-y-2'>
                    <label htmlFor="lastName" className='text-[16px] font-semibold'>Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name='lastName'
                      value={userData.lastName}
                      onChange={handleUserDataChange}
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                    />
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='flex flex-col w-[47%] space-y-2'>
                    <label htmlFor="email" className='text-[16px] font-semibold'>Email</label>
                    <input
                      type="email"
                      id="email"
                      name='email'
                      value={userData.email}
                      onChange={handleUserDataChange}
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                    />
                  </div>
                  <div className='flex flex-col w-[47%] space-y-2'>
                    <label htmlFor="address" className='text-[16px] font-semibold'>Address</label>
                    <input
                      type="text"
                      id="address"
                      name='address'
                      value={userData.address}
                      onChange={handleUserDataChange}
                      className='bg-[#F5F5F5] w-full h-[50px] px-3 focus:outline-none'
                    />
                  </div>
                </div>
              </div>

              <div className='flex flex-col space-y-5'>
                <label htmlFor="currentPassword" className='text-[16px] font-semibold'>Password Changes</label>
                <input
                  type="password"
                  id="currentPassword"
                  placeholder='Current Password'
                  name='currentPassword'
                  value={passwordFields.currentPassword}
                  onChange={handlePasswordChange}
                  className='bg-[#F5F5F5] w-full h-[50px] px-5 focus:outline-none'
                />
                <input
                  type="password"
                  id="newPassword"
                  placeholder='New Password'
                  name='newPassword'
                  value={passwordFields.newPassword}
                  onChange={handlePasswordChange}
                  className='bg-[#F5F5F5] w-full h-[50px] px-5 focus:outline-none'
                />
                <input
                  type="password"
                  id="confirmNewPassword"
                  placeholder='Confirm New Password'
                  name='confirmNewPassword'
                  value={passwordFields.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className='bg-[#F5F5F5] w-full h-[50px] px-5 focus:outline-none'
                />
              </div>
              <div className='flex justify-end space-x-4'>
                <button
                  type='button' // Important: type="button" to prevent form submission
                  onClick={handleCancel} // <--- Attach the new cancel handler here
                  className='text-[#000000] rounded-sm py-4 px-12 w-[215px] border border-gray-300 hover:bg-gray-100'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#DB4444] text-white rounded-sm py-4 px-12 w-[215px] hover:bg-[#DB4444] disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ManageAccount;