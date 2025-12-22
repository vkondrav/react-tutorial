// @ts-nocheck
const videoRef = useRef(null);

videoRef.current.play();
videoRef.current.pause();
videoRef.current.currentTime = 0; // Seek to start
videoRef.current.muted = true;
