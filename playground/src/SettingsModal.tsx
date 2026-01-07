import { useState, useRef, useEffect } from 'react';
import { HiOutlineCog, HiOutlineX, HiOutlineCursorClick } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import {
  type AppSettings,
  EditorType,
  saveSettings,
  getLessonSourceLink,
  EDITOR_CURSOR,
  EDITOR_VSCODE,
  EDITOR_GITHUB,
} from './settings';

interface SettingsModalProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  /** Optional custom class for the trigger button */
  buttonClassName?: string;
  /** Optional label to show next to the icon */
  buttonLabel?: string;
}

export default function SettingsModal({
  settings,
  onSave,
  buttonClassName,
  buttonLabel,
}: SettingsModalProps): React.ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  // Sync local state when settings prop changes
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleSave = () => {
    onSave(localSettings);
    saveSettings(localSettings);
    closeModal();
  };

  const handleCancel = () => {
    setLocalSettings(settings); // Reset to original
    closeModal();
  };

  const editorOptions: { value: EditorType; label: string; icon: React.ReactNode }[] = [
    {
      value: EditorType.CURSOR,
      label: EDITOR_CURSOR.name,
      icon: <HiOutlineCursorClick size={18} />,
    },
    { value: EditorType.VSCODE, label: EDITOR_VSCODE.name, icon: <VscVscode size={20} /> },
    { value: EditorType.GITHUB, label: EDITOR_GITHUB.name, icon: <FaGithub size={18} /> },
  ];

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={openModal}
        className={buttonClassName || 'btn btn-ghost btn-sm btn-square tooltip tooltip-bottom'}
        data-tip={buttonLabel ? undefined : 'Settings'}
      >
        <HiOutlineCog size={buttonLabel ? 22 : 20} />
        {buttonLabel && <span>{buttonLabel}</span>}
      </button>

      {/* Settings Modal */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <HiOutlineCog size={22} />
              Settings
            </h3>
            <button onClick={handleCancel} className="btn btn-ghost btn-sm btn-square">
              <HiOutlineX size={20} />
            </button>
          </div>

          {/* Editor Selection */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">View Source opens in</span>
            </label>
            <div className="flex gap-2">
              {editorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLocalSettings((s) => ({ ...s, editor: option.value }))}
                  className={`btn flex-1 gap-2 ${
                    localSettings.editor === option.value ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Path (for Cursor/VSCode) */}
          {(localSettings.editor === 'cursor' || localSettings.editor === 'vscode') && (
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Local Project Path</span>
                <span className="label-text-alt text-base-content/50">
                  Path to src/lessons folder
                </span>
              </label>
              <input
                type="text"
                value={localSettings.projectPath}
                onChange={(e) => setLocalSettings((s) => ({ ...s, projectPath: e.target.value }))}
                className="input input-bordered w-full font-mono text-sm"
                placeholder="/path/to/playground/src/lessons"
              />
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Example: /Users/you/react-tutorial/playground/src/lessons
                </span>
              </label>
            </div>
          )}

          {/* Preview */}
          <div className="bg-base-200 rounded-lg p-4 mb-6">
            <div className="text-xs text-base-content/50 mb-2">
              Preview: View Source link for Lesson 1.1
            </div>
            <code className="text-xs break-all text-primary">
              {getLessonSourceLink('react-1.1', localSettings)}
            </code>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button onClick={handleCancel} className="btn btn-ghost">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save Settings
            </button>
          </div>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCancel}>close</button>
        </form>
      </dialog>
    </>
  );
}
