import { useEffect, useRef } from "react";
import { type AudioSourceControlsProps } from "@/components/audio/sourceControls/common";

export interface MicrophoneAudioControlsProps extends AudioSourceControlsProps {
  onDisabled: () => void;
  onStreamCreated: (stream: MediaStream) => void;
}
const MicrophoneAudioControls = ({
  audio,
  onDisabled,
  onStreamCreated,
}: MicrophoneAudioControlsProps) => {
  const mediaStream = useRef<null | MediaStreamAudioSourceNode>(null);

  /**
   * Make sure the microphone is enabled
   */
  useEffect(() => {
    console.log("Disabling mic...");
    onDisabled();
    if (mediaStream?.current) {
      mediaStream.current = null;
    }

    console.log("Enabling mic...");
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then(onStreamCreated)
        .catch((err) => {
          console.error(err);
          alert("麦克风权限被拒绝，请在浏览器权限设置中允许麦克风访问。");
        });
    } else {
      alert("当前浏览器不支持 mediaDevices，无法使用麦克风。");
    }

    return () => {
      audio.pause();
      if (mediaStream?.current) {
        mediaStream.current = null;
      }
    };
  }, [audio, onDisabled, onStreamCreated]);

  return <></>;
};

export default MicrophoneAudioControls;
