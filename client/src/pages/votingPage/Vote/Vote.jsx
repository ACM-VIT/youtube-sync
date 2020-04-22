/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';

import './Vote.css';

const voNumber = {
  color: 'white',
  fontFamily: '"Staatliches", cursive',
  fontSize: '3rem',
  width: 'auto',
  height: '70%',
  marginTop: '1.15rem',
  marginRight: '3rem',
  right: 0,
  position: 'absolute',
};
const resultStyle = {
  position: 'absolute',
  top: '15%',
  left: '1%',
  width: '97%',
  height: '70%',
};

const selectionStyle = {
  color: 'white',
  fontSize: '1rem',
  position: 'absolute',
  left: '2%',
  top: '10%',
  fontFamily: 'Times New Roman MS',
};

function Vote({ urls }) {
  const [voteNumber, setvoteNumber] = useState(1);
  const result = useRef();
  let container;

  useEffect(() => {
    container = result.current;
  });


  function parseURL(url) {
  // - Supported YouTube URL formats:
  //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
  //   - http://youtu.be/My2FRPA3Gf8
  //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
  //   - https://m.youtube.com/watch?v=My2FRPA3Gf8
  // - Supported Vimeo URL formats:
  //   - http://vimeo.com/25451551
  //   - http://player.vimeo.com/video/25451551
  // - Also supports relative URLs:
  //   - //player.vimeo.com/video/25451551

    url.match(/(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    if (RegExp.$3.indexOf('youtu') > -1) {
      var type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
      var type = 'vimeo';
    }

    return {
      type,
      id: RegExp.$6,
    };
  }

  const appendThumb = (function (url) {
    const videoDetails = parseURL(url);
    const videoType = videoDetails.type;
    const videoID = videoDetails.id;
    var thumbSRC;
    var thumbIMG;
    var thumbLINK;

    if (videoType === 'youtube') {
      thumbSRC = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
    } else if (videoType === 'vimeo') {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://vimeo.com/api/v2/video/${videoID}.json`, true);
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = xhr.responseText;
            const parsedData = JSON.parse(data);
            var thumbSRClarge = parsedData[0].thumbnail_large;
            // split url of large thumbnail at 640
            var thumbSplit = thumbSRClarge.split(/\d{3}(?=.jpg)/);
            // add 1280x720 to parts and get bigger thumbnail
            /*  thumbSRC = `${thumbSplit[0]}1280x720${thumbSplit[1]}`; */
            thumbSRC = `${thumbSplit[0]}1280x720${thumbSplit[1]}`;
            thumbIMG.src = thumbSRC;
            thumbLINK.href = thumbSRC;
          } else {
            console.error(xhr.statusText);
          }
        }
      };
      xhr.onerror = function () {
        console.error(xhr.statusText);
      };
      xhr.send(null);
    }

    // Clear content of container
    container.style.background = `url(${thumbSRC})`;
    container.style.backgroundSize = 'cover';


    /*  // Set image
    if ((videoType === 'youtube') || (videoType === 'vimeo')) {
      thumbIMG = document.createElement('img');
      if (videoType === 'youtube') {
        thumbIMG.src = thumbSRC;
      }
      thumbIMG.alt = 'Thumbnail of Video';
    }


    // Append link containing image to the container
    if ((videoType === 'youtube') || (videoType === 'vimeo')) {
      container.appendChild(thumbIMG);
    } */
  });

  useEffect(() => appendThumb(urls[voteNumber - 1].url), [voteNumber]);


  return (
    <>
      <span style={selectionStyle}>Mark as Selection</span>
      <div className="result" ref={result} style={resultStyle} />
      <div className="voteControls">
        <button className="btn-c" type="submit" onClick={() => (voteNumber !== 1 ? setvoteNumber((vn) => vn - 1) : null)}>

          <span className="material-icons">
            keyboard_arrow_left
          </span>

        </button>
        <button className="btn-c secondBtnStyle" type="submit" onClick={() => (voteNumber !== urls.length && urls.length !== 0 ? setvoteNumber((vn) => vn + 1) : null)}>

          <span className="material-icons">
            keyboard_arrow_right
          </span>

        </button>
        <div className="voteDash" />
        <div className="voNumber" style={voNumber}>
          {
            (voteNumber % 10 === voteNumber)
              ? `0${voteNumber.toString()}`
              : voteNumber.toString()
          }
        </div>
      </div>
    </>
  );
}

export default Vote;
