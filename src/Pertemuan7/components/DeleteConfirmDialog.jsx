import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  title = 'Konfirmasi Penghapusan',
  description = 'Tindakan ini tidak dapat dibatalkan.',
  onConfirm,
  isDangerous = true,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex gap-3">
            {isDangerous && <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />}
            <div>
              <DialogTitle className={isDangerous ? 'text-red-600' : ''}>
                {title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="text-base">
          {description}
        </DialogDescription>

        <DialogFooter className="gap-3 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
