import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

// Функции для работы с localStorage
const saveToLocalStorage = (state: CartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    // Error saving cart to localStorage
  }
};

const loadFromLocalStorage = (): CartState => {
  try {
    const saved = localStorage.getItem('cart');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    // Error loading cart from localStorage
  }
  return {
    items: [],
    total: 0,
    itemCount: 0
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;
      
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        newState = {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1
        };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        newState = {
          ...state,
          items: [...state.items, newItem],
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1
        };
      }
      saveToLocalStorage(newState);
      return newState;
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity
      };
      saveToLocalStorage(newState);
      return newState;
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (!item) return state;
      
      const quantityDiff = quantity - item.quantity;
      
      if (quantity <= 0) {
        newState = {
          ...state,
          items: state.items.filter(item => item.id !== id),
          total: state.total - (item.price * item.quantity),
          itemCount: state.itemCount - item.quantity
        };
      } else {
        const updatedItems = state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        
        newState = {
          ...state,
          items: updatedItems,
          total: state.total + (item.price * quantityDiff),
          itemCount: state.itemCount + quantityDiff
        };
      }
      saveToLocalStorage(newState);
      return newState;
    }
    
    case 'CLEAR_CART':
      newState = {
        items: [],
        total: 0,
        itemCount: 0
      };
      saveToLocalStorage(newState);
      return newState;
    
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  addToCart: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  // Загружаем данные из localStorage при инициализации
  useEffect(() => {
    const savedCart = loadFromLocalStorage();
    if (savedCart.items.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart,
      dispatch
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
