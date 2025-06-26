// import React, { createContext, useState, useContext } from 'react';
// import QuickViewProductModal from './QuickViewProductModal';

// // 1. Create the Context
// const QuickViewContext = createContext();

// // 2. Create a Provider Component
// export const QuickViewProvider = ({ children }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalProduct, setModalProduct] = useState(null);

//     const openQuickView = (productData) => {
//         setModalProduct(productData);
//         setIsModalOpen(true);
//         document.body.style.overflow = 'hidden'; // Disable body scroll
//     };

//     const closeQuickView = () => {
//         setIsModalOpen(false);
//         setModalProduct(null);
//         document.body.style.overflow = 'unset'; // Re-enable body scroll
//     };

//     return (
//         <QuickViewContext.Provider value={{ openQuickView, closeQuickView }}>
//             {children}
//             {/* Render the QuickViewProductModal here, at a high level */}
//             {isModalOpen && (
//                 <QuickViewProductModal
//                     product={modalProduct}
//                     onClose={closeQuickView}
//                 />
//             )}
//         </QuickViewContext.Provider>
//     );
// };

// // 3. Create a Custom Hook to use the Context (optional, but good practice)
// export const useQuickView = () => {
//     const context = useContext(QuickViewContext);
//     if (context === undefined) {
//         throw new Error('useQuickView must be used within a QuickViewProvider');
//     }
//     return context;
// };