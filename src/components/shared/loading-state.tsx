import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const LoadingState = () => (
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
