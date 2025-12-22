import { HiCheck, HiX } from 'react-icons/hi';

interface CodeBlockProps {
  title: string;
  code: string;
  variant: 'good' | 'bad';
}

export default function CodeBlock({ title, code, variant }: CodeBlockProps): React.ReactElement {
  const isGood = variant === 'good';
  const borderColor = isGood ? 'border-success' : 'border-error';
  const bgColor = isGood ? 'bg-success/20' : 'bg-error/20';
  const textColor = isGood ? 'text-success' : 'text-error';
  const Icon = isGood ? HiCheck : HiX;

  return (
    <div className={`bg-base-100 rounded-xl overflow-hidden border ${borderColor}/50`}>
      <div
        className={`px-4 py-2 ${bgColor} border-b ${borderColor}/50 text-xs font-semibold ${textColor} flex items-center gap-2`}
      >
        <Icon size={16} />
        {title}
      </div>
      <pre className="m-0 p-4 text-xs leading-relaxed text-base-content/80 overflow-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
