import { useState, useEffect } from "preact/compat";
import { cn } from "../../lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  const [isClient, setIsClient] = useState(false);
  const [MotionDiv, setMotionDiv] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);

    // 动态导入 framer-motion 以避免 SSR 问题
    import("framer-motion").then((module) => {
      setMotionDiv(() => module.motion.div);
    }).catch((error) => {
      console.error('Failed to load framer-motion:', error);
    });
  }, []);

  // 在服务器端或组件未加载时显示静态版本
  if (!isClient || !MotionDiv) {
    return (
      <div
        className={cn(
          "bg-card text-card-foreground rounded-lg border shadow-sm p-6",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "bg-card text-card-foreground rounded-lg border shadow-sm p-6",
        className
      )}
    >
      {children}
    </MotionDiv>
  );
}
