// contexts/CartContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import Swal from 'sweetalert2';

type CartItem = {
    id: number;
    product_name: string;
    image: string;
    price: number;
};

type CartContextType = {
    cartData: CartItem[];
    setCartData: Dispatch<SetStateAction<CartItem[]>>;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    modal1Open: boolean; // New state to track modal open/close status
    setModal1Open: Dispatch<SetStateAction<boolean>>; // Function to update modal state
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [modal1Open, setModal1Open] = useState(false); // New modal state

    // Load cart data from localStorage on initial render
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem("cartItems");
            if (storedData) {
                setCartData(JSON.parse(storedData));
            }
            setIsInitialized(true);
        }
    }, []);

    // Save cart data to localStorage whenever it changes, after initial load
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("cartItems", JSON.stringify(cartData));
        }
    }, [cartData, isInitialized]);

    const addToCart = (item: CartItem) => {
        const existingProduct = cartData.find(cartItem => cartItem.id === item.id);
        if (!existingProduct) {
            setCartData(prevCartData => [...prevCartData, item]);
            setModal1Open(true); // Open the modal when a new item is added
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Product already in the cart!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const removeFromCart = (id: number) => {
        setCartData(prevCartData => prevCartData.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartData([]); // Clear all items in the cart
    };

    return (
        <CartContext.Provider value={{ cartData, setCartData, addToCart, removeFromCart, clearCart, modal1Open, setModal1Open }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
