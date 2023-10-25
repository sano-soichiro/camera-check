import Webcam, { getScreenshot } from "react-webcam";
import React, { useEffect, useState } from 'react';
import './App.css';

import Dropdown from "./components/Dropdown";

function Camera() {

  // 画面最大width
  const videoWidth = window.innerWidth;

  const [cameras, setCameras] = useState([]);
  const [camera, setCamera] = useState(null);
  const [videoBtn, setVideoBtn] = useState(false);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  // 画像キャプチャ用コールバック関数
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc); 
  }, [webcamRef, setImgSrc]);

  
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(mediaDevices => {
      const devices = mediaDevices.filter(({ kind }) => kind === "videoinput");
      setCameras(devices);
      if (devices.length) {
        setCamera(devices[0]);
      }
    })
  }, [])

  return (
    <>
      <div className="bg-dark" style={{ minHeight: '100vh' }}>
        <div className="p-5">
          <Dropdown
            className="mb-2"
            variant="success"
            title={camera ? camera?.label : 'カメラが見つかりませんでした。'}
            items={cameras?.map(_camera => {
              return {
                children: _camera?.label,
                className: _camera?.deviceId === camera?.deviceId ? 'disabled' : '',
                onClick: () => setCamera(_camera),
              };
            })}
          />
          {videoBtn ? <></>:
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: videoWidth,
              height: 480,
              deviceId: camera?.deviceId,
            }}
          />
          }
          <button onClick={() => setVideoBtn(!videoBtn)}>ボタン</button>
          <div className="design">モザイク</div>
          <button onClick={capture}>Capture photo</button>
          {imgSrc && (
            <img
              src={imgSrc}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Camera;