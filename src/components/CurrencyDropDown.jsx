import React from 'react';
import { HiOutlineStar, HiStar } from "react-icons/hi";

const CurrencyDropDown = ({
  currencies,
  currency,
  setCurrency,
  favorities,
  handleFavorities,
  title
}) => {

  const isFavorite = (curr) => {
    favorities.includes(curr);
  }

  return (
    <div>
      <label htmlFor={title} className='block text-sm font-medium text-gray-700'>{title}</label>
      <div className='mt-1 relative'>
        <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)} 
        className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'>
          {/* renderfavorites */}
          {
            favorities.map((currency) => {
              return (
                <option value={currency} key={currency} className='bg-gray-200'>
                  {currency}
                </option>
              )
            })
          }
          
          {currencies
          .filter((c) => !(favorities.includes(c)))
          .map((currency) => {
            return (
            <option value={currency} key={currency}>
              {currency}
            </option>)
          })}
        </select>

        <button
        onClick={() => {handleFavorities(currency)}} 
        className='absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5'>
          {isFavorite(currency)? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  )
}

export default CurrencyDropDown