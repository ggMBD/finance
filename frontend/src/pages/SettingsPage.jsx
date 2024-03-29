import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import TransactionList from '../components/TransactionList';
import TransactionActions from '../components/UserAccount';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

function SettingsPage() {
  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
      <Sidebar />
      <Header title="Settings" />
    </div>
  );
}

export default SettingsPage;
