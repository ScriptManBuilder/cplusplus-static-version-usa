// Currency service for automatic USD/EUR conversion
export type Currency = 'USD' | 'EUR';

interface CurrencyRates {
  USD: number;
  EUR: number;
}

class CurrencyService {
  private rates: CurrencyRates = {
    USD: 1.0, // Base currency
    EUR: 0.93 // Updated rate: 1 USD = 0.93 EUR (approximate)
  };

  private currentCurrency: Currency = 'USD';

  // Set current currency
  setCurrency(currency: Currency): void {
    this.currentCurrency = currency;
    localStorage.setItem('selectedCurrency', currency);
    
    // Отправляем событие об изменении валюты
    window.dispatchEvent(new CustomEvent('currencyChanged', {
      detail: { currency }
    }));
  }

  // Get current currency
  getCurrency(): Currency {
    return this.currentCurrency;
  }

  // Initialize currency from localStorage
  initCurrency(): void {
    const saved = localStorage.getItem('selectedCurrency') as Currency;
    if (saved && (saved === 'USD' || saved === 'EUR')) {
      this.currentCurrency = saved;
    } else {
      // Если нет сохраненной валюты, устанавливаем USD по умолчанию
      this.currentCurrency = 'USD';
      localStorage.setItem('selectedCurrency', 'USD');
    }
  }

  // Convert price from USD to target currency
  convertPrice(priceInUSD: number, targetCurrency?: Currency): number {
    const currency = targetCurrency || this.currentCurrency;
    const rate = this.rates[currency];
    const convertedPrice = parseFloat((priceInUSD * rate).toFixed(2));
    
    return convertedPrice;
  }

  // Format price with currency symbol
  formatPrice(priceInUSD: number, targetCurrency?: Currency): string {
    const currency = targetCurrency || this.currentCurrency;
    const convertedPrice = this.convertPrice(priceInUSD, currency);
    
    const symbols = {
      USD: '$',
      EUR: '€'
    };

    const formatted = `${symbols[currency]}${convertedPrice.toFixed(2)}`;
    
    return formatted;
  }

  // Get currency symbol
  getCurrencySymbol(currency?: Currency): string {
    const curr = currency || this.currentCurrency;
    return curr === 'USD' ? '$' : '€';
  }

  // Update exchange rates (could be called from an API)
  updateRates(newRates: Partial<CurrencyRates>): void {
    this.rates = { ...this.rates, ...newRates };
  }

  // Get all available currencies
  getAvailableCurrencies(): Currency[] {
    return ['USD', 'EUR'];
  }

  // Get current exchange rate
  getExchangeRate(fromCurrency: Currency = 'USD', toCurrency?: Currency): number {
    const to = toCurrency || this.currentCurrency;
    return this.rates[to] / this.rates[fromCurrency];
  }
}

// Create singleton instance
export const currencyService = new CurrencyService();

// Initialize on import
currencyService.initCurrency();

// Export for use in components
export default currencyService;