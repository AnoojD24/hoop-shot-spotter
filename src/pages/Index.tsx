import { useState } from 'react';
import { Activity, Target, Zap } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { ImageUpload } from '@/components/ImageUpload';
import { PredictionDisplay, type Prediction } from '@/components/PredictionDisplay';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock prediction function (replace with actual API call later)
  const generateMockPredictions = (): Prediction[] => {
    const shotTypes: Array<{ type: 'Layup' | 'Jump Shot' | 'Dunk', icon: React.ReactNode, description: string }> = [
      { 
        type: 'Jump Shot', 
        icon: <Target className="h-6 w-6 text-primary" />,
        description: 'Mid-range or three-point shot with feet off ground'
      },
      { 
        type: 'Layup', 
        icon: <Activity className="h-6 w-6 text-primary" />,
        description: 'Close-range shot near the basket'
      },
      { 
        type: 'Dunk', 
        icon: <Zap className="h-6 w-6 text-primary" />,
        description: 'Forceful shot where ball is slammed into basket'
      }
    ];

    // Generate random but realistic confidence scores
    const shuffled = [...shotTypes].sort(() => Math.random() - 0.5);
    const confidences = [
      75 + Math.random() * 20,  // Top prediction: 75-95%
      20 + Math.random() * 30,  // Second: 20-50%
      5 + Math.random() * 15    // Third: 5-20%
    ];

    return shuffled.map((shot, index) => ({
      shotType: shot.type,
      confidence: Math.round(confidences[index] * 10) / 10,
      icon: shot.icon,
      description: shot.description
    })).sort((a, b) => b.confidence - a.confidence);
  };

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
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPredictions = generateMockPredictions();
    setPredictions(mockPredictions);
    setIsLoading(false);
    
    toast.success(`Shot classified as ${mockPredictions[0].shotType}!`);
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
