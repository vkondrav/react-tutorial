interface LessonHeaderProps {
  module: string;
  lesson: string;
  title: string;
}

export default function LessonHeader({
  module,
  lesson,
  title,
}: LessonHeaderProps): React.ReactElement {
  return (
    <div className="mb-12">
      <div className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
        Module {module} · Lesson {lesson}
      </div>
      <h1 className="text-4xl font-bold m-0 bg-linear-to-r from-base-content to-base-content/60 bg-clip-text text-transparent">
        {title}
      </h1>
    </div>
  );
}
