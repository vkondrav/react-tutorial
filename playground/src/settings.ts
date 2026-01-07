export enum EditorType {
  CURSOR = 'cursor',
  VSCODE = 'vscode',
  GITHUB = 'github',
}

export interface Editor {
  name: string;
  prefix: string;
}

export const EDITOR_CURSOR: Editor = { name: 'Cursor', prefix: 'cursor://file' };
export const EDITOR_VSCODE: Editor = { name: 'VS Code', prefix: 'vscode://file' };
export const EDITOR_GITHUB: Editor = {
  name: 'GitHub',
  prefix: 'https://github.com/vkondrav/react-tutorial/blob/main/playground/src',
};

const EDITORS: Record<EditorType, Editor> = {
  [EditorType.CURSOR]: EDITOR_CURSOR,
  [EditorType.VSCODE]: EDITOR_VSCODE,
  [EditorType.GITHUB]: EDITOR_GITHUB,
};

export const getEditor = (editorType: EditorType): Editor => EDITORS[editorType];

export interface AppSettings {
  projectPath: string;
  editor: EditorType;
}

const SETTINGS_KEY = 'react-tutorial-settings';

const DEFAULT_SETTINGS: AppSettings = {
  projectPath: '/Users/username/react-tutorial/',
  editor: EditorType.GITHUB,
};

export const loadSettings = (): AppSettings => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const getAppSourceLink = (settings: AppSettings): string => {
  switch (settings.editor) {
    case EditorType.CURSOR:
      return `${EDITOR_CURSOR.prefix}${settings.projectPath}/playground/src/App.tsx`;
    case EditorType.VSCODE:
      return `${EDITOR_VSCODE.prefix}${settings.projectPath}/playground/src/App.tsx`;
    default:
      return `${EDITOR_GITHUB.prefix}/App.tsx`;
  }
};

export const getHomepageSourceLink = (settings: AppSettings): string => {
  switch (settings.editor) {
    case EditorType.CURSOR:
      return `${EDITOR_CURSOR.prefix}${settings.projectPath}/playground/src/Homepage.tsx`;
    case EditorType.VSCODE:
      return `${EDITOR_VSCODE.prefix}${settings.projectPath}/playground/src/Homepage.tsx`;
    default:
      return `${EDITOR_GITHUB.prefix}/Homepage.tsx`;
  }
};

export const getLessonSourceLink = (lessonId: string, settings: AppSettings): string => {
  // Extract section and folder from lesson ID (e.g., "react-1.1" -> section="react", folder="1_1")
  const match = lessonId.match(/^(react|css)-(.+)$/);
  if (!match) return '';
  const [, section, lessonNum] = match;
  const folder = lessonNum.replace('.', '_');
  const path = `lessons/${section}/${folder}/index.tsx`;

  switch (settings.editor) {
    case EditorType.CURSOR:
      return `${EDITOR_CURSOR.prefix}${settings.projectPath}/playground/src/${path}`;
    case EditorType.VSCODE:
      return `${EDITOR_VSCODE.prefix}${settings.projectPath}/playground/src/${path}`;
    default:
      return `${EDITOR_GITHUB.prefix}/${path}`;
  }
};

// Storybook URL: use port 6006 locally, /storybook in production
export const getStorybookBaseUrl = (): string => {
  if (typeof window === 'undefined') return '/storybook';
  const isLocal =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isLocal ? 'http://localhost:6006' : '/storybook';
};

export const getLessonStorybookLink = (lessonId: string): string => {
  // All lesson stories use consistent title: 'Lessons/{section}/{id}/Lesson'
  // Storybook converts this to path: lessons-{section}-{id}-lesson--default
  // e.g., "react-1.1" -> "lessons-react-1-1-lesson--default"
  const idSlug = lessonId.replace('.', '-');
  const storyPath = `lessons-${idSlug}-lesson--default`;
  return `${getStorybookBaseUrl()}/?path=/story/${storyPath}`;
};
