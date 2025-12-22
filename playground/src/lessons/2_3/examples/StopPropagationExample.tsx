// @ts-nocheck
function Child({ onClick }) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ← Stops event from bubbling
    onClick();
  };
  return <div onClick={handleClick}>Child</div>;
}
