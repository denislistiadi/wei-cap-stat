import { motion } from 'motion/react';
import { Loader2, Palette, Sparkles } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export const ConfigurationCard = ({
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
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-pink-500" />
          <span>Konfigurasi Caption</span>
        </CardTitle>
        <CardDescription>Sesuaikan dengan kebutuhan dan gaya Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Deskripsi Momen Anda
            </Label>
            <Textarea
              id="description"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Contoh: Liburan di pantai bersama keluarga, makan malam romantis, acara ulang tahun teman..."
              className="mt-2 min-h-[150px] text-base p-4 rounded-xl border border-gray-200 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-purple-500"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Jelaskan momen atau foto Anda secara detail untuk hasil terbaik
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={generateCaptions}
              disabled={isLoading}
              className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-lg font-medium shadow-lg"
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
