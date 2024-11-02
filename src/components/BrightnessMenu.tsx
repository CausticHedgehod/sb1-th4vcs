import React from 'react';

interface BrightnessMenuProps {
  brightness: number;
  setBrightness: (value: number) => void;
  onClose: () => void;
}

const BrightnessMenu: React.FC<BrightnessMenuProps> = ({ brightness, setBrightness, onClose }) => {
  return (
    <div className="absolute top-14 right-0 bg-white rounded-lg shadow-xl p-4 w-64 z-10">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Яркость
        </label>
        <input
          type="range"
          min="50"
          max="150"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-500 text-center">
          {brightness}%
        </div>
      </div>
    </div>
  );
};

export default BrightnessMenu;