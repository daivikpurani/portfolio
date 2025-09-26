import { useState, useEffect, useCallback, useMemo } from 'react';

// Custom hook for performance optimization
export const usePerformanceOptimization = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const throttle = useCallback((func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func.apply(null, args);
      }
    };
  }, []);

  const memoizedValue = useMemo(() => {
    return {
      isVisible,
      isLoaded,
      debounce,
      throttle
    };
  }, [isVisible, isLoaded, debounce, throttle]);

  return memoizedValue;
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [ref, options]);

  return [setRef, isIntersecting];
};

// Image lazy loading hook
export const useLazyImage = (src) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      setIsError(true);
    };
    img.src = src;
  }, [src]);

  return { imageSrc, isLoaded, isError };
};

// Local storage hook with performance optimization
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            setMetrics(prev => ({
              ...prev,
              [entry.name]: entry.duration
            }));
          }
        });
      });

      observer.observe({ entryTypes: ['measure'] });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const measurePerformance = useCallback((name, fn) => {
    if ('performance' in window) {
      performance.mark(`${name}-start`);
      const result = fn();
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      return result;
    }
    return fn();
  }, []);

  return { metrics, measurePerformance };
};

export default usePerformanceOptimization;
