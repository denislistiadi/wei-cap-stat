import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type Caption = {
  id: string;
  text: string;
};

export const useCaptionGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState<number | null>(null);

  const generateCaptions = useCallback(async () => {
    if (!inputText.trim()) {
      toast('Deskripsi Kosong', {
        description: 'Silakan masukkan deskripsi untuk membuat caption',
      });
      return;
    }

    setIsLoading(true);
    setCaptions([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghasilkan caption');
      }

      const { data } = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Format data tidak valid');
      }

      setCaptions(data);
    } catch (error) {
      console.error(error);
      toast('Terjadi Kesalahan', {
        description: error instanceof Error ? error.message : 'Gagal menghasilkan caption',
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleCopy = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setIsCopied(index);
    toast('Berhasil Disalin!', {
      description: 'Caption telah disalin ke clipboard',
    });

    setTimeout(() => setIsCopied(null), 2000);
  }, []);

  return {
    inputText,
    setInputText,
    captions,
    isLoading,
    isCopied,
    generateCaptions,
    handleCopy,
  };
};
