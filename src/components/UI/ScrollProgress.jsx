import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollTotal > 0) {
        setScrollPercentage((window.scrollY / scrollTotal) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="scroll-progress"
      className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-accent-green via-accent-yellow to-accent-green z-[9999] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(123,192,67,0.8)]"
      style={{ width: `${scrollPercentage}%` }}
    />
  );
}
