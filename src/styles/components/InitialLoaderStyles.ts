import styled, { keyframes } from 'styled-components';

// Анимации для лоадера
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const slideIn = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width);
  }
`;

// Контейнер лоадера
export const LoaderContainer = styled.div<{ $isComplete: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: ${props => props.$isComplete ? '0' : '1'};
  visibility: ${props => props.$isComplete ? 'hidden' : 'visible'};
  transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
  animation: ${props => props.$isComplete ? fadeOut : fadeIn} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(155, 89, 182, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 60% 20%, rgba(46, 204, 113, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

// Контент лоадера
export const LoaderContent = styled.div`
  text-align: center;
  color: white;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  z-index: 1;
`;

// Логотип
export const Logo = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #3498db, #e74c3c, #f39c12);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${pulse} 2s ease-in-out infinite;
  letter-spacing: 3px;
  text-shadow: 0 0 30px rgba(52, 152, 219, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

// Подзаголовок
export const Tagline = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 3rem 0;
  color: #bdc3c7;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
`;

// Контейнер спиннера
export const SpinnerContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Спиннер
export const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #3498db;
  border-right: 4px solid #e74c3c;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-top: 2px solid #f39c12;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${spin} 1s linear infinite reverse;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

// Секция прогресса
export const ProgressSection = styled.div`
  margin: 3rem 0 2rem 0;
  width: 350px;
  
  @media (max-width: 480px) {
    width: 280px;
  }
`;

// Контейнер прогресс-бара
export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 100%);
    animation: ${slideIn} 2s ease-in-out infinite;
  }
`;

// Прогресс-бар
export const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #3498db 0%, #e74c3c 50%, #f39c12 100%);
  border-radius: 20px;
  transition: width 0.3s ease;
  width: ${props => props.$progress}%;
  position: relative;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.4);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
    border-radius: 0 20px 20px 0;
  }
`;

// Текст прогресса
export const ProgressText = styled.div`
  color: #ecf0f1;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: 1px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Текст загрузки
export const LoadingText = styled.div`
  color: #bdc3c7;
  font-size: 1rem;
  font-weight: 400;
  margin-top: 1.5rem;
  letter-spacing: 0.5px;
  line-height: 1.4;
  opacity: 0.8;
  min-height: 1.4em;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-top: 1rem;
  }
`;