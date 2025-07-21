import { useState, useEffect } from 'preact/compat';
import { cn } from '../../lib/utils';

interface ClientOnlySplineProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

function SplineLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-muted rounded-lg">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-muted-foreground">加载 3D 场景中...</p>
      </div>
    </div>
  );
}

export function ClientOnlySpline({
  scene,
  className,
  fallback,
  onLoad,
  onError
}: ClientOnlySplineProps) {
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // 动态导入 Spline 组件，仅在客户端执行
    import('@splinetool/react-spline')
      .then((module) => {
        setSplineComponent(() => module.default);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load Spline component:', error);
        setLoadError(error.message);
        setIsLoading(false);
        onError?.(error);
      });
  }, [onError]);

  const handleLoad = () => {
    console.log('Spline scene loaded successfully');
    onLoad?.();
  };

  const handleSplineError = (error: Error) => {
    console.error('Spline scene failed to load:', error);
    setLoadError(error.message);
    onError?.(error);
  };

  if (isLoading) {
    return (
      <div className={cn("w-full h-full min-h-[400px]", className)}>
        {fallback || <SplineLoader />}
      </div>
    );
  }

  if (loadError || !SplineComponent) {
    return (
      <div className={cn("w-full h-full min-h-[400px]", className)}>
        <div className="flex items-center justify-center w-full h-full bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="text-center p-4">
            <p className="text-destructive font-medium">3D 场景加载失败</p>
            {loadError && <p className="text-sm text-muted-foreground mt-1">{loadError}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full min-h-[400px]", className)}>
      <SplineComponent
        scene={scene}
        onLoad={handleLoad}
        onError={handleSplineError}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
