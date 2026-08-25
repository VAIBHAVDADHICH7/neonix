import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <div
      id="cursor-glow"
      className="fixed w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-green/10 blur-[100px] pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden md:block"
      style={{ top: position.y, left: position.x }}
    />
  );
}
