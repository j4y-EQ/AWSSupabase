import React, { createContext, useContext } from 'react';

// Create a context for authentication
export const authContext = createContext();

// export const AuthProvider = ({ session }) => {
//   // Check if the user is logged in on initial load
//   return (
//     <authContext.Provider value={{ session }}>
//       {session}
//     </authContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(authContext);
// };
