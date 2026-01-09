import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AUDIO_SOURCE } from "@/components/audio/sourceControls/common";
import { useAppStateActions, useAudio } from "@/lib/appState";

export const ImportModal = () => {
  const { file } = useAudio();
  const { setAudio } = useAppStateActions();

  const [open, setOpen] = useState(true);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // If user already imported a file, do not block the UI.
    if (file) setOpen(false);
  }, [file]);

  const fileName = useMemo(() => {
    return file?.name ?? "未选择";
  }, [file]);

  const demoUrl = useMemo(() => {
    // Works with Vite base path deployments. 默认示例使用 mp3 文件。
    return new URL(`${import.meta.env.BASE_URL}demo/demo.mp3`, window.location.origin)
      .toString();
  }, []);

  const playDemo = useCallback(async () => {
    setDemoError(null);
    setDemoLoading(true);
    try {
      const res = await fetch(demoUrl);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const blob = await res.blob();
      const demoFile = new File([blob], "demo.mp3", {
        type: blob.type || "audio/mpeg",
      });
      setAudio({ source: AUDIO_SOURCE.FILE_UPLOAD, file: demoFile });
      setOpen(false);
    } catch (e) {
      console.error("Failed to load demo mp3", e);
      setDemoError(
        "示例文件加载失败：请确认已将 demo.mp3 放到 app/public/demo/demo.mp3 并重新部署。",
      );
    } finally {
      setDemoLoading(false);
    }
  }, [demoUrl, setAudio]);

  if (!open) return null;

  return (
    <div className="pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[92%] max-w-lg rounded-2xl border border-white/10 bg-black/60 p-6 text-white shadow-[0_40px_140px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-white/60">交互式音频可视化实验室</div>
            <div className="mt-1 text-lg font-semibold">导入音频 / MP4 视频</div>
          </div>
          <button
            className="text-white/70 hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-2 text-sm text-white/80">
          <div>支持文件：mp3 / wav / mp4（将读取 mp4 中的音轨）</div>
          <div className="text-xs text-white/60">
            提示：部分浏览器会阻止自动播放，导入后如没有反应，请点击一次画面或点击播放。
          </div>
          {demoError && <div className="text-xs text-red-200">{demoError}</div>}
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
          当前文件：<span className="text-white/90">{fileName}</span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="audio/*,video/mp4,video/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setAudio({ source: AUDIO_SOURCE.FILE_UPLOAD, file: f });
            if (f) setOpen(false);
          }}
        />

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            稍后再说
          </button>
          <button
            className="rounded-lg border border-white/10 bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
            disabled={demoLoading}
            onClick={playDemo}
          >
            {demoLoading ? "正在加载示例..." : "播放示例 demo"}
          </button>
          <button
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-black hover:bg-sky-400"
            onClick={() => {
              // 如果用户还没有选择文件，先友好提示可以直接体验示例。
              if (!file) {
                const useDemo = window.confirm(
                  "如果只是想快速体验，推荐先点击“播放示例 demo”。\n\n是否改为播放示例 demo？",
                );
                if (useDemo) {
                  void playDemo();
                  return;
                }
              }
              inputRef.current?.click();
            }}
          >
            选择文件导入
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
