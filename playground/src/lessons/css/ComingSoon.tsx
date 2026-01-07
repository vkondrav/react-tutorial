import { DiCss3 } from 'react-icons/di';
import { HiOutlineClock, HiOutlineSparkles } from 'react-icons/hi';

interface ComingSoonProps {
  lessonId: string;
  title: string;
  module: number;
  moduleTitle: string;
}

export default function ComingSoon({
  lessonId,
  title,
  module,
  moduleTitle,
}: ComingSoonProps): React.ReactElement {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#264de4]/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#264de4]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 max-w-xl text-center">
        {/* Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-[#264de4]/20 to-[#2965f1]/20 flex items-center justify-center border border-[#264de4]/30">
            <DiCss3 className="text-[#264de4]" size={64} />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center border border-warning/30">
            <HiOutlineClock className="text-warning" size={24} />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-base-200 text-base-content/70 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-base-content/10">
          <HiOutlineSparkles className="text-warning" size={16} />
          Module {module}: {moduleTitle}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-base-content">
          <span className="text-[#264de4]">{lessonId}</span> {title}
        </h1>

        {/* Message */}
        <p className="text-xl text-base-content/60 mb-8 leading-relaxed">
          This lesson is coming soon! We're crafting interactive demos and comprehensive content to
          help you master CSS.
        </p>

        {/* Progress indicator */}
        <div className="bg-base-200 rounded-xl p-6 border border-base-content/10">
          <div className="flex items-center justify-center gap-4 text-base-content/50 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
              <span>In Development</span>
            </div>
          </div>
        </div>

        {/* Decorative CSS code */}
        <div className="mt-12 opacity-20 font-mono text-xs text-base-content/50">
          <pre className="text-left inline-block">
            {`.${lessonId.replace('.', '-')} {
  status: coming-soon;
  excitement: 100%;
  content: "${title}";
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
