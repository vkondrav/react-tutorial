// ============================================
// Composition Playground
// Build flexible components using composition
// ============================================

import { useState, ReactNode } from 'react';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhotograph,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineHeart,
  HiOutlineChatAlt,
  HiOutlineShare,
  HiOutlineClock,
  HiOutlineTag,
} from 'react-icons/hi';

// ============================================
// COMPOSABLE BUILDING BLOCKS
// ============================================

// ---- Base Card Component ----
interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-base-200 rounded-lg border border-base-300 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

// ---- Card Sub-components ----
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-4 py-3 border-b border-base-300 bg-base-300/50 ${className}`}>
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-4 py-3 border-t border-base-300 bg-base-300/30 ${className}`}>
      {children}
    </div>
  );
}

// ---- Avatar Component ----
interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return src ? (
    <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />
  ) : (
    <div
      className={`${sizes[size]} rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold`}
    >
      {initials}
    </div>
  );
}

// ---- Badge Component ----
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'badge',
    primary: 'badge badge-primary',
    secondary: 'badge badge-secondary',
    success: 'badge badge-success',
    warning: 'badge badge-warning',
    error: 'badge badge-error',
  };

  return <span className={variants[variant]}>{children}</span>;
}

// ---- Icon Button Component ----
interface IconButtonProps {
  icon: ReactNode;
  label: string;
  count?: number;
  onClick?: () => void;
  active?: boolean;
}

function IconButton({ icon, label, count, onClick, active = false }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
        active ? 'text-primary bg-primary/10' : 'text-base-content/60 hover:bg-base-300'
      }`}
      title={label}
    >
      {icon}
      {count !== undefined && <span className="text-xs">{count}</span>}
    </button>
  );
}

// ============================================
// COMPOSED COMPONENTS (built from blocks)
// ============================================

// ---- User Card (uses Card + Avatar) ----
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

function UserCard({ name, email, avatar, role, onEdit, onDelete }: UserCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start gap-3">
          <Avatar name={name} src={avatar} size="lg" />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">{name}</h4>
            <p className="text-sm text-base-content/60 truncate flex items-center gap-1">
              <HiOutlineMail size={14} /> {email}
            </p>
            {role && <Badge variant="primary">{role}</Badge>}
          </div>
        </div>
      </CardBody>
      {(onEdit || onDelete) && (
        <CardFooter className="flex justify-end gap-2">
          {onEdit && (
            <button onClick={onEdit} className="btn btn-xs btn-ghost">
              <HiOutlinePencil size={14} /> Edit
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="btn btn-xs btn-ghost text-error">
              <HiOutlineTrash size={14} /> Delete
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

// ---- Post Card (uses all building blocks) ----
interface PostCardProps {
  author: { name: string; avatar?: string };
  timestamp: string;
  content: string;
  image?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

function PostCard({
  author,
  timestamp,
  content,
  image,
  tags = [],
  likes = 0,
  comments = 0,
  isLiked = false,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar name={author.name} src={author.avatar} />
          <div>
            <h4 className="font-semibold text-sm">{author.name}</h4>
            <p className="text-xs text-base-content/50 flex items-center gap-1">
              <HiOutlineClock size={12} /> {timestamp}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-3">
        <p className="text-sm">{content}</p>
        {image && (
          <div className="rounded-lg overflow-hidden bg-base-300">
            <img src={image} alt="" className="w-full h-40 object-cover" />
          </div>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-primary flex items-center gap-0.5">
                <HiOutlineTag size={10} />#{tag}
              </span>
            ))}
          </div>
        )}
      </CardBody>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <IconButton
            icon={<HiOutlineHeart size={18} />}
            label="Like"
            count={likes}
            active={isLiked}
            onClick={onLike}
          />
          <IconButton
            icon={<HiOutlineChatAlt size={18} />}
            label="Comment"
            count={comments}
            onClick={onComment}
          />
        </div>
        <IconButton icon={<HiOutlineShare size={18} />} label="Share" onClick={onShare} />
      </CardFooter>
    </Card>
  );
}

// ---- Stat Card (simple composition) ----
interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: { value: number; isUp: boolean };
}

function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            {icon}
          </div>
          <div>
            <p className="text-xs text-base-content/60">{label}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
          {trend && (
            <div className={`ml-auto text-xs ${trend.isUp ? 'text-success' : 'text-error'}`}>
              {trend.isUp ? '↑' : '↓'} {trend.value}%
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

// ============================================
// PLAYGROUND
// ============================================

export default function CompositionPlayground() {
  // State for interactive elements
  const [postLiked, setPostLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(42);

  const handleLike = () => {
    setPostLiked(!postLiked);
    setPostLikes((prev) => (postLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Building Blocks */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          Building Blocks
          <Badge variant="secondary">Composable</Badge>
        </h4>
        <p className="text-sm text-base-content/70 mb-4">
          These are the primitive components. Like LEGO pieces, they can be combined in different
          ways.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Avatar name="John Doe" size="lg" />
            </div>
            <code className="text-xs">Avatar</code>
          </div>
          <div className="text-center">
            <div className="flex justify-center gap-1 mb-2">
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
            </div>
            <code className="text-xs">Badge</code>
          </div>
          <div className="text-center">
            <div className="flex justify-center gap-1 mb-2">
              <IconButton icon={<HiOutlineHeart size={18} />} label="Like" count={5} />
              <IconButton icon={<HiOutlineChatAlt size={18} />} label="Comment" />
            </div>
            <code className="text-xs">IconButton</code>
          </div>
          <div className="text-center">
            <Card className="p-2">
              <span className="text-xs">Content</span>
            </Card>
            <code className="text-xs mt-2 block">Card</code>
          </div>
        </div>
      </div>

      {/* Composed Components */}
      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          Composed Components
          <Badge variant="success">Built from blocks</Badge>
        </h4>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <StatCard
            icon={<HiOutlineUser size={20} />}
            label="Total Users"
            value="1,234"
            trend={{ value: 12, isUp: true }}
          />
          <StatCard
            icon={<HiOutlinePhotograph size={20} />}
            label="Posts Today"
            value="89"
            trend={{ value: 5, isUp: false }}
          />
          <StatCard
            icon={<HiOutlineHeart size={20} />}
            label="Engagement"
            value="94%"
            trend={{ value: 3, isUp: true }}
          />
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserCard
            name="Sarah Johnson"
            email="sarah@example.com"
            role="Admin"
            onEdit={() => alert('Edit Sarah')}
            onDelete={() => alert('Delete Sarah')}
          />
          <UserCard
            name="Mike Wilson"
            email="mike@example.com"
            avatar="https://i.pravatar.cc/150?img=12"
            role="Developer"
          />
        </div>

        {/* Post Card */}
        <PostCard
          author={{ name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?img=68' }}
          timestamp="2 hours ago"
          content="Just finished building a component library using composition patterns! 🎉 It's amazing how flexible React components become when you think in terms of building blocks rather than monolithic structures."
          image="https://picsum.photos/seed/react/600/300"
          tags={['react', 'composition', 'typescript']}
          likes={postLikes}
          comments={12}
          isLiked={postLiked}
          onLike={handleLike}
          onComment={() => alert('Open comments')}
          onShare={() => alert('Share post')}
        />
      </div>

      {/* The Power of Composition */}
      <div className="card bg-primary/10 border border-primary p-4">
        <h4 className="font-semibold text-primary mb-2">The Power of Composition</h4>
        <ul className="text-sm space-y-1 text-base-content/80">
          <li>
            • <strong>Card</strong> + <strong>CardHeader/Body/Footer</strong> = flexible layouts
          </li>
          <li>
            • <strong>Avatar</strong> + <strong>Badge</strong> = user displays
          </li>
          <li>
            • <strong>IconButton</strong> = reusable actions
          </li>
          <li>
            • Combine them all → <strong>UserCard</strong>, <strong>PostCard</strong>,{' '}
            <strong>StatCard</strong>
          </li>
          <li>• Each composed component is still customizable via props!</li>
        </ul>
      </div>
    </div>
  );
}
