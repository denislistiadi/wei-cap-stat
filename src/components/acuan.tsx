'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Loader2,
  Copy,
  Sparkles,
  Smartphone,
  Palette,
  ChevronRight,
  Check,
  Wand2,
  History,
  HelpCircle,
  Settings,
  User,
  TrendingUp,
  BarChart2,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

// Types
type Caption = {
  id: string;
  text: string;
  timestamp: number;
};

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type CaptionItemProps = {
  caption: Caption;
  index: number;
  isCopied: number | null;
  onCopy: (text: string, index: number) => void;
  onSave: (id: string) => void;
  isSaved: boolean;
};

// Custom Hooks
const useCaptionGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState<number | null>(null);
  const [savedCaptions, setSavedCaptions] = useState<string[]>([]);
  const [stats, setStats] = useState({
    generated: 0,
    copied: 0,
    saved: 0,
  });

  useEffect(() => {
    // Load saved captions from localStorage
    const saved = JSON.parse(localStorage.getItem('savedCaptions') || '[]');
    setSavedCaptions(saved);

    // Load stats
    const statsData = JSON.parse(localStorage.getItem('captionStats') || '{"generated":0,"copied":0,"saved":0}');
    setStats(statsData);
  }, []);

  useEffect(() => {
    // Save stats to localStorage
    localStorage.setItem('captionStats', JSON.stringify(stats));
  }, [stats]);

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
        `Momen spesial ini layak diabadikan ✨ #${inputText.split(' ')[0] || 'moment'}`,
        `Hidup adalah kumpulan momen seperti ini. ${inputText}`,
        `Tak ada yang lebih berharga dari momen seperti ini ❤️`,
        `"${inputText}" - sebuah cerita yang takkan terlupakan`,
        `Ketika waktu berhenti sejenak untuk ${inputText} ⏳`,
      ];

      const generatedCaptions = baseCaptions.map((text, idx) => ({
        id: `caption-${Date.now()}-${idx}`,
        text,
        timestamp: Date.now(),
      }));

      setCaptions(generatedCaptions);
      setIsLoading(false);

      // Update stats
      setStats((prev) => ({
        ...prev,
        generated: prev.generated + generatedCaptions.length,
      }));
    }, 1800);
  }, [inputText]);

  const handleCopy = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setIsCopied(index);
    toast('Berhasil Disalin!', {
      description: 'Caption telah disalin ke clipboard',
    });

    setTimeout(() => setIsCopied(null), 2000);

    // Update stats
    setStats((prev) => ({ ...prev, copied: prev.copied + 1 }));
  }, []);

  const handleSaveCaption = useCallback(
    (id: string) => {
      if (savedCaptions.includes(id)) {
        // Remove from saved
        const updated = savedCaptions.filter((savedId) => savedId !== id);
        setSavedCaptions(updated);
        localStorage.setItem('savedCaptions', JSON.stringify(updated));

        // Update stats
        setStats((prev) => ({ ...prev, saved: prev.saved - 1 }));
      } else {
        // Add to saved
        const updated = [...savedCaptions, id];
        setSavedCaptions(updated);
        localStorage.setItem('savedCaptions', JSON.stringify(updated));

        // Update stats
        setStats((prev) => ({ ...prev, saved: prev.saved + 1 }));
      }
    },
    [savedCaptions],
  );

  return {
    inputText,
    setInputText,
    captions,
    isLoading,
    isCopied,
    savedCaptions,
    stats,
    generateCaptions,
    handleCopy,
    handleSaveCaption,
  };
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Reusable Components
const NavBar = () => (
  <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
        <Wand2 className="h-6 w-6 text-white" />
      </div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        CaptionAI
      </h1>
    </div>

    <div className="hidden md:flex items-center gap-6">
      <Button className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors">
        <History className="h-5 w-5" />
        <span>Riwayat</span>
      </Button>
      <Button className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors">
        <Bookmark className="h-5 w-5" />
        <span>Disimpan</span>
      </Button>
      <Button className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors">
        <HelpCircle className="h-5 w-5" />
        <span>Bantuan</span>
      </Button>
    </div>

    <div className="flex items-center gap-4">
      <Button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </Button>
      <Button className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <User className="h-5 w-5" />
      </Button>
    </div>
  </nav>
);

const StatsDashboard = ({ stats }: { stats: { generated: number; copied: number; saved: number } }) => (
  <div className="grid grid-cols-3 gap-4 mb-6">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4">
      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
        <Sparkles className="h-6 w-6 text-purple-500" />
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Dibuat</p>
        <p className="text-xl font-bold">{stats.generated}</p>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4">
      <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-lg">
        <Copy className="h-6 w-6 text-pink-500" />
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Disalin</p>
        <p className="text-xl font-bold">{stats.copied}</p>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4">
      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
        <Bookmark className="h-6 w-6 text-blue-500" />
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Disimpan</p>
        <p className="text-xl font-bold">{stats.saved}</p>
      </div>
    </div>
  </div>
);

const HeaderSection = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-6 mt-4"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className="inline-flex items-center justify-center mb-4"
    >
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
        <Wand2 className="h-8 w-8 text-white" />
      </div>
    </motion.div>

    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
      AI Caption Generator
    </h1>
    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
      Buat caption menarik untuk media sosial dalam hitungan detik dengan kecerdasan buatan
    </p>
  </motion.div>
);

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-[#1a1a2e] p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const CaptionItem = ({ caption, index, isCopied, onCopy, onSave, isSaved }: CaptionItemProps) => (
  <motion.div
    variants={itemVariants}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3 }}
    className="group relative"
  >
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a2e] overflow-hidden hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <p className="text-base md:text-lg p-4 pr-2">{caption.text}</p>
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSave(caption.id)}
              className="m-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors"
              aria-label="Simpan caption"
            >
              {isSaved ? (
                <Bookmark className="h-4 w-4 text-purple-500 fill-current" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCopy(caption.text, index)}
              className="m-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors"
              aria-label="Salin caption"
            >
              {isCopied === index ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const EmptyState = ({ onGenerate }: { onGenerate: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center h-[350px] text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-muted-foreground hover:border-purple-400 dark:hover:border-purple-600 transition-colors cursor-pointer"
    onClick={onGenerate}
  >
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-full mb-4">
      <Sparkles className="h-12 w-12 text-purple-500" />
    </div>
    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Belum ada caption yang di-generate</h3>
    <p className="mt-2 max-w-sm">Masukkan deskripsi dan klik tombol Generate untuk membuat caption menarik</p>
    <div className="flex items-center mt-6 text-purple-600 dark:text-purple-400">
      <span>Coba sekarang</span>
      <ChevronRight className="h-5 w-5 ml-1 animate-pulse" />
    </div>
  </motion.div>
);

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center h-[350px]"
  >
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="mb-6"
    >
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
        <Sparkles className="h-10 w-10 text-white" />
      </div>
    </motion.div>
    <p className="text-lg font-medium text-center">AI sedang membuat caption terbaik untuk Anda...</p>
    <p className="text-muted-foreground mt-2">Hanya beberapa detik lagi</p>
  </motion.div>
);

const ConfigurationCard = ({
  inputText,
  setInputText,
  isLoading,
  generateCaptions,
}: {
  inputText: string;
  setInputText: (value: string) => void;
  isLoading: boolean;
  generateCaptions: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <Card className="h-full border-0 shadow-lg rounded-2xl bg-white dark:bg-[#1a1a2e]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-pink-500" />
            <span>Konfigurasi Caption</span>
          </CardTitle>
          <Badge className="px-3 py-1">
            <Sparkles className="h-4 w-4 mr-1" />
            AI Powered
          </Badge>
        </div>
        <CardDescription>Sesuaikan dengan kebutuhan dan gaya Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="description" className="text-base font-medium flex items-center justify-between">
              <span>Deskripsi Momen Anda</span>
              <span className="text-xs text-gray-500 font-normal">Min. 10 karakter</span>
            </Label>
            <Textarea
              id="description"
              value={inputText}
              onChange={(e: any) => setInputText(e.target.value)}
              placeholder="Contoh: Liburan di pantai bersama keluarga, makan malam romantis, acara ulang tahun teman..."
              className="mt-2 min-h-[150px] text-base p-4 rounded-xl border border-gray-200 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-purple-500"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Jelaskan momen atau foto Anda secara detail untuk hasil terbaik
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Nada Caption</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Kasual
                </Button>
                <Button variant="outline" className="flex-1">
                  Formal
                </Button>
                <Button variant="outline" className="flex-1">
                  Lucu
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Platform</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  IG
                </Button>
                <Button variant="outline" className="flex-1">
                  FB
                </Button>
                <Button variant="outline" className="flex-1">
                  TWT
                </Button>
              </div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={generateCaptions}
              disabled={isLoading || inputText.length < 10}
              className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-lg font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sedang Membuat...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Caption Sekarang
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const ResultsCard = ({
  captions,
  isLoading,
  isCopied,
  handleCopy,
  handleSaveCaption,
  savedCaptions,
}: {
  captions: Caption[];
  isLoading: boolean;
  isCopied: number | null;
  handleCopy: (text: string, index: number) => void;
  handleSaveCaption: (id: string) => void;
  savedCaptions: string[];
}) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
    <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a2e] dark:to-[#16213e]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-purple-500" />
            <span>Hasil Caption</span>
          </CardTitle>
          {captions.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-full text-sm">
                {captions.length} hasil
              </span>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Salin Semua
              </Button>
            </div>
          )}
        </div>
        <CardDescription>Salin caption favorit Anda ke media sosial</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {captions.length === 0 && !isLoading && <EmptyState onGenerate={() => {}} />}
          {isLoading && <LoadingState />}

          <AnimatePresence>
            {captions.length > 0 && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {captions.map((caption, index) => (
                  <CaptionItem
                    key={caption.id}
                    caption={caption}
                    index={index}
                    isCopied={isCopied}
                    onCopy={handleCopy}
                    onSave={handleSaveCaption}
                    isSaved={savedCaptions.includes(caption.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const FeaturesSection = () => {
  const features = useMemo(
    () => [
      {
        title: 'Cepat & Efisien',
        description: 'Buat puluhan caption menarik dalam hitungan detik tanpa berpikir lama',
        icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      },
      {
        title: 'Gaya Beragam',
        description: 'Pilih dari berbagai nada dan gaya yang sesuai dengan kepribadian Anda',
        icon: <Palette className="h-6 w-6 text-pink-500" />,
      },
      {
        title: 'Optimasi Media Sosial',
        description:
          'Caption yang dihasilkan sudah dioptimalkan untuk platform seperti Instagram, Twitter, dan Facebook',
        icon: <Smartphone className="h-6 w-6 text-blue-500" />,
      },
      {
        title: 'Analisis Performa',
        description: 'Dapatkan wawasan tentang performa caption Anda di media sosial',
        icon: <BarChart2 className="h-6 w-6 text-green-500" />,
      },
      {
        title: 'Riwayat & Penyimpanan',
        description: 'Akses riwayat caption dan simpan favorit Anda untuk digunakan nanti',
        icon: <History className="h-6 w-6 text-yellow-500" />,
      },
      {
        title: 'Personalisasi',
        description: 'Sesuaikan hasil dengan preferensi dan gaya bahasa Anda',
        icon: <User className="h-6 w-6 text-indigo-500" />,
      },
    ],
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-16 md:mt-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Mengapa Menggunakan Caption AI?
          </h2>
          <p className="text-muted-foreground mt-2">Solusi lengkap untuk kebutuhan konten media sosial Anda</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Lihat semua fitur</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="mt-16 pt-8 pb-6 border-t border-gray-200 dark:border-gray-800">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold">CaptionAI</h3>
        </div>
        <p className="text-muted-foreground text-sm">
          Alat canggih untuk membuat caption media sosial dengan bantuan AI.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Produk</h4>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="hover:text-purple-600 cursor-pointer">Fitur</li>
          <li className="hover:text-purple-600 cursor-pointer">Harga</li>
          <li className="hover:text-purple-600 cursor-pointer">Integrasi</li>
          <li className="hover:text-purple-600 cursor-pointer">Template</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Sumber Daya</h4>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="hover:text-purple-600 cursor-pointer">Blog</li>
          <li className="hover:text-purple-600 cursor-pointer">Dokumentasi</li>
          <li className="hover:text-purple-600 cursor-pointer">Komunitas</li>
          <li className="hover:text-purple-600 cursor-pointer">Dukungan</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Perusahaan</h4>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="hover:text-purple-600 cursor-pointer">Tentang Kami</li>
          <li className="hover:text-purple-600 cursor-pointer">Karir</li>
          <li className="hover:text-purple-600 cursor-pointer">Kontak</li>
          <li className="hover:text-purple-600 cursor-pointer">Kebijakan Privasi</li>
        </ul>
      </div>
    </div>

    <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} CaptionAI. Hak cipta dilindungi.
    </div>
  </footer>
);

// Main Component
export default function CaptionAIPage() {
  const {
    inputText,
    setInputText,
    captions,
    isLoading,
    isCopied,
    savedCaptions,
    stats,
    generateCaptions,
    handleCopy,
    handleSaveCaption,
  } = useCaptionGenerator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7fe] to-[#eef4ff] dark:from-[#0f0c29] dark:to-[#302b63]">
      <NavBar />

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <HeaderSection />
        <StatsDashboard stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ConfigurationCard
            inputText={inputText}
            setInputText={setInputText}
            isLoading={isLoading}
            generateCaptions={generateCaptions}
          />

          <ResultsCard
            captions={captions}
            isLoading={isLoading}
            isCopied={isCopied}
            handleCopy={handleCopy}
            handleSaveCaption={handleSaveCaption}
            savedCaptions={savedCaptions}
          />
        </div>

        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}
