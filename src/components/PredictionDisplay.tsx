import { useEffect, useState } from 'react';
import { TrendingUp, Target, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export interface Prediction {
  shotType: 'Layup' | 'Jump Shot' | 'Dunk';
  confidence: number;
  icon: React.ReactNode;
  description: string;
}

interface PredictionDisplayProps {
  predictions: Prediction[];
  isLoading: boolean;
}

export const PredictionDisplay = ({ predictions, isLoading }: PredictionDisplayProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (predictions.length > 0 && !isLoading) {
      setAnimate(true);
    }
  }, [predictions, isLoading]);

  if (isLoading) {
    return (
      <div className="prediction-card">
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Analyzing shot type...</p>
          </div>
        </div>
      </div>
    );
  }

  if (predictions.length === 0) {
    return null;
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'bg-confidence-high';
    if (confidence >= 40) return 'bg-confidence-medium';
    return 'bg-confidence-low';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 70) return 'High Confidence';
    if (confidence >= 40) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const topPrediction = predictions[0];

  return (
    <div className={`prediction-card ${animate ? 'animate-in' : ''}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Shot Classification Result
        </h3>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            {topPrediction.icon}
          </div>
          <div>
            <h4 className="text-2xl font-bold hero-gradient">
              {topPrediction.shotType}
            </h4>
            <p className="text-sm text-muted-foreground">
              {topPrediction.description}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Confidence</span>
            <span className="text-sm text-muted-foreground">
              {getConfidenceLabel(topPrediction.confidence)}
            </span>
          </div>
          <div className="space-y-1">
            <Progress 
              value={topPrediction.confidence} 
              className="h-3"
            />
            <div className="text-right">
              <span className="text-lg font-bold text-primary">
                {topPrediction.confidence.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h5 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          All Predictions
        </h5>
        
        {predictions.map((prediction, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                {prediction.icon}
              </div>
              <span className="font-medium">{prediction.shotType}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${getConfidenceColor(prediction.confidence)}`}
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
              <span className="text-sm font-medium min-w-[3rem] text-right">
                {prediction.confidence.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};