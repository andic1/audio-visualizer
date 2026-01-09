import { useEffect, useMemo, useRef, useState } from "react";
import { AUDIO_SOURCE } from "@/components/audio/sourceControls/common";
import { useAppStateActions, useAudio } from "@/lib/appState";

export const ImportModal = () => {
  const { file } = useAudio();
  const { setAudio } = useAppStateActions();

  const [open, setOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // If user already imported a file, do not block the UI.
    if (file) setOpen(false);
  }, [file]);

  const fileName = useMemo(() => {
    return file?.name ?? "未选择";
  }, [file]);

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
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-black hover:bg-sky-400"
            onClick={() => inputRef.current?.click()}
          >
            选择文件导入
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
