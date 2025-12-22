// @ts-nocheck
function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  // ... event listeners
  return isOnline;
}

const isOnline: boolean = useOnlineStatus();
return isOnline ? <App /> : <OfflineMessage />;
