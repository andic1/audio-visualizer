import { useEffect, useState } from "react";

const STORAGE_KEY = "soundlab_help_seen_v1";

export const HelpModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!open) return null;

  return (
    <div className="pointer-events-auto fixed inset-0 z-[110] flex items-center justify-center bg-black/65 backdrop-blur-sm">
      <div className="w-[92%] max-w-3xl rounded-2xl border border-white/10 bg-black/65 p-6 text-white shadow-[0_40px_140px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-white/60">交互式音频可视化实验室</div>
            <div className="mt-1 text-lg font-semibold">使用说明（30 秒上手）</div>
          </div>
          <button
            className="text-white/70 hover:text-white"
            onClick={close}
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold mb-2">1) 导入文件</div>
            <div className="text-sm text-white/75 leading-relaxed">
              打开页面后会弹出导入窗口。
              <br />
              选择 <span className="font-semibold">mp4 / mp3 / wav</span> 后，系统会读取音轨驱动可视化。
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold mb-2">2) 开始播放</div>
            <div className="text-sm text-white/75 leading-relaxed">
              如果浏览器阻止自动播放，左上角会出现 <span className="font-semibold">“点击开始播放”</span>。
              <br />
              点击一次即可解锁音频。
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold mb-2">3) 切换实验模式</div>
            <div className="text-sm text-white/75 leading-relaxed">
              底部可切换：
              <br />
              <span className="font-semibold">经典可视化 / 节奏诊断 / 情绪光场</span>
              <br />
              左上 HUD 会显示当前模式与能量条。
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold mb-2">4) 调整外观</div>
            <div className="text-sm text-white/75 leading-relaxed">
              右下角设置面板可以调整：调色盘、彩色背景、自动环绕镜头等。
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            className="rounded-lg bg-sky-500 px-5 py-2 text-sm font-semibold text-black hover:bg-sky-400"
            onClick={close}
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
