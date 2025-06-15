
import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CoverImageUploadProps {
  imageUrl: string | null;
  onImageChange: (url: string | null) => void;
}

const CoverImageUpload = ({ imageUrl, onImageChange }: CoverImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    onImageChange(null);
  };

  return (
    <div className="space-y-3">
      <label className="text-womb-softwhite text-sm md:text-base font-medium">
        Cover Image (Optional)
      </label>
      
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Cover"
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragging 
              ? 'border-womb-crimson bg-womb-crimson/10' 
              : 'border-womb-deepgrey hover:border-womb-warmgrey'
            }
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-womb-deepgrey rounded-full flex items-center justify-center">
              <Image className="h-6 w-6 text-womb-warmgrey" />
            </div>
            <div>
              <p className="text-womb-softwhite font-medium">
                Drop an image here or click to upload
              </p>
              <p className="text-womb-warmgrey text-sm">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
    </div>
  );
};

export default CoverImageUpload;
