import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransactionList from '../components/TransactionList'
import TransactionActions from '../components/TransactionActions'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BalanceSummary from '../components/BalanceSummary';
import Sidebar from '../components/Sidebar';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  });

  useEffect(() => {
    const getLastThreeTransaction = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://127.0.0.1:8000/api/transaction',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.data;
        const lastThree = data.slice(-3);
        setTransactions(lastThree);
      } catch (error) {
        setError(error.message);
      }
    };

    getLastThreeTransaction();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    try {
      console.log('Adding transaction:', newTransaction);
      const response = await axiosInstance.post(
        '/transaction/',
        newTransaction
      );
      console.log('Transaction added successfully:', response.data);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error('Error adding transaction:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  // Define forceRemount function
  const [remountKey, setRemountKey] = useState(0);
  const forceRemount = () => setRemountKey(prevKey => prevKey + 1);

  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen">
      <Sidebar />
      
      <div className="">
        {user ? (
          <div className="row-start-2">
            <BalanceSummary forceRemount={forceRemount} />
            <TransactionActions onAddTransaction={handleAddTransaction} />
            <TransactionList />
            <p className="text-xl antialiased font-semibold ml-8 mt-4">
              Last Transaction
            </p>
            <div className="text-white antialiased grid grid-cols-[auto_auto_auto] mb-8 px-7 gap-8">
              {/* Your other components */}
            </div>
            <div className="grid grid-cols-[auto_1fr]">
              {/* Your other components */}
            </div>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
