import { HiOutlineCode } from 'react-icons/hi';
import { EditorType, getEditor, type AppSettings } from '../../settings';

type ButtonSize = 'xs' | 'sm' | 'md';

interface ViewSourceButtonProps {
  href: string;
  settings: AppSettings;
  size?: ButtonSize;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const ICON_SIZES: Record<ButtonSize, number> = {
  xs: 14,
  sm: 18,
  md: 20,
};

export default function ViewSourceButton({
  href,
  settings,
  size = 'sm',
  tooltipPosition = 'bottom',
  className = '',
}: ViewSourceButtonProps): React.ReactElement {
  const isExternal = settings.editor === EditorType.GITHUB;
  const editor = getEditor(settings.editor);
  const iconSize = ICON_SIZES[size];

  return (
    <a
      href={href}
      className={`btn btn-outline btn-${size} text-xs tooltip tooltip-${tooltipPosition} ${className}`.trim()}
      data-tip={`View Source (${editor.name})`}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <HiOutlineCode size={iconSize} />
    </a>
  );
}
