import Webcam from 'react-webcam';
const WebcamComponent = ({
  audio = false,
  screenshotFormat = "image/jpeg",
  videoConstraints = {
    facingMode : 'environtment'
  },
  children
}) => {
  

  return (
    <Webcam
      audio={audio}
      screenshotFormat={screenshotFormat}
      videoConstraints={videoConstraints}>
        {children}
      </Webcam>
  );
};

export default WebcamComponent;
