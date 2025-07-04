import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center h-[350px] text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-muted-foreground"
  >
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-full mb-4">
      <Sparkles className="h-12 w-12 text-purple-500" />
    </div>
    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Belum ada caption yang di-generate</h3>
    <p className="mt-2 max-w-sm">Masukkan deskripsi dan klik tombol Generate untuk membuat caption menarik</p>
  </motion.div>
);
