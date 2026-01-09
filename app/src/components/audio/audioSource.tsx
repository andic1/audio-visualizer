import { AUDIO_SOURCE } from "@/components/audio/sourceControls/common";
import FileAudioControls from "@/components/audio/sourceControls/file";
import { CurrentTrackPlayer } from "@/components/controls/audioSource/soundcloud/player";
import { useAudio } from "@/lib/appState";

export const ControlledAudioSource = ({
  audio,
  audioSource,
}: {
  audio: HTMLAudioElement;
  audioSource: "SOUNDCLOUD" | "FILE_UPLOAD";
}) => {
  const { file } = useAudio();
  switch (audioSource) {
    case AUDIO_SOURCE.SOUNDCLOUD:
      return <CurrentTrackPlayer audio={audio} />;
    case AUDIO_SOURCE.FILE_UPLOAD:
      return <FileAudioControls audio={audio} file={file} />;
    default:
      return audioSource satisfies never;
  }
};
export default ControlledAudioSource;
