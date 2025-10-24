import { useState, useEffect } from 'react';
import { currencyService, Currency } from '../services/currency';

interface UsePriceReturn {
  formatPrice: (priceInUSD: number) => string;
  convertPrice: (priceInUSD: number) => number;
  currentCurrency: Currency;
  currencySymbol: string;
}

export const usePrice = (): UsePriceReturn => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(currencyService.getCurrency());

  useEffect(() => {
    const handleCurrencyChange = (event: CustomEvent) => {
      setCurrentCurrency(event.detail.currency);
    };

    window.addEventListener('currencyChanged', handleCurrencyChange as EventListener);
    
    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange as EventListener);
    };
  }, []);

  const formatPrice = (priceInUSD: number): string => {
    return currencyService.formatPrice(priceInUSD, currentCurrency);
  };

  const convertPrice = (priceInUSD: number): number => {
    return currencyService.convertPrice(priceInUSD, currentCurrency);
  };

  const currencySymbol = currencyService.getCurrencySymbol(currentCurrency);

  return {
    formatPrice,
    convertPrice,
    currentCurrency,
    currencySymbol
  };
};

export default usePrice;