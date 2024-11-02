import mammoth from 'mammoth';
import * as EPub from 'epub';

export async function processFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'txt':
      return await readTxtFile(file);
    case 'doc':
    case 'docx':
      return await readDocFile(file);
    case 'epub':
      return await readEpubFile(file);
    case 'fb2':
    case 'rtf':
      return await readTxtFile(file);
    default:
      throw new Error('Неподдерживаемый формат файла');
  }
}

async function readTxtFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Ошибка чтения файла'));
      }
    };
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsText(file);
  });
}

async function readDocFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    throw new Error('Ошибка чтения DOC/DOCX файла');
  }
}

async function readEpubFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const epub = new EPub(e.target?.result);
        epub.on('end', () => {
          let content = '';
          epub.flow.forEach(chapter => {
            if (chapter.title) {
              content += chapter.title + '\n\n';
            }
            if (chapter.content) {
              content += chapter.content + '\n\n';
            }
          });
          resolve(content);
        });
        epub.on('error', (err) => {
          reject(new Error('Ошибка чтения EPUB файла'));
        });
        epub.parse();
      } catch (error) {
        reject(new Error('Ошибка чтения EPUB файла'));
      }
    };
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsArrayBuffer(file);
  });
}