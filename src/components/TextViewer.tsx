import React from 'react';

interface TextViewerProps {
  content: string;
  settings: {
    fontSize: number;
    lineHeight: number;
    fontFamily: string;
  };
}

const TextViewer: React.FC<TextViewerProps> = ({ content, settings }) => {
  const paragraphs = content.split('\n\n');

  return (
    <div
      className="prose max-w-none"
      style={{
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
        fontFamily: settings.fontFamily
      }}
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default TextViewer;