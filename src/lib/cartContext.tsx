import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from './menu';
import { RESTAURANT_DATA } from './restaurant';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialNotes?: string;
}

export type OrderType = 'DELIVERY' | 'PICKUP' | 'DINE_IN';

interface CartContextType {
  items: CartItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  addItem: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  tipPercentage: number;
  setTipPercentage: (pct: number) => void;
  total: number;
  generateWhatsAppOrderUrl: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ember_craft_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('DELIVERY');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [tipPercentage, setTipPercentage] = useState(15);

  useEffect(() => {
    try {
      localStorage.setItem('ember_craft_cart', JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  const addItem = (menuItem: MenuItem, quantity = 1, notes = '') => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === menuItem.id
            ? { ...i, quantity: i.quantity + quantity, specialNotes: notes || i.specialNotes }
            : i
        );
      }
      return [...prev, { menuItem, quantity, specialNotes: notes }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.menuItem.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const tax = subtotal * 0.08875;
  const deliveryFee = orderType === 'DELIVERY' && subtotal > 0 ? (subtotal > 45 ? 0 : 3.99) : 0;
  const tipAmount = subtotal * (tipPercentage / 100);
  const total = subtotal > 0 ? subtotal + tax + deliveryFee + tipAmount : 0;

  const generateWhatsAppOrderUrl = () => {
    if (items.length === 0) return '';
    let msg = `*Order Request - ${RESTAURANT_DATA.name}*\n`;
    msg += `Order Type: ${orderType}\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.quantity}x ${item.menuItem.name} ($${(item.menuItem.price * item.quantity).toFixed(2)})\n`;
      if (item.specialNotes) {
        msg += `   _Note: ${item.specialNotes}_\n`;
      }
    });
    msg += `\nSubtotal: $${subtotal.toFixed(2)}`;
    msg += `\nEstimated Tax: $${tax.toFixed(2)}`;
    if (orderType === 'DELIVERY') {
      msg += `\nDelivery: ${deliveryFee === 0 ? 'FREE' : '$' + deliveryFee.toFixed(2)}`;
    }
    msg += `\n*Total: $${total.toFixed(2)}*\n\nPlease confirm availability and payment link. Thank you!`;

    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${RESTAURANT_DATA.contact.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        orderType,
        setOrderType,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isReservationOpen,
        setIsReservationOpen,
        itemCount,
        subtotal,
        tax,
        deliveryFee,
        tipPercentage,
        setTipPercentage,
        total,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
