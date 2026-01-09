// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUDIO_SOURCE } from "@/components/audio/sourceControls/common";
import { useAppStateActions } from "@/lib/appState";

export const FileUploadControls = () => {
  const { setAudio } = useAppStateActions();

  return (
    <div className="space-y-2">
      <Label>选择本地音频文件（mp3/wav 等）</Label>
      <input
        id="fileUpload"
        type="file"
        accept="audio/*"
        className="w-full text-foreground"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setAudio({ source: AUDIO_SOURCE.FILE_UPLOAD, file });
        }}
      />
      <div className="text-xs text-muted-foreground">
        说明：选择文件后会自动开始播放并驱动可视化（部分浏览器可能需要你点击一次画面以解锁音频）。
      </div>
    </div>
  );
  // return (
  //   <Input
  //     id="fileUpload"
  //     type="file"
  //     accept="audio/*"
  //     className="w-64 text-foreground"
  //   />
  // );
};
