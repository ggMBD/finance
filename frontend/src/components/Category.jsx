import React, { useState } from 'react';
import axios from 'axios';
// Functional component Category
const Category = ({ onUpdateCategories }) => {
  //State variables
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);

  //Function to handle adding a new category
  const handleAddCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      //Making POST request to add a new category
      const response = await axios.post(
        'http://127.0.0.1:8000/api/categories/',
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // If category is added successfully, update categories
      onUpdateCategories();
      // Clear input field
      setCategoryName('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='antialiased'>
      <h3 className='mb-6 text-xl font-semibold'>Add New Category</h3>
         {/* Input field for entering category name */}
      <input className='w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-[#2DDA9B]'
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category Name"
      />
      {/* Button to add category */}
      <button className='rounded-full px-6 py-1.5 bg-[#2DDA9B] text-white hover:bg-[#2dda9bcf]' onClick={handleAddCategory}>Add Category</button>
      {/* Displaying error message if error state is not null */}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Category;
