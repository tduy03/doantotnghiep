import React, { createContext, useState } from "react";
import axios from "axios";

const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  // Khai báo các giá trị tìm kiếm và kết quả tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const handleSearchResult = async (searchTerm) => {
    try {
      setError(null);
      console.log(searchTerm);
      const response = await axios.post(`http://127.0.0.1:8000/api/search?q=${searchTerm}`);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API tìm kiếm:", error);
      setError(error);
    }
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchResults, handleSearchResult, error }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
