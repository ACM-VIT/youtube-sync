/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';


const VideoPlayer = (url) => {
  let player;
  const [playing, handlePlay] = useState(false);

  const play = () => {
    console.log('onPlay');
    handlePlay(true);
  };

  const pause = () => {
    console.log('onPause');
    handlePlay(false);
  };
  const ref = (pl) => {
    player = pl;
  };

  useEffect(() => {
    console.log(player.getCurrentTime());
  });
  return (
    <>
      <ReactPlayer
        ref={ref}
        url={url || null}
        width="100%"
        height="100%"
        onPlay={play}
        onPause={pause}
      />
    </>
  );
};

export default VideoPlayer;
