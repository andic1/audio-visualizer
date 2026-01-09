import { useMemo, type HTMLAttributes } from "react";
import {
  AUDIO_SOURCE,
  getPlatformSupportedAudioSources,
  type TAudioSource,
} from "@/components/audio/sourceControls/common";
import { FileUploadControls } from "@/components/controls/audioSource/fileUpload";
import { useAppStateActions, useAudio } from "@/lib/appState";
import { cn } from "@/lib/utils";

const AudioSourceLabel = (_audioSource: TAudioSource) => {
  return "本地上传";
};

export const AudioSourceSelect = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { source: activeSource } = useAudio();
  const { setAudio } = useAppStateActions();
  const available = useMemo(() => {
    return getPlatformSupportedAudioSources();
  }, []);

  return (
    <div
      className={cn("w-full space-y-2", className)}
      {...props}
    >
      {available.map((source) => (
        <button
          key={`single_source_${source}`}
          className={cn(
            "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10",
            activeSource === source ? "ring-1 ring-sky-400" : "",
          )}
          onClick={() => setAudio({ source })}
        >
          <div className="flex items-center justify-between">
            <div className="font-semibold">{AudioSourceLabel(source)}</div>
            <div className="text-xs text-white/50">{source}</div>
          </div>
          <div className="mt-1 text-xs text-white/60">
            上传 mp3/wav/mp4，使用其中音轨驱动可视化
          </div>
        </button>
      ))}
    </div>
  );
};

export const AudioSourceControls = () => {
  const { source } = useAudio();
  switch (source) {
    case AUDIO_SOURCE.FILE_UPLOAD:
      return <FileUploadControls />;
    default:
      return source satisfies never;
  }
};
