import { Brain, Zap, Target } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      <div className="mb-6">
        <h1 className="text-5xl font-bold mb-4">
          Basketball Shot{' '}
          <span className="hero-gradient">
            Classification
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Upload basketball game images and get instant AI-powered predictions for shot types.
          Our model identifies Layups, Jump Shots, and Dunks with confidence scores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="prediction-card text-center">
          <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
          <p className="text-sm text-muted-foreground">
            ResNet50 deep learning model fine-tuned on basketball imagery
          </p>
        </div>

        <div className="prediction-card text-center">
          <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Instant Predictions</h3>
          <p className="text-sm text-muted-foreground">
            Get results in seconds with confidence scores for each shot type
          </p>
        </div>

        <div className="prediction-card text-center">
          <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">3 Shot Types</h3>
          <p className="text-sm text-muted-foreground">
            Identifies Layups, Jump Shots, and Dunks with high accuracy
          </p>
        </div>
      </div>
    </div>
  );
};