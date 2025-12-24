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
  const folder = lessonId.replace('.', '_');

  switch (settings.editor) {
    case EditorType.CURSOR:
      return `${EDITOR_CURSOR.prefix}${settings.projectPath}/playground/src/lessons/${folder}/index.tsx`;
    case EditorType.VSCODE:
      return `${EDITOR_VSCODE.prefix}${settings.projectPath}/playground/src/lessons/${folder}/index.tsx`;
    default:
      return `${EDITOR_GITHUB.prefix}/lessons/${folder}/index.tsx`;
  }
};
