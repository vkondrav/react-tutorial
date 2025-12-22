// @ts-nocheck
interface HoverBind {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const [isHovered, bind]: [boolean, HoverBind] = useHover();
<div {...bind} className={isHovered ? 'active' : ''}>
  {isHovered ? 'Hovering!' : 'Hover me'}
</div>;
