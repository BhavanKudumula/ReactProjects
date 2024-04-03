import React, { useEffect, useState } from 'react'
import CurrencyDropDown from './CurrencyDropDown';
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {

    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR")

    const [convertedAmount, setConvertedAmount] = useState(null)
    const [isconverting, setIsConverting] = useState(false)
    const [favorities, setFavorities] = useState(JSON.parse(localStorage.getItem("favorities")) || ["INR", "USD"])
 
//    currencies : https://api.frankfurter.app/currencies
  

    const fetchCurrencies = async() => {
        try {
           const res = await fetch("https://api.frankfurter.app/currencies")
           const data = await res.json()
           setCurrencies(Object.keys(data)) 
        } catch (error) {
            console.error("Error Fetching Currencies")
        }
    };

    useEffect(() => {
        fetchCurrencies();
        
    }, []);

    const handleFavorities = (currency) => {
        let updatedFavorities = [...favorities]
       
        if(favorities.includes(currency)) {
            updatedFavorities = updatedFavorities.filter((fav) => fav !==currency)
        } else {
            updatedFavorities.push(currency)
        }
        setFavorities(updatedFavorities)
        localStorage.setItem("favorities", JSON.stringify(updatedFavorities))
    }

    //  console.log(currencies);

     //currencies : https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
    const convertCurrency = async() => {
        if (!amount) return;
        setIsConverting(true);
        try {
            const resp = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            )
            const data = await resp.json()
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency)

        } catch (error) {
            console.error("Error Fetching Currency Conversion") 
        } finally {
            setIsConverting(false)
        }
    }

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency)
    }

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700'>
            CurrencyConverter
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'> 
            <CurrencyDropDown 
                title="From:" 
                currencies={currencies} 
                currency={fromCurrency}
                setCurrency={setFromCurrency}
                handleFavorities={handleFavorities}
                favorities={favorities}
            />
            {/* Swap Currencies */}

            <div className='flex justify-center -mb-5 sm:mb-0'>
                <button onClick={swapCurrencies} 
                className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                    <HiArrowsRightLeft className='text-xl text-gray-700'/>
                </button>
            </div>

            <CurrencyDropDown 
                title="To:" 
                currencies={currencies} 
                currency={toCurrency}
                setCurrency={setToCurrency}
                handleFavorities={handleFavorities}
                favorities={favorities}
            />
        </div>

        <div className='mt-4'>
            <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>Amount: </label>
            <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)} 
            type="number" 
            className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4'/>
        </div>
        
        <div className='flex justify-end mt-6'>
            <button 
            onClick={convertCurrency}

            className={ 
                `px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${isconverting? "animate-pluse" : "" }`
                }
            >
                Convert
            </button>
        </div>

        {convertedAmount &&<div className='mt-4 text-lg font-medium text-right text-green-600'>
            Converted Amount: {convertedAmount}
        </div>}
    </div>
  )
}

export default CurrencyConverter