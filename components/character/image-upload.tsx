'use client';

import { cn } from '@/lib/utils';
import { User, Upload, X, Maximize2 } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  imageUrl?: string;
  characterName: string;
  editable?: boolean;
  onImageChange?: (imageUrl: string | undefined) => void;
}

export function ImageUpload({
  imageUrl,
  characterName,
  editable = false,
  onImageChange,
}: ImageUploadProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const handleRemoveImage = useCallback(() => {
    if (onImageChange) {
      onImageChange(undefined);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageChange]);

  return (
    <>
      {/* Main Avatar */}
      <div className="relative group">
        <div
          className={cn(
            'w-24 h-24 md:w-32 md:h-32 flex-shrink-0',
            'bg-tertiary rounded-xl',
            'border-4 border-foreground',
            'shadow-[4px_4px_0_0_#2f2f2e]',
            'flex items-center justify-center',
            'overflow-hidden',
            imageUrl && 'cursor-pointer'
          )}
          onClick={() => imageUrl && setIsFullscreen(true)}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={characterName}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 md:w-16 md:h-16 text-foreground/50" />
          )}
        </div>

        {/* Overlay buttons */}
        {editable && (
          <div className={cn(
            'absolute inset-0 flex items-center justify-center gap-2',
            'bg-foreground/50 rounded-xl opacity-0 group-hover:opacity-100',
            'transition-opacity duration-200'
          )}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'p-2 rounded-lg',
                'bg-card text-foreground',
                'border-2 border-foreground',
                'hover:bg-muted transition-colors'
              )}
              aria-label="Upload imagem"
            >
              <Upload className="w-5 h-5" />
            </button>
            {imageUrl && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className={cn(
                  'p-2 rounded-lg',
                  'bg-primary text-primary-foreground',
                  'border-2 border-foreground',
                  'hover:bg-primary/80 transition-colors'
                )}
                aria-label="Remover imagem"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Fullscreen button when not editing */}
        {!editable && imageUrl && (
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className={cn(
              'absolute bottom-1 right-1 p-1 rounded',
              'bg-foreground/70 text-card',
              'opacity-0 group-hover:opacity-100',
              'transition-opacity duration-200'
            )}
            aria-label="Ver em tela cheia"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className={cn(
              'absolute top-4 right-4 p-2 rounded-lg',
              'bg-card text-foreground',
              'border-2 border-foreground',
              'hover:bg-muted transition-colors'
            )}
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img
            src={imageUrl}
            alt={characterName}
            className="max-w-full max-h-full object-contain rounded-lg border-4 border-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
