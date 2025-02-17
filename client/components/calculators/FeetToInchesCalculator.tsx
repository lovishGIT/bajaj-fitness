'use client';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const FeetInchesCalculator = () => {
    const [isFeetToCm, setIsFeetToCm] = useState(true);
    const [feet, setFeet] = useState(0);
    const [inches, setInches] = useState(0);
    const [cm, setCm] = useState(0);

    const convertToCm = () => {
        const totalInches = feet * 12 + inches;
        setCm(totalInches * 2.54);
    };

    const convertToFeetInches = () => {
        const totalInches = cm / 2.54;
        const feetResult = Math.floor(totalInches / 12);
        const inchesResult = Math.round(totalInches % 12);
        setFeet(feetResult);
        setInches(inchesResult);
    };

    const handleSwitchChange = () => {
        setIsFeetToCm((prev) => !prev);
        setFeet(0);
        setInches(0);
        setCm(0);
    };

    return (
        <div className="p-6 border rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                    {isFeetToCm
                        ? 'Feet & Inches to CM'
                        : 'CM to Feet & Inches'}
                </h2>
                <Switch
                    checked={isFeetToCm}
                    onCheckedChange={handleSwitchChange}
                />
            </div>

            {isFeetToCm ? (
                <>
                    <label className="block mb-2">Feet:</label>
                    <input
                        type="number"
                        value={feet}
                        onChange={(e) =>
                            setFeet(Number(e.target.value))
                        }
                        className="w-full p-2 mb-4 border rounded-lg"
                    />
                    <label className="block mb-2">Inches:</label>
                    <input
                        type="number"
                        value={inches}
                        onChange={(e) =>
                            setInches(Number(e.target.value))
                        }
                        className="w-full p-2 mb-4 border rounded-lg"
                    />
                    <Button
                        onClick={convertToCm}
                        className="w-full mt-4"
                    >
                        Convert to CM
                    </Button>
                    {cm >= 0 && (
                        <div className="mt-4 text-xl font-semibold">
                            Result: {cm.toFixed(2)} cm
                        </div>
                    )}
                </>
            ) : (
                <>
                    <label className="block mb-2">CM:</label>
                    <input
                        type="number"
                        value={cm}
                        onChange={(e) =>
                            setCm(Number(e.target.value))
                        }
                        className="w-full p-2 mb-4 border rounded-lg"
                    />
                    <Button
                        onClick={convertToFeetInches}
                        className="w-full mt-4"
                    >
                        Convert to Feet & Inches
                    </Button>
                    {feet >= 0 && (
                        <div className="mt-4 text-xl font-semibold">
                            Result: {feet} ft {inches} in
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FeetInchesCalculator;
