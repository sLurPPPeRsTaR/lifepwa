import { Button, Modal } from '@cp-component';
import { UploadMainPic } from '@cp-config/Images';
import { UploadGallery, UploadPicture } from '@cp-config/Svgs';
import React, { memo, useRef } from 'react';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/feather';
import Webcam from 'react-webcam';

function ModalUploadDoc(props) {
  const {
    lang,
    isOpen,
    setClose,
    isCameraOpen,
    setCamera,
    onTakePhoto,
    onFileChange,
  } = props;
  const uploadFile = useRef(null);

  function renderWebcamComponent() {
    if (!isCameraOpen) return null;

    const videoConstraints = {
      facingMode: 'environment',
    };

    return (
      <Modal
        isOpen={true}
        toggle={() => {
          setCamera(isCameraOpen);
          setClose(isOpen);
        }}>
        <div className="mb-2">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}>
            {({ getScreenshot }) => (
              <Button
                type="linear-gradient"
                className="mt-6"
                onButtonClick={() => {
                  onTakePhoto({ getScreenshot });
                }}
                full>
                {lang === 'id' ? 'Ambil Foto' : 'Take Photo'}
              </Button>
            )}
          </Webcam>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        className="relative max-w-[375px]"
        isOpen={isOpen}
        toggle={() => setClose(isOpen)}>
        <div className="flex flex-1 justify-center">
          <img src={UploadMainPic} alt="" className="absolute bottom-[80%]" />
          <p className="pt-16 pb-4 font-bold text-lg leading-7 tracking-wider">
            {lang === 'id' ? 'Unggah File' : 'Upload File'}
          </p>
        </div>
        <div className="w-full flex flex-col divide-y-2 rounded-2xl bg-white mb-6">
          <div className="file-upload-container">
            <input
              ref={uploadFile}
              className="absolute -z-10 opacity-0"
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={onFileChange}
            />
            <div
              role="button"
              onClick={() => setCamera(isCameraOpen)}
              className="px-4 py-3 flex justify-between items-center">
              <img className="mr-2" src={UploadPicture} alt="" />
              <div className="flex flex-1 text-neutral-light-neutral90 font-medium">
                {lang === 'id' ? 'Unggah Gambar' : 'Upload Picture'}
              </div>
              <Icon
                icon={chevronDown}
                size={18}
                className="rotate-90 transform -scale-100 text-primary-dark-primary90"
              />
            </div>
          </div>
          <div
            role="button"
            onClick={() => uploadFile.current.click()}
            className="px-4 py-3 flex justify-between items-center">
            <img className="mr-1" src={UploadGallery} alt="" />
            <div className="flex flex-1 text-neutral-light-neutral90 font-medium">
              {lang === 'id' ? 'Unggah Dokumen' : 'Upload Document'}
            </div>
            <Icon
              icon={chevronDown}
              size={18}
              className="rotate-90 transform -scale-100 text-primary-dark-primary90"
            />
          </div>
        </div>
        <div className=" pb-3 pt-10">
          <Button
            onButtonClick={() => setClose(isOpen)}
            type="linear-gradient"
            full>
            {lang === 'id' ? 'kembali' : 'kembali'}
          </Button>
        </div>
      </Modal>
      {renderWebcamComponent()}
    </>
  );
}

export default memo(ModalUploadDoc);
