import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  title = 'Success!',
  message = 'Your action was completed successfully.',
  buttonText = 'OK',
}: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className='sm:max-w-[400px] bg-background/5 border-0 backdrop-blur-2xl pt-18 pb-4 px-6 shadow-lg'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <DialogHeader className='flex flex-col items-center gap-2'>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <CheckCircle className='h-15 w-15 text-green-500' />
                </motion.div>
                <DialogTitle className='text-3xl tracking-tighter text-center font-sans mt-10'>
                  <span className='text-spektr-cyan-50 font-light'>
                    {title}
                  </span>
                </DialogTitle>
                <DialogDescription className='text-sm leading-relaxed tracking-tight text-muted-foreground text-center mb-8 font-sans max-w-xl mx-auto px-4'>
                  {message}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={onClose}
                  asChild
                  className='w-full h-12'
                  variant='secondary'
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {buttonText}
                  </motion.button>
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
