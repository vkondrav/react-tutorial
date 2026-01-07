// @ts-nocheck
// Progress bar
function ProgressBar({ progress }) {
  return (
    <div
      className="w-full h-2 bg-base-300 
      rounded-full overflow-hidden"
    >
      <div
        className="h-full bg-primary 
          transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
