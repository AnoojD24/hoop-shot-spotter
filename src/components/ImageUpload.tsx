import { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClearImage: () => void;
}

export const ImageUpload = ({ onImageSelect, selectedImage, onClearImage }: ImageUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (selectedImage) {
    return (
      <div className="relative">
        <div className="prediction-card">
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected basketball image"
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onClearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Selected: {selectedImage.name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`upload-zone ${dragOver ? 'dragover' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-full">
          {dragOver ? (
            <Camera className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-primary" />
          )}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">
            Upload Basketball Image
          </h3>
          <p className="text-muted-foreground mb-4">
            Drop your basketball game image here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports JPG, PNG, WebP files
          </p>
        </div>
      </div>
    </div>
  );
};