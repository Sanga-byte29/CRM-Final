// import React, { createContext, useContext, useState } from "react";
// import PropTypes from "prop-types";
// // Create the context
// const OrderContext = createContext();

// // Custom hook for using the context
// export const useOrderContext = () => useContext(OrderContext);

// // Context Provider component
// export const OrderProvider = ({ children }) => {
//   const [orderId, setOrderId] = useState("");

//   // Function to generate a new order ID
//   const generateOrderId = () => {
//     const timestamp = Date.now();
//     const randomNum = Math.floor(Math.random() * 1000);
//     const newOrderId = `ORD-${timestamp}-${randomNum}`;
//     setOrderId(newOrderId);
//   };

//   return (
//     <OrderContext.Provider value={{ orderId, setOrderId, generateOrderId }}>
//       {children}
//     </OrderContext.Provider>
// //   );
// // };

//2nd edition

// import React, { createContext, useContext, useState } from "react";
// import PropTypes from "prop-types"; // Import PropTypes

// export const OrderContext = createContext();
// export const generateOrderId = () => {
//   const timestamp = Date.now();
//   const randomNum = Math.floor(Math.random() * 1000);
//   return `ORD-${timestamp}-${randomNum}`;
// };

// export const OrderProvider = ({ children }) => {
//   const [orderId, setOrderId] = useState(null);

//   return (
//     <OrderContext.Provider value={{ orderId, setOrderId, generateOrderId }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };

// // Use PropTypes to validate props
// OrderProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// // Custom hook to use the OrderContext
// export const useOrderContext = () => {
//   return useContext(OrderContext);
// };

// //3rd edition
// import React, { createContext, useState, useContext } from "react";
// import PropTypes from "prop-types"; // Import PropTypes

// // Create the OrderContext
// const OrderContext = createContext();
// export const OrderProvider = ({ children }) => {
//   const [orderId, setOrderId] = useState(null);

// OrderProvider to wrap around components
// export const OrderProvider = ({ children }) => {
//   const [orderId, setOrderId] = useState(null);

//   // Async function to generate order ID (simulate API request or asynchronous operation)
//   const generateOrderId = async () => {
//     // Simulate a delay, for example fetching the order ID from an API
//     try {
//       const response = await new Promise((resolve) =>
//         setTimeout(() => resolve(`ORDER-${Math.floor(Math.random() * 10000)}`), 2000)
//       );
//       setOrderId(response);
//       return response;
//     } catch (error) {
//       console.error("Error generating order ID:", error);
//     }
//   };

//   return (
//     <OrderContext.Provider value={{ orderId, setOrderId, generateOrderId }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };
// OrderProvider.propTypes = {
//   children: PropTypes.node.isRequired, // 'children' should be of type 'node'
// };
// OrderProvider.propTypes = {
//   children: PropTypes.node, // This makes children optional
// };
// // Custom hook to use OrderContext
// export const useOrderContext = () => useContext(OrderContext);}

//v4
// OrderContext.js
import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

// Create context
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(null);

  const generateOrderId = async () => {
    try {
      const id = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`ORDER-${Date.now()}`);
        }, 1000);
      });
      setOrderId(id);
    } catch (error) {
      console.error("Error generating order ID", error);
    }
  };

  return (
    <OrderContext.Provider value={{ orderId, generateOrderId }}>{children}</OrderContext.Provider>
  );
};

// Prop validation for children
OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useOrderContext = () => useContext(OrderContext);
