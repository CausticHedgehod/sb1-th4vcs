import React from 'react';

interface SettingsMenuProps {
  settings: {
    fontSize: number;
    lineHeight: number;
    fontFamily: string;
  };
  setSettings: React.Dispatch<React.SetStateAction<{
    fontSize: number;
    lineHeight: number;
    fontFamily: string;
  }>>;
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ settings, setSettings, onClose }) => {
  const fonts = ['Georgia', 'Arial', 'Times New Roman', 'Verdana', 'Helvetica'];

  return (
    <div className="absolute top-14 right-4 bg-white rounded-lg shadow-xl p-4 w-64 z-10">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Размер шрифта
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={settings.fontSize}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              fontSize: Number(e.target.value)
            }))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 text-center">
            {settings.fontSize}px
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Межстрочный интервал
          </label>
          <input
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              lineHeight: Number(e.target.value)
            }))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 text-center">
            {settings.lineHeight}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Шрифт
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              fontFamily: e.target.value
            }))}
            className="w-full p-2 border rounded-md"
          >
            {fonts.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;