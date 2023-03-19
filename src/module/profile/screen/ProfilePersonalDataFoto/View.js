import axios from 'axios';
import Webcam from 'react-webcam';
import Icon from 'react-icons-kit';
import { Image } from 'next-images';
import { useRouter } from 'next/router';
import { x, chevronRight } from 'react-icons-kit/feather';
import { useEffect, useRef, useState, useCallback } from 'react';
import { trans } from '@cp-util/trans';
import { PenEdit } from '@cp-config/Svgs';
import { deletePhoto, ShieldBig } from '@cp-config/Images';
import { Button, Modal } from '@cp-component';
import { BASE_URL, NAVIGATION, API } from '@cp-util/constant';
import locale from './locale';
import {
  IconCamera,
  IconTrash,
  IconPicture,
  IconProfileActive,
} from '@cp-config/Images';

import { api } from '@cp-bootstrap/bootstrapApi';

import {
  SET_DELETE_FOTO_PROFILE_SUCCESS,
  SET_UPLOAD_PROFILE_SUCCESS,
} from '@cp-module/profile/profileConstant';
import { useSelector } from 'react-redux';
import clsx from 'classnames';

export default function Page(props) {
  const {
    data,
    lang,
    token,
    alreadyKyc,
    setUploadProfile,
    setDeleteFotoProfile,
    setUploadProfileSuccess,
    setUploadProfileClear,
    getPersonalData,
  } = props;

  const router = useRouter();
  const uploadFile = useRef(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalDeletePhoto, setModalDeletePhoto] = useState(false);
  const [isModalUploadActive, setModalUploadActive] = useState(false);
  const [isModalCameraActive, setModalCameraActive] = useState(false);
  const translate = (val) => trans(locale, lang, val);
  const [photoProfile, setPhotoProfile] = useState('');
  const { userData } = useSelector((state) => state?.auth);

  const thumbnailPhotoKey = () => {
    return userData?.thumbnailPhotoKey || '';
  };

  useEffect(() => {
    getPersonalData();
  }, [thumbnailPhotoKey()]);

  useEffect(() => {
    if (userData.thumbnailPhotoKey) {
      api
        .get(
          `${BASE_URL}${API.USER.photoThumbnail}/${userData?.thumbnailPhotoKey}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          },
        )
        .then((res) => {
          const img = new File([res.data], 'photoProfile');

          setPhotoProfile(URL.createObjectURL(img));
        });
    }
  }, [userData.thumbnailPhotoKey]);

  useEffect(() => {
    if (setUploadProfileSuccess?.message === 'SUCCESS') {
      setModalSuccess(true);
    }
  }, [setUploadProfileSuccess]);

  const handleDeleteFotoProfile = async () => {
    if (data?.thumbnailPhotoKey && data?.thumbnailPhotoKey !== '') {
      await setDeleteFotoProfile({
        photoKey: data?.photoKey,
      });
    }
  };

  const renderModalUpload = () => {
    const onFileChange = async (e) => {
      e.preventDefault();
      setUploadProfileClear();
      await setUploadProfile(e.target.files[0]);
      setModalUploadActive(false);
    };

    return (
      <Modal isOpen={isModalUploadActive} size="md" className="">
        <div className="flex pl-3 pb-6 items-center">
          <Icon
            icon={x}
            size={20}
            className="cursor-pointer"
            onClick={() => setModalUploadActive(false)}
          />
          <p className="text-sm font-bold pl-4 mt-1">{translate('ubahFoto')}</p>
        </div>

        <div className="w-full flex flex-col divide-y rounded-2xl bg-white">
          <div className="relative px-3 rounded-sm hover:bg-red-light-red20/10">
            <input
              ref={uploadFile}
              className="absolute cursor-pointer opacity-0 w-full h-full"
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={onFileChange}
            />
            <div
              role="button"
              onClick={() => uploadFile.current.click()}
              className="py-5 flex items-center justify-between">
              <div className="flex items-center">
                <img src={IconPicture} className="w-6 mr-4" />
                <p className="text-sm font-bold">{translate('ambilGaleri')}</p>
              </div>
              <Icon icon={chevronRight} size={20} className="text-gray-300" />
            </div>
          </div>

          <div
            role="button"
            onClick={() => setModalCameraActive(true)}
            className="py-5 px-3 flex items-center justify-between rounded-sm hover:bg-red-light-red20/10">
            <div className="flex items-center">
              <img src={IconCamera} className="w-6 mr-4" />
              <p className="text-sm font-bold">{translate('ambilKamera')}</p>
            </div>
            <Icon icon={chevronRight} size={20} className="text-gray-300" />
          </div>

          {userData?.thumbnailPhotoKey && (
            <div
              role="button"
              onClick={() => setModalDeletePhoto(true)}
              className="py-5 px-3 flex items-center rounded-sm hover:bg-red-light-red20/10">
              <img src={IconTrash} className="w-6 mr-4" />
              <p className="text-sm font-bold">{translate('hapusFoto')}</p>
            </div>
          )}
        </div>
      </Modal>
    );
  };

  const webcamComponent = () => {
    if (!isModalCameraActive) return null;

    const videoConstraints = {
      facingMode: 'user',
    };

    return (
      <Modal
        isOpen={isModalCameraActive}
        toggle={() => {
          setModalCameraActive(false);
          setModalUploadActive(false);
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
                onButtonClick={async () => {
                  const imageSrc = getScreenshot();
                  const blob = await fetch(imageSrc).then((res) => res.blob());
                  await setUploadProfile(blob, null, blob.type);
                  setModalCameraActive(false);
                  setModalUploadActive(false);
                }}
                full>
                {trans(locale, lang, 'capturePhoto')}
              </Button>
            )}
          </Webcam>
        </div>
      </Modal>
    );
  };

  const renderModalSuccess = () => {
    return (
      <Modal isOpen={modalSuccess} size="md">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3 max-w-xs">
            {translate('titleSukses')}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setModalSuccess(false);
              setUploadProfileClear();
            }}>
            OK!
          </Button>
        </div>
      </Modal>
    );
  };

  const renderModalDeletePhoto = () => {
    return (
      <Modal isOpen={modalDeletePhoto} size="md">
        <div className="relative p-3">
          <img
            src={deletePhoto}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3 max-w-xs">
            {translate('titleHapusPhotoSukses')}
          </p>
          <Button
            className="mt-8"
            bordered
            outline
            full
            onButtonClick={() => {
              setModalDeletePhoto(false);
            }}>
            {translate('kembali')}
          </Button>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={async () => {
              await handleDeleteFotoProfile();
              await setModalDeletePhoto(false);
              setModalUploadActive(false);
            }}>
            {translate('hapus')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <>
      {renderModalUpload()}
      {webcamComponent()}
      {renderModalSuccess()}
      {renderModalDeletePhoto()}

      <div className="w-full flex pb-4 justify-center">
        <div className="relative w-20 md:w-24 h-20 md:h-24">
          <div
            className={clsx(
              'w-full h-full rounded-full overflow-hidden border-gray-50 border-4 grid place-items-center',
              userData?.thumbnailPhotoKey ? '' : 'bg-red-100',
            )}>
            <img
              src={
                userData?.thumbnailPhotoKey ? photoProfile : IconProfileActive
              }
              alt="profile"
              className={
                userData?.thumbnailPhotoKey ? 'w-full h-full object-cover' : ''
              }
            />
          </div>

          <div className="absolute bottom-0 -right-4">
            <img
              src={PenEdit}
              className="cursor-pointer opacity-40 duration-300 hover:opacity-100"
              onClick={() => setModalUploadActive(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
