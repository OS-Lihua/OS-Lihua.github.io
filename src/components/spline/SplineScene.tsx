import { Suspense, useState, useEffect } from 'preact/compat';
import { cn } from '../../lib/utils';

interface SplineSceneProps {
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

function SplineError({ error }: { error?: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-destructive/10 border border-destructive/20 rounded-lg">
      <div className="text-center p-4">
        <p className="text-destructive font-medium">3D 场景加载失败</p>
        {error && <p className="text-sm text-muted-foreground mt-1">{error}</p>}
      </div>
    </div>
  );
}

// 导出 SplineError 以避免未使用的警告
export { SplineError };

export function SplineScene({
  scene,
  className,
  fallback,
  onLoad,
  onError
}: SplineSceneProps) {
  const [isClient, setIsClient] = useState(false);
  const [SplineComponent, setSplineComponent] = useState<any>(null);

  useEffect(() => {
    // 确保只在客户端加载 Spline 组件
    setIsClient(true);

    // 动态导入 Spline 组件以避免 SSR 问题
    import('@splinetool/react-spline').then((module) => {
      setSplineComponent(() => module.default);
    }).catch((error) => {
      console.error('Failed to load Spline component:', error);
      onError?.(error);
    });
  }, [onError]);

  const handleLoad = () => {
    console.log('Spline scene loaded successfully');
    onLoad?.();
  };

  const handleError = (error: Error) => {
    console.error('Spline scene failed to load:', error);
    onError?.(error);
  };

  // 在服务器端或组件未加载时显示 fallback
  if (!isClient || !SplineComponent) {
    return (
      <div className={cn("w-full h-full min-h-[400px]", className)}>
        {fallback || <SplineLoader />}
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full min-h-[400px]", className)}>
      <Suspense fallback={fallback || <SplineLoader />}>
        <SplineComponent
          scene={scene}
          onLoad={handleLoad}
          onError={handleError}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
}

// 预设的 Spline 场景组件
export function SplineHero({ className }: { className?: string }) {
  return (
    <SplineScene
      scene="https://prod.spline.design/your-scene-url-here"
      className={cn("h-[600px]", className)}
      fallback={
        <div className="flex items-center justify-center h-[600px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
          <p className="text-muted-foreground">请替换为您的 Spline 场景 URL</p>
        </div>
      }
    />
  );
}
