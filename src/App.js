import React, { useState, useEffect } from 'react';
import Audio from './Audio';
import './style.scss';
const btnval = [
  {
    icon: 'https://raw.githubusercontent.com/abbehki/images/main/Group.svg',
    action: 'shuffle1',
  },
  {
    icon: 'https://raw.githubusercontent.com/abbehki/images/main/Group%20(1).svg',
    action: 'shuffle2',
  },
  {
    icon: 'https://raw.githubusercontent.com/abbehki/images/ea498da4b1750fcdc5251abc2818016b7c3f748d/Group%2029.svg',
    action: 'previous',
  },
  {
    icon: 'https://img.icons8.com/material-outlined/192/000000/play--v2.png',
    action: 'play',
  },
  {
    icon: 'https://raw.githubusercontent.com/abbehki/images/main/Group%204.svg',
    action: 'pause',
  },
  {
    icon: 'https://raw.githubusercontent.com/abbehki/images/main/Group%2030.svg',
    action: 'next',
  },
  {
    icon: 'https://raw.githubusercontent.com/abbehki/images/main/Group%20(2).svg',
    action: 'shuffle3',
  },
  {
    icon: 'https://raw.githubusercontent.com/abbehki/images/main/Vector.svg',
    action: 'settings',
  },
];

export default function App() {
  const [playing, setplaying] = useState(true);
  const [audiobtn, setaudiobtn] = useState(btnval);
  const [toast, setToast] = useState(false);
  const [openplay, setopenplay] = useState(false);

  const handleAudioBtns = (action, e) => {
    switch (action) {
      case 'play':
        setplaying(true);
        break;
      case 'pause':
        setplaying(false);
        break;
      default:
        console.log(e);
        e.stopPropagation();
        setToast(true);
        setTimeout(function () {
          setToast(false);
        }, 3000);
      // code block
    }
  };
  function onClickBox() {
    setopenplay(!openplay);
  }
  return (
    <>
      {toast && <div className="snackbar">Update to Premium!!</div>}
      <div
        style={!openplay ? { justifyContent: 'center' } : null}
        className="container"
      >
        <div className="box" onClick={onClickBox}>
          <div className="img"></div>
          <div className="detail-info">
            <div className="now-playing-txt">Now playing</div>
            <div className="artist">
              <div className="one-text">Purple haze</div>
              <div className="two-text">Hurricanes</div>
              <div className="three-text">Jojo</div>
            </div>
            <div className="buttons">
              <button>
                <img
                  src="https://raw.githubusercontent.com/abbehki/images/main/Vector%20(3).svg"
                  onClick={handleAudioBtns.bind(this, 'like')}
                />
              </button>
              <button>
                <img
                  src="https://raw.githubusercontent.com/abbehki/images/main/Vector%20(2).svg"
                  onClick={handleAudioBtns.bind(this, 'like')}
                />
              </button>
              <button>
                <img
                  src="https://raw.githubusercontent.com/abbehki/images/main/Vector%20(1).svg"
                  onClick={handleAudioBtns.bind(this, 'like')}
                />
              </button>
            </div>
          </div>
        </div>
        {openplay && (
          <div className="side-container">
            <div className="actionbtns">
              {audiobtn.map((item) => {
                if (item.action !== 'play' && playing) {
                  return (
                    <img
                      src={item.icon}
                      onClick={handleAudioBtns.bind(this, item.action)}
                    />
                  );
                } else if (item.action !== 'pause' && !playing) {
                  return (
                    <img
                      src={item.icon}
                      style={
                        item.action === 'play'
                          ? {
                              height: 146,
                            }
                          : null
                      }
                      onClick={handleAudioBtns.bind(this, item.action)}
                    />
                  );
                }
              })}
            </div>
            <Audio callBackplaying={playing} />
          </div>
        )}
      </div>
    </>
  );
}
