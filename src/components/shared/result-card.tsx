import { motion, AnimatePresence } from 'motion/react';
import { Smartphone } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { EmptyState } from './empty-state';
import { LoadingState } from './loading-state';
import { CaptionItem } from './caption-item';
import type { Caption } from '@/types/types';

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

export const ResultsCard = ({
  captions,
  isLoading,
  isCopied,
  handleCopy,
}: {
  captions: Caption[];
  isLoading: boolean;
  isCopied: number | null;
  handleCopy: (text: string, index: number) => void;
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
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-full text-sm">
              {captions.length} hasil
            </span>
          )}
        </div>
        <CardDescription>Salin caption favorit Anda ke media sosial</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {captions.length === 0 && !isLoading && <EmptyState />}
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
