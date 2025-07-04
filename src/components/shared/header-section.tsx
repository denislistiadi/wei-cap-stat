import { Wand2 } from 'lucide-react';
import { motion } from 'motion/react';

export const HeaderSection = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-10 mt-6 md:mt-12"
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
      Wei AI Caption Generator
    </h1>
    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
      Buat caption menarik untuk media sosial dalam hitungan detik dengan kecerdasan buatan
    </p>
  </motion.div>
);
