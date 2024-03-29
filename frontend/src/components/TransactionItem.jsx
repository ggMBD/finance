import React from 'react';

// Functional component TransactionItem
const TransactionItem = ({
  id,
  transactionType,
  amount,
  category,
  description,
  onDeleteClick
}) => {
  // Determine text color based on transaction type
  const transactionColor =
    transactionType === 'IN' ? 'text-green-500' : 'text-red-500';

  return (
    <div className=" mx-8 grid grid-rows-4 bg-white p-4 rounded-3xl drop-shadow-xl w-[400px] antialiased">
       {/* Display transaction type */}
      <div className="mb-3 translate-y-5 translate-x-4">
        <span className="text-lg font-medium px-4">
          Transaction Type: {transactionType === 'IN' ? 'Income' : 'Expense'}
        </span>
      </div>
       {/* Display transaction amount */}
      <div className="mb-3 translate-y-5 translate-x-4">
        <span className="text-lg font-medium pl-4">Amount:</span>
        <span className={` ${transactionColor}`}> {amount}TND</span>
      </div>
      {/* Display transaction category */}
      <div className="mb-3 translate-y-5 translate-x-4">
        <span className="text-lg font-medium px-4">Category: {category}</span>
      </div>
      {/* Display transaction description */}
      <div className="mb-3 translate-y-5 translate-x-4">
        <span className="text-lg font-medium px-4">
          Description: {description}
        </span>
      </div>
       {/* Button to delete transaction */}
      <div className="px-4 ml-auto inline-block">
        <button
          className="bg-red-500 text-white px-4 py-2 border border-red-700 hover:bg-red-600  -translate-y-3 rounded"
          onClick={() => onDeleteClick(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
