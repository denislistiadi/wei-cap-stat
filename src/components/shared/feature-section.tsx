import { useMemo } from 'react';
import { Palette, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { FeatureCard } from './feature-card';

export const FeaturesSection = () => {
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
      // {
      //   title: "Analisis Performa",
      //   description:
      //     "Dapatkan wawasan tentang performa caption Anda di media sosial",
      //   icon: <BarChart2 className="h-6 w-6 text-green-500" />,
      // },
      // {
      //   title: "Riwayat & Penyimpanan",
      //   description:
      //     "Akses riwayat caption dan simpan favorit Anda untuk digunakan nanti",
      //   icon: <History className="h-6 w-6 text-yellow-500" />,
      // },
      // {
      //   title: "Personalisasi",
      //   description: "Sesuaikan hasil dengan preferensi dan gaya bahasa Anda",
      //   icon: <User className="h-6 w-6 text-indigo-500" />,
      // },
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
      <h2 className="text-2xl md:text-3xl leading-normal font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        Mengapa Menggunakan Caption AI?
      </h2>
      <p className="text-muted-foreground mt-2 mb-12 text-center">
        Solusi lengkap untuk kebutuhan konten media sosial Anda
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </motion.div>
  );
};
