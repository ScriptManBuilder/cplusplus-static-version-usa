import { useState, useEffect } from 'react';

/**
 * Hook для управления начальной загрузкой сайта
 * Показывает лоадер на 10 секунд для лучшей прогрузки видео
 */
export const useInitialLoader = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Проверяем, был ли сайт уже загружен в этой сессии
    const hasLoaded = sessionStorage.getItem('cppCoursesInitiallyLoaded');
    
    if (hasLoaded === 'true') {
      setIsInitialLoading(false);
      setLoadingProgress(100);
      return;
    }

    const startTime = Date.now();
    const loadingDuration = 10000; // 10 секунд
    let isFinished = false;

    // Плавное увеличение прогресса
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const elapsed = Date.now() - startTime;
        const targetProgress = Math.min((elapsed / loadingDuration) * 100, 100);
        
        // Плавное движение к цели
        const diff = targetProgress - prev;
        const increment = Math.max(diff * 0.1, 0.5); // Минимум 0.5% за раз
        
        return Math.min(prev + increment, 100);
      });
    }, 50); // Обновляем каждые 50мс для плавности

    // Функция проверки готовности ресурсов
    const checkResourcesLoaded = () => {
      // Проверяем готовность DOM
      if (document.readyState !== 'complete') {
        return false;
      }

      // Проверяем все изображения
      const images = Array.from(document.querySelectorAll('img'));
      const allImagesLoaded = images.length === 0 || images.every(img => {
        if (img.complete && img.naturalHeight !== 0) return true;
        if (img.src.includes('data:') || img.src.includes('blob:')) return true;
        return false;
      });
      
      // Проверяем все видео (особенно важно для главной страницы)
      const videos = Array.from(document.querySelectorAll('video'));
      const allVideosReady = videos.length === 0 || videos.every(video => {
        // Проверяем что видео готово к воспроизведению
        return video.readyState >= 3; // HAVE_FUTURE_DATA или больше
      });

      // Проверяем критически важные элементы интерфейса
      const criticalElements = document.querySelectorAll('main, header, [data-testid], .hero-section');
      const elementsReady = criticalElements.length > 0;

      return allImagesLoaded && allVideosReady && elementsReady;
    };

    // Таймер завершения через 10 секунд
    const finishTimer = setTimeout(() => {
      if (!isFinished) {
        isFinished = true;
        finishLoading();
      }
    }, loadingDuration);

    // Проверяем готовность ресурсов каждые 500мс после 7 секунд
    let checkInterval: NodeJS.Timeout;
    
    const startChecking = setTimeout(() => {
      checkInterval = setInterval(() => {
        if (!isFinished && checkResourcesLoaded()) {
          isFinished = true;
          finishLoading();
        }
      }, 500);
    }, 7000); // Начинаем проверять через 7 секунд

    function finishLoading() {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
      clearTimeout(finishTimer);
      clearTimeout(startChecking);
      
      // Доводим прогресс до 100%
      setLoadingProgress(100);
      
      // Небольшая задержка для анимации завершения
      setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem('cppCoursesInitiallyLoaded', 'true');
        
        // Добавляем класс для анимаций
        document.body.classList.add('initial-load-complete');
        
        // Запускаем предзагрузку видео если они есть
        const videos = document.querySelectorAll('video[data-preload]');
        videos.forEach(video => {
          (video as HTMLVideoElement).load();
        });
      }, 800);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
      clearTimeout(finishTimer);
      clearTimeout(startChecking);
    };
  }, []);

  return { isInitialLoading, loadingProgress };
};