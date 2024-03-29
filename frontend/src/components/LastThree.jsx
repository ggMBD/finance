import { AuthContext } from '../contexts/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

 //Functional component LastThree
const LastThree = ({ forceRemount }) => {
  //State variables
const [lastThree, setLastThree] = useState([]);
const [error, setError] = useState(null);

//useEffect hook to fetch last three transactions
useEffect(() => {
  //Asynchronus ffunction to fetch last three transactions
const getLastThreeTransaction = async () => {
      try {
        const token = localStorage.getItem('token');
        //making Get request to fetch last three transactions
        const response = await axios.get(
          'http://127.0.0.1:8000/api/transaction/',
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              page: 1, // Page number
              page_size: 3 // Number of transactions per page
            }
          }
        );
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.data;
        setLastThree(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    getLastThreeTransaction();
  }, [forceRemount]); // Dependency array containing forceRemount variable



    return (
      <>
      {/* Heading for last transactions */}
      <p className="text-xl antialiased font-semibold ml-8 mt-4">
              Last Transactions
            </p>
            {/* Container for displaying last three transactions */}
      <div className="text-white antialiased grid grid-cols-[400px_400px_400px] mb-8 px-7 gap-8">
        {/* Mapping over lastThree array to render each transaction */}
              {lastThree.map((transaction, index) => (
                <div key={index} className="relative h-[219px] p-6 mt-4 rounded-3xl bg-gradient-to-r from-[#8EC8F8] to-[#047EDF] drop-shadow-xl">
                  <div className="bg-no-repeat bg-right inset-0 absolute bg-[url('https://demo.bootstrapdash.com/purple/themes/assets/images/dashboard/circle.svg')]"></div>
                  {/* Displaying transaction category name */}
                  <p className="text-[25px]">{transaction.category_name}</p>
                  <p className="text-[40px]">{transaction.amount}</p>
                  <p className="text-[20px]">{transaction.transaction_type === 'EX' ? 'Expense' : 'Income'}</p>
                </div>
              ))}

            </div>
            </>
    );
};
    export default LastThree;
