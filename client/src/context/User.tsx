import React, { createContext, useContext, useState } from 'react';

// Khai báo kiểu cho user
interface User {
  id: string;
  name: string;
  email: string;
}

// Khai báo kiểu cho context
interface UserContextType {
  user: User | null;
  setUsers: (user: User | null) => void;
}

// Tạo context với giá trị mặc định
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider để bọc ứng dụng
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUsers: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để sử dụng UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};