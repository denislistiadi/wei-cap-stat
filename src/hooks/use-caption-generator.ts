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
      const resp = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ text: inputText }),
      });
      const { data } = await resp.json();
      setCaptions(data);
      console.log(data);
    } catch (error) {
      console.log(error);
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
