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

  const generateCaptions = useCallback(() => {
    if (!inputText.trim()) {
      toast('Deskripsi Kosong', {
        description: 'Silakan masukkan deskripsi untuk membuat caption',
      });
      return;
    }

    setIsLoading(true);
    setCaptions([]);

    setTimeout(() => {
      const baseCaptions = [
        `Momen spesial ini layak diabadikan`,
        `Hidup adalah kumpulan momen seperti ini. ${inputText}`,
        `Tak ada yang lebih berharga dari momen seperti ini`,
        `"${inputText}" - sebuah cerita yang takkan terlupakan`,
        `Ketika waktu berhenti sejenak untuk ${inputText}`,
      ];

      const generatedCaptions = baseCaptions.map((text, idx) => ({
        id: `caption-${Date.now()}-${idx}`,
        text,
      }));

      setCaptions(generatedCaptions);
      setIsLoading(false);
    }, 1800);
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
