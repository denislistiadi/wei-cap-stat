'use client';

import { motion } from 'motion/react';
import { User, Wand2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur-md w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
          <Wand2 className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          WeiAI
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Button className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </motion.nav>
  );
}
