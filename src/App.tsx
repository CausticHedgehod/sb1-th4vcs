import React, { useState, useEffect, useCallback } from 'react';
import { Settings2, MoreVertical, Upload } from 'lucide-react';
import TextViewer from './components/TextViewer';
import SettingsMenu from './components/SettingsMenu';
import BrightnessMenu from './components/BrightnessMenu';
import { processFile } from './utils/fileProcessor';

function App() {
  const [content, setContent] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showBrightness, setShowBrightness] = useState(false);
  const [textSettings, setTextSettings] = useState({
    fontSize: 16,
    lineHeight: 1.5,
    fontFamily: 'Georgia'
  });
  const [brightness, setBrightness] = useState(100);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.settings-menu')) {
      setShowSettings(false);
    }
    if (!target.closest('.brightness-menu')) {
      setShowBrightness(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      const text = await processFile(file);
      setContent(text);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try another file.');
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 transition-all"
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Header */}
      <header className="relative p-6 flex justify-between items-center">
        <div className="w-8" /> {/* Spacer */}
        <h1 className="text-4xl font-bold text-center font-gothic tracking-wide">
          Читальня
        </h1>
        <div className="relative brightness-menu">
          <button
            onClick={() => setShowBrightness(!showBrightness)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreVertical className="w-6 h-6" />
          </button>
          {showBrightness && (
            <BrightnessMenu
              brightness={brightness}
              setBrightness={setBrightness}
              onClose={() => setShowBrightness(false)}
            />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!content && (
          <div className="text-center">
            <label className="relative cursor-pointer inline-block">
              <input
                type="file"
                className="hidden"
                accept=".fb2,.epub,.rtf,.txt,.doc,.docx"
                onChange={handleFileUpload}
              />
              <div className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Загрузить файл
              </div>
            </label>
            <p className="mt-4 text-gray-600">
              Поддерживаемые форматы: FB2, EPUB, RTF, TXT, DOC, DOCX
            </p>
          </div>
        )}

        {content && (
          <div className="relative mt-8">
            <div className="bg-white rounded-xl shadow-lg p-8 relative">
              <div className="settings-menu">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Settings2 className="w-5 h-5" />
                </button>
                {showSettings && (
                  <SettingsMenu
                    settings={textSettings}
                    setSettings={setTextSettings}
                    onClose={() => setShowSettings(false)}
                  />
                )}
              </div>
              <TextViewer content={content} settings={textSettings} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;