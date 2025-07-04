import { motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import type { CaptionItemProps } from '@/types/types';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const CaptionItem = ({ caption, index, isCopied, onCopy }: CaptionItemProps) => (
  <motion.div variants={itemVariants} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a2e] overflow-hidden">
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <p className="text-base md:text-lg p-4 pr-2">{caption.text}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCopy(caption.text, index)}
            className="m-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Salin caption"
          >
            {isCopied === index ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
