import React from 'react';
import {
  LoaderContainer,
  LoaderContent,
  Logo,
  Tagline,
  SpinnerContainer,
  Spinner,
  ProgressSection,
  ProgressBarContainer,
  ProgressBar,
  ProgressText,
  LoadingText
} from '../styles/components/InitialLoaderStyles';

interface InitialLoaderProps {
  progress: number;
}

const InitialLoader: React.FC<InitialLoaderProps> = ({ progress }) => {
  const isComplete = progress >= 100;

  // Dynamic loading messages based on progress
  const getLoadingMessage = () => {
    if (progress < 20) return 'Initializing C++ learning platform...';
    if (progress < 40) return 'Loading courses and educational materials...';
    if (progress < 60) return 'Preparing interactive programming environment...';
    if (progress < 80) return 'Setting up your personalized workspace...';
    if (progress < 95) return 'Optimizing video content for learning...';
    return 'Almost ready! Starting your C++ journey...';
  };

  return (
    <LoaderContainer $isComplete={isComplete}>
      <LoaderContent>
        <Logo>C++ LEARNING</Logo>
        <Tagline>Master Programming Excellence</Tagline>
        
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        
        <ProgressSection>
          <ProgressBarContainer>
            <ProgressBar $progress={progress} />
          </ProgressBarContainer>
          <ProgressText>{Math.round(progress)}%</ProgressText>
        </ProgressSection>
        
        <LoadingText>
          {getLoadingMessage()}
        </LoadingText>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default InitialLoader;