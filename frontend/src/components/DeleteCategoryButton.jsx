import React from 'react';
import axios from 'axios';

//Functional component DeleteCategoryButton
function DeleteCategoryButton({ categoryId, onUpdateCategories }) {
  //Function to handle deletion of category
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      //Making DELETE request to delete category by categoryId
      await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onUpdateCategories(); // Update categories after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className='antialiased grid'>
      {/* Button to trigger category deletion */}
      <button
        className="mb-3 bg-red-500 text-white px-4 py-1 border border-red-700 hover:bg-red-600 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteCategoryButton;
