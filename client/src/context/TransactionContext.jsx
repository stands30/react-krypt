import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(
        provider,
        signer,
        TransactionContext
    )
    return TransactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
    const [formData, setformData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: '',
    });

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransactionData = async () => {
        if (!ethereum) return alert('Please install metamask');
        console.log(' availableTransactions ');
        const transactionContract = getEthereumContract();
        const availableTransactions = await transactionContract.getAllTransactions();
        console.log(' availableTransactions ');
        console.log( availableTransactions);
        const structuredTransactions = availableTransactions.map((transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / (10 ** 18),
        }));
        console.log(' structuredTransactions ');
        console.log( structuredTransactions);
        setTransactions(structuredTransactions);
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert('Please install metamask');
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(' accounts ', accounts);
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log('in wallet check');
                getAllTransactionData();
            } else {
                console.log('No Accounts found');
            }
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object');
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object');
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install metamask');
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(' accounts ', accounts);
            window.location.reload();

        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object');
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please install metamask');
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo, parsedAmount, message, keyword
            );
            setisLoading(true);
            console.log('Loading - ', transactionHash.hash);
            await transactionHash.wait();
            setisLoading(false);
            console.log('Success - ', transactionHash.hash);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            // window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error('no ethereum object');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    },[transactionCount]);
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, sendTransaction, handleChange, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    );
}