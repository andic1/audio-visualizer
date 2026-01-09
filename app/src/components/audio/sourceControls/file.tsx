import { useCallback, useEffect, useMemo, useState } from "react";
import {
  iOS,
  type AudioSourceControlsProps,
} from "@/components/audio/sourceControls/common";

import "@/components/audio/sourceControls/overlay.css";

const useAudioFile = (audio: HTMLAudioElement, audioFile: File | null) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const playAudio = useCallback(() => {
    if (!audioFile) {
      return;
    }
    // Force audible output
    audio.muted = false;
    audio.volume = 1.0;

    // Can play immediately on non-ios platforms
    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          console.log(`Playing audiofile`);
          setAutoplayBlocked(false);
          setLastError(null);
        })
        .catch((error) => {
          // Auto-play was prevented
          console.error(`Error playing audiofile`, error);
          setAutoplayBlocked(true);
          setIsPlaying(false);
          setLastError(
            error?.name === "NotAllowedError"
              ? "浏览器阻止了自动播放，请点击“开始播放”。"
              : "播放失败，请换一个文件或刷新页面重试。",
          );
        });
    }
  }, [audio, audioFile]);

  /**
   * Make sure the correct file is playing
   */
  useEffect(() => {
    console.log("Syncing, start w/ pause...");
    audio.pause();
    setIsPlaying(false);
    setLastError(null);

    if (!audioFile) {
      setLoaded(false);
      return;
    }

    console.log("Setting source...");
    audio.src = URL.createObjectURL(audioFile);
    audio.preload = "auto";
    audio.loop = true;
    audio.muted = false;
    audio.volume = 1.0;
    audio.load();
    setLoaded(true);
    setAutoplayBlocked(false);

    // Try autoplay once, but always keep a manual Play gate visible if needed
    playAudio();

    const onEnded = () => {
      // loop=true should normally prevent ended, but keep state safe.
      setIsPlaying(false);
    };
    const onError = () => {
      setIsPlaying(false);
      setLastError("音频解码失败：请确认文件包含音轨（mp4/mp3/wav）并尝试更换文件。");
    };
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      console.log("Pausing...");
      audio.pause();
      setIsPlaying(false);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [audio, audioFile, playAudio]);

  return {
    loaded,
    isPlaying,
    playAudio,
    autoplayBlocked,
    lastError,
  };
};
const FileAudioControls = ({
  audio,
  file,
}: AudioSourceControlsProps & { file: File | null }) => {
  const { loaded, isPlaying, playAudio, autoplayBlocked, lastError } =
    useAudioFile(audio, file);

  const fileName = useMemo(() => file?.name ?? "未选择", [file]);

  // Browsers may block autoplay even after file import. Provide a 1-click gate.
  // Reuse existing overlay.css positioning styles.
  return (
    <div
      id="info"
      style={{
        top: "1rem",
        left: "1rem",
      }}
      hidden={false}
    >
      {loaded ? (
        <>
          <h2 className="mb-1">音频已导入</h2>
          <p className="mb-2 text-sm">文件：{fileName}</p>
          {lastError && (
            <p className="mb-2 text-sm text-red-200">{lastError}</p>
          )}
          {!isPlaying && (
            <button disabled={!loaded} onClick={playAudio}>
              {autoplayBlocked || iOS() ? "点击开始播放" : "重新播放"}
            </button>
          )}
          {isPlaying && (
            <p className="text-sm">正在播放…（可视化已开始响应）</p>
          )}
        </>
      ) : (
        <>
          <h2>请选择音频文件</h2>
          <p>请在导入弹窗或右侧控制面板中上传本地 mp3/wav/mp4 文件。</p>
        </>
      )}
    </div>
  );
};

export default FileAudioControls;
