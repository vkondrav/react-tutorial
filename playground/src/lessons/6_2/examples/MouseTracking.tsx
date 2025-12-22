// @ts-nocheck
interface MouseProps {
  children: (position: { x: number; y: number }) => ReactNode;
}

function Mouse({ children }: MouseProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return <div onMouseMove={handleMouseMove}>{children(position)}</div>;
}

// Usage
<Mouse>
  {({ x, y }) => (
    <p>
      Mouse at: {x}, {y}
    </p>
  )}
</Mouse>;
