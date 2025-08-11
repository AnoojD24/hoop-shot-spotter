import { useState } from 'react';
import { Activity, Target, Zap } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { ImageUpload } from '@/components/ImageUpload';
import { PredictionDisplay, type Prediction } from '@/components/PredictionDisplay';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const iconMap = {
  'Layup': <Activity className="h-6 w-6 text-primary" />, 
  'Jump Shot': <Target className="h-6 w-6 text-primary" />, 
  'Dunk': <Zap className="h-6 w-6 text-primary" />
};

const descriptionMap = {
  'Layup': 'Close-range shot near the basket',
  'Jump Shot': 'Mid-range or three-point shot with feet off ground',
  'Dunk': 'Forceful shot where ball is slammed into basket'
};

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setPredictions([]);
    toast.success('Image uploaded successfully!');
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPredictions([]);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Prediction failed');
      const data = await res.json();
      const preds: Prediction[] = data.predictions.map((p: any) => ({
        shotType: p.shotType as 'Layup' | 'Jump Shot' | 'Dunk',
        confidence: p.confidence,
        icon: iconMap[p.shotType as 'Layup' | 'Jump Shot' | 'Dunk'],
        description: descriptionMap[p.shotType as 'Layup' | 'Jump Shot' | 'Dunk'],
      })).sort((a: Prediction, b: Prediction) => b.confidence - a.confidence);
      setPredictions(preds);
      toast.success(`Shot classified as ${preds[0].shotType}!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to analyze image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClearImage={handleClearImage}
            />

            {selectedImage && (
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Shot Type'}
              </Button>
            )}
          </div>

          <div>
            <PredictionDisplay
              predictions={predictions}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
