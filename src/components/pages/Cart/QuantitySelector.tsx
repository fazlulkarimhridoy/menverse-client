// components/QuantitySelector.tsx
import { useState } from 'react';

interface QuantitySelectorProps {
    initialQuantity?: number;
    onQuantityChange: (newQuantity: number) => void;
}

const QuantitySelector = ({ initialQuantity = 1, onQuantityChange }: QuantitySelectorProps) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button 
                className="bg-gray-200 px-3 py-1 rounded-md text-lg"
                onClick={handleDecrease}
            >
                -
            </button>
            <span className="text-lg">{quantity}</span>
            <button 
                className="bg-gray-200 px-3 py-1 rounded-md text-lg"
                onClick={handleIncrease}
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
