// @ts-nocheck
interface UseCopyReturn {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

const { copiedText, copy }: UseCopyReturn = useCopyToClipboard();
<button onClick={() => copy(text)}>{copiedText === text ? 'Copied!' : 'Copy'}</button>;
