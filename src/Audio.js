import React, { useEffect } from 'react';
import Bar from './Bar';

import useAudioPlayer from './useAudioPlayer';

function Audio(props) {
  const { curTime, duration, setPlaying, setClickedTime } = useAudioPlayer();

  useEffect(() => {
    setPlaying(props.callBackplaying);
  });
  const song =
    'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3';
  return (
    <div className="player">
      <audio id="audio">
        <source src={song} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className="controls">
        <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => setClickedTime(time)}
        />
      </div>
    </div>
  );
}

export default Audio;
