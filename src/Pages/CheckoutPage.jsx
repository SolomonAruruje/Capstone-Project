import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import payment method icons (ensure these paths are correct)
import visa from '../assets/visa.svg';
import mastercard from '../assets/mastercard.svg';
import nagad from '../assets/nagad.svg';
import bkash from '../assets/bkash.svg';

const CheckoutPage = () => {
  // Destructure updateUser from useAuth
  const { cartItems, clearCart } = useCart();
  const { user, isAuthenticated, loading: authLoading, API_BASE_URL, updateUser } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    apartmentNo: '',
    townCity: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    emailAddress: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery'); // Default to COD
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Redirect if not authenticated (after auth context has loaded)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login?redirect=/checkout', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Pre-fill address if user is logged in and has a default address
  useEffect(() => {
    if (user && user.defaultAddress) {
      // Assuming user.defaultAddress is an object with structured fields
      setShippingAddress({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        companyName: user.defaultAddress.companyName || '',
        streetAddress: user.defaultAddress.streetAddress || '',
        apartmentNo: user.defaultAddress.apartmentNo || '',
        townCity: user.defaultAddress.townCity || '',
        state: user.defaultAddress.state || '',
        zipCode: user.defaultAddress.zipCode || '',
        phoneNumber: user.defaultAddress.phoneNumber || '',
        emailAddress: user.email || '' // Always pre-fill with user's registered email
      });
    } else if (user && user.email) {
      // If no default address but logged in, pre-fill email and names
      setShippingAddress(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        emailAddress: user.email || ''
      }));
    }
  }, [user]);

  const cartSubTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 1500;
  // Ensure cartTotal is calculated after discount, and formatted to 2 decimal places
  const cartTotal = (cartSubTotal + shippingFee - discountAmount).toFixed(2);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCouponApply = async (e) => {
    e.preventDefault();
    if (!couponCode) {
      setOrderError("Please enter a coupon code.");
      return;
    }
    setOrderError('');
    setOrderSuccess(false); // Clear previous success messages
    setCouponApplied(false);
    setDiscountAmount(0);

    try {
      // Dummy logic for coupon application:
      if (couponCode === "FREESHIP") {
        setDiscountAmount(shippingFee);
        setCouponApplied(true);
        setOrderSuccess("Free shipping coupon applied!");
      } else if (couponCode === "SAVE10") {
        setDiscountAmount(cartSubTotal * 0.10);
        setCouponApplied(true);
        setOrderSuccess("10% discount applied!");
      } else {
        setOrderError("Invalid or expired coupon code.");
      }
    } catch (error) {
      console.error('Coupon apply error:', error);
      setOrderError("Failed to apply coupon. Please try again.");
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setProcessingOrder(true);
    setOrderError('');
    setOrderSuccess(false);

    if (cartItems.length === 0) {
      setOrderError("Your cart is empty. Please add items before checking out.");
      setProcessingOrder(false);
      return;
    }

    // Basic shipping address validation
    const requiredAddressFields = ['firstName', 'lastName', 'streetAddress', 'townCity', 'state', 'phoneNumber', 'emailAddress'];
    const missingAddressFields = requiredAddressFields.filter(field => !shippingAddress[field]);
    if (missingAddressFields.length > 0) {
      setOrderError(`Please fill in all required shipping address fields: ${missingAddressFields.map(f => f.replace(/([A-Z])/g, ' $1').toLowerCase()).join(', ')}.`);
      setProcessingOrder(false);
      return;
    }

    // Card details validation if payment method is 'card'
    if (paymentMethod === 'card') {
      const requiredCardFields = ['cardNumber', 'cardHolderName', 'expiryMonth', 'expiryYear', 'cvv'];
      const missingCardFields = requiredCardFields.filter(field => !cardDetails[field]);
      if (missingCardFields.length > 0) {
        setOrderError(`Please fill in all required card details: ${missingCardFields.map(f => f.replace(/([A-Z])/g, ' $1').toLowerCase()).join(', ')}.`);
        setProcessingOrder(false);
        return;
      }
      // Basic format validation for card details
      if (!/^\d{13,19}$/.test(cardDetails.cardNumber)) {
        setOrderError('Invalid card number format.');
        setProcessingOrder(false);
        return;
      }
      if (!/^(0[1-9]|1[0-2])$/.test(cardDetails.expiryMonth)) {
        setOrderError('Invalid expiry month (MM).');
        setProcessingOrder(false);
        return;
      }
      if (!/^(20)\d{2}$/.test(cardDetails.expiryYear)) {
        setOrderError('Invalid expiry year (YYYY).');
        setProcessingOrder(false);
        return;
      }
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed
      const expYear = parseInt(cardDetails.expiryYear, 10);
      const expMonth = parseInt(cardDetails.expiryMonth, 10);

      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        setOrderError('Credit card has expired.');
        setProcessingOrder(false);
        return;
      }
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        setOrderError('Invalid CVV format.');
        setProcessingOrder(false);
        return;
      }
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          priceAtPurchase: item.price,
          productName: item.name,
          imageUrl: item.imageUrls?.[0]
        })),
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        cartSubTotal: cartSubTotal,
        shippingFee: shippingFee,
        discountAmount: discountAmount,
        totalAmount: parseFloat(cartTotal), // Ensure it's a number
      };

      // Add payment details only if 'card' method is selected
      if (paymentMethod === 'card') {
        orderData.paymentDetails = cardDetails;
      }

      // --- STEP 1: Place the Order ---
      const orderResponse = await axios.post(`${API_BASE_URL}/orders`, orderData);
      console.log('Order placed successfully:', orderResponse.data);

      // --- STEP 2: If 'Save Info' is checked, update user's address on backend ---
      if (saveInfo && user && user.id) {
        try {
          const updateAddressPayload = {
            address: shippingAddress // This matches the UpdateUserAddressRequest DTO structure
          };
          const userUpdateResponse = await axios.put(`${API_BASE_URL}/users/address`, updateAddressPayload);
          console.log('User address updated successfully:', userUpdateResponse.data);

          // --- STEP 3: Update AuthContext with the new user data ---
          // This ensures the frontend immediately reflects the saved address
          updateUser(userUpdateResponse.data); // Assuming backend returns updated UserResponse
        } catch (addressError) {
          console.error('Failed to update user address:', addressError.response?.data || addressError.message);
          // Log the error but don't prevent order success, as order already went through
          setOrderError(prev => prev + " (Note: Failed to save address for future use.)");
        }
      }

      // --- Final Success Actions ---
      setOrderSuccess(true);
      clearCart(); // Clear the cart after a successful order
      navigate('/order-confirmation', { state: { orderId: orderResponse.data.orderId } });

    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
      setOrderError(errorMessage);
    } finally {
      setProcessingOrder(false);
    }
  };

  // Show loading state while AuthContext initializes
  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[50vh]">
          <p>Loading user session...</p>
        </div>
        <Footer />
      </>
    );
  }

  // If not authenticated and authLoading is false, redirect has already happened via useEffect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="my-[80px] w-[90%] mx-auto">
        <h2 className="text-3xl font-bold mb-8">Checkout</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Address Form */}
          <div className="w-full lg:w-2/3 p-6 border rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Shipping Details</h3>
            <form onSubmit={handlePlaceOrder}> {/* Attach onSubmit to the main form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleAddressChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleAddressChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">Company Name (Optional)</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={shippingAddress.companyName}
                  onChange={handleAddressChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="streetAddress" className="block text-gray-700 text-sm font-bold mb-2">Street Address*</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={shippingAddress.streetAddress}
                  onChange={handleAddressChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="apartmentNo" className="block text-gray-700 text-sm font-bold mb-2">Apartment, Floor, etc. (Optional)</label>
                <input
                  type="text"
                  id="apartmentNo"
                  name="apartmentNo"
                  value={shippingAddress.apartmentNo}
                  onChange={handleAddressChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="townCity" className="block text-gray-700 text-sm font-bold mb-2">Town/City*</label>
                  <input
                    type="text"
                    id="townCity"
                    name="townCity"
                    value={shippingAddress.townCity}
                    onChange={handleAddressChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State*</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">Zip Code (Optional)</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number*</label>
                  <input
                    type="tel" // Use type="tel" for phone numbers
                    id="phoneNumber"
                    name="phoneNumber"
                    value={shippingAddress.phoneNumber}
                    onChange={handleAddressChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="emailAddress" className="block text-gray-700 text-sm font-bold mb-2">Email Address*</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={shippingAddress.emailAddress}
                  onChange={handleAddressChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#F5F5F5]"
                  required
                />
              </div>
              <label htmlFor="saveInfo" className="flex items-center text-gray-700 mb-6">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="mr-2 h-4 w-4 text-[#DB4444] focus:ring-[#DB4444] border-gray-300 rounded"
                />
                Save this information for faster check-out next time
              </label>

              {/* Payment Method */}
              <h3 className="text-2xl font-semibold mb-6">Payment Method</h3>
              <div className="mb-6 space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <label htmlFor="cardPayment" className="flex items-center text-gray-700">
                    <input
                      type="radio"
                      id="cardPayment"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-2 h-4 w-4 text-[#DB4444] focus:ring-[#DB4444]"
                    />
                    Bank/Credit Card
                  </label>
                  <div className='flex items-center space-x-2'>
                    <img src={bkash} alt="bkash" className='w-[38px]'/>
                    <img src={visa} alt="visa" className='w-[38px]'/>
                    <img src={mastercard} alt="mastercard" className='w-[38px]'/>
                    <img src={nagad} alt="nagad" className='w-[38px]'/>
                  </div>
                </div>
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
                    <div>
                      <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Card Number*</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardDetailsChange}
                        placeholder="e.g., 4111222233334444"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    <div>
                      <label htmlFor="cardHolderName" className="block text-gray-700 text-sm font-bold mb-2">Card Holder Name*</label>
                      <input
                        type="text"
                        id="cardHolderName"
                        name="cardHolderName"
                        value={cardDetails.cardHolderName}
                        onChange={handleCardDetailsChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    <div>
                      <label htmlFor="expiryMonth" className="block text-gray-700 text-sm font-bold mb-2">Expiry Month (MM)*</label>
                      <input
                        type="text"
                        id="expiryMonth"
                        name="expiryMonth"
                        value={cardDetails.expiryMonth}
                        onChange={handleCardDetailsChange}
                        placeholder="MM"
                        maxLength="2"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    <div>
                      <label htmlFor="expiryYear" className="block text-gray-700 text-sm font-bold mb-2">Expiry Year (YYYY)*</label>
                      <input
                        type="text"
                        id="expiryYear"
                        name="expiryYear"
                        value={cardDetails.expiryYear}
                        onChange={handleCardDetailsChange}
                        placeholder="YYYY"
                        maxLength="4"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">CVV*</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardDetailsChange}
                        placeholder="123"
                        maxLength="4"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                        required={paymentMethod === 'card'}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center p-3 border rounded-lg">
                  <label htmlFor="cashOnDelivery" className="flex items-center text-gray-700">
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={paymentMethod === 'cash_on_delivery'}
                      onChange={() => setPaymentMethod('cash_on_delivery')}
                      className="mr-2 h-4 w-4 text-[#DB4444] focus:ring-[#DB4444]"
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>

              {/* Order Submission and Messages */}
              {orderError && <p className="text-red-500 text-center mb-4 font-medium">{orderError}</p>}
              {orderSuccess && <p className="text-green-600 text-center mb-4 font-medium">Order placed successfully!</p>}

              <button
                type="submit"
                className="w-full bg-[#DB4444] text-white py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50 text-[16px] font-medium"
                disabled={processingOrder || cartItems.length === 0}
              >
                {processingOrder ? 'Processing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary & Coupon Section */}
          <div className="w-full lg:w-1/3 p-6 border rounded-lg shadow-md h-fit">
            <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center">No items in cart for checkout.</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center pb-2">
                    <div className='flex items-center'>
                      <img src={item.imageUrls?.[0]} alt={item.name} className='w-[40px] h-[40px] object-contain mr-2'/>
                      <p className="text-gray-800">{item.name} x {item.quantity}</p>
                    </div>
                    <p className="font-semibold">&#8358;{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))
              )}
              <div className="flex justify-between font-medium border-t pt-2">
                <p>Subtotal:</p>
                <p>&#8358;{cartSubTotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between font-medium">
                <p>Shipping:</p>
                <p>&#8358;{shippingFee.toLocaleString()}</p>
              </div>
              {couponApplied && discountAmount > 0 && (
                <div className="flex justify-between font-medium text-green-600">
                  <p>Discount:</p>
                  <p>- &#8358;{discountAmount.toLocaleString()}</p>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <p>Total:</p>
                <p>&#8358;{parseFloat(cartTotal).toLocaleString()}</p>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className='mt-8'>
              <form onSubmit={handleCouponApply} className='flex w-full items-center flex-row justify-between space-x-3'>
                  <input
                      type="text"
                      name="couponCode"
                      id="couponCode"
                      placeholder='Coupon Code'
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className='border border-[#000000] rounded-lg h-[50px] px-3 focus:outline-none flex-grow'
                  />
                  <button
                      type='submit'
                      name='applyCouponCode'
                      id='applyCouponCode'
                      className='text-white rounded-sm py-3 px-6 bg-[#DB4444] hover:bg-red-600 transition disabled:opacity-50'
                      disabled={processingOrder || couponApplied}
                  >
                      {couponApplied ? 'Applied' : 'Apply Coupon'}
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;


