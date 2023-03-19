import { Button } from '@cp-component';
import clsx from 'classnames';
import { LooperGroup2, PaperUpload } from '@cp-config/Svgs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { WarningUpload } from '@cp-config/Images';
import { getPartialUploadDocumentApi } from '@cp-module/claimpolis/claimpolisApi';
import { useSelector } from 'react-redux';

function UploadList(props) {
  const {
    lang,
    data,
    onReupload,
    onDelete,
    onUpload,
    onPreview,
    indexList,
    indexDocCategory,
  } = props;
  const [imageFile, setImageFile] = useState();
  const token = useSelector((state) => state.auth.token.access_token);

  useEffect(() => {
    if (data?.documentKey !== null) {
      getPartialUploadDocumentApi({
        documentKey: data?.documentKey,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      })
        .then((res) => {
          setImageFile(res?.data);
        })
        .catch((e) => {});
    }
  }, [data, token]);

  function renderPhotoAndButton() {
    if (data?.photo) {
      if (data?.size >= 5) {
        return (
          <Image
            src={WarningUpload}
            width={65}
            height={65}
            alt=""
            objectFit="fill"
          />
        );
      }
      return (
        <div
          role="button"
          className="z-1"
          onClick={() => {
            onPreview({ uri: imageFile, fileType: data?.fileType });
          }}>
          {data?.fileType?.split('.').pop() === 'pdf' ? (
            <div className="relative p-9">
              <embed
                src={imageFile}
                className="absolute top-0 bottom-0 right-0  rounded-2xl  w-[65px] h-[65px] "
              />
              <div
                onClick={() => {
                  onPreview({ uri: imageFile });
                }}
                className="absolute z-[20] top-0 right-0 bg-transparent w-[65px] h-[65px]"
              />
            </div>
          ) : (
            <>
              {imageFile && (
                <Image
                  className="rounded-2xl"
                  src={URL.createObjectURL(imageFile)}
                  width={65}
                  height={65}
                  alt=""
                  objectFit="fill"
                />
              )}
            </>
          )}
        </div>
      );
    }
    return (
      <Button
        className="w-28"
        type="linear-gradient"
        onButtonClick={() => {
          onUpload({
            indexList: indexList,
            dataList: data,
            indexDocCategory: indexDocCategory,
          });
        }}>
        <div className="flex flex-row flex-1 px-8 justify-center items-center">
          <p className="flex flex-1 mx-1 font-semibold text-sm leading-6 tracking-wider flex-shrink">
            {lang === 'id' ? 'Unggah' : 'Upload'}{' '}
          </p>
          <img className="mx-auto" src={PaperUpload} alt="" />
        </div>
      </Button>
    );
  }

  function renderNegativeCaseText() {
    if (data?.size >= 5) {
      return (
        <p className="font-medium text-xs leading-4 text-[#C33025] py-3">
          {lang === 'id'
            ? 'Pastikan Dokumen/Foto yang diunggah harus dibawah 5MB dan terlihat jelas'
            : 'Pastikan Dokumen/Foto yang diunggah harus dibawah 5MB dan terlihat jelas'}
        </p>
      );
    }
    return null;
  }

  function renderUploadDeleteButton() {
    if (data?.photo) {
      return (
        <div className="flex flex-1 flex-row pb-4">
          <Button
            className="w-[155px] mr-2"
            type="linear-gradient"
            onButtonClick={() => {
              onReupload({ indexList: indexList, dataList: data });
            }}>
            <div className="flex flex-row justify-center items-center">
              <p className="mr-2 font-semibold text-sm leading-6 tracking-wider">
                {lang === 'id' ? 'Unggah Ulang' : 'Reupload'}{' '}
              </p>
              <img className="mx-auto" src={PaperUpload} alt="" />
            </div>
          </Button>
          <Button
            outline
            className="w-28"
            type="bg-light"
            onButtonClick={() => {
              onDelete({
                indexList: indexList,
                indexDocCategory: indexDocCategory,
              });
            }}>
            <div className="flex flex-row flex-1 px-8 justify-center items-center">
              <p className="flex flex-1 mx-1 font-semibold text-sm leading-6 tracking-wider flex-shrink">
                {lang === 'id' ? 'Hapus' : 'Delete'}
              </p>
            </div>
          </Button>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <div
        className={clsx(
          'relative shadow-sm rounded-2xl flex flex-row items-center justify-between overflow-hidden pr-4 py-2 mb-2 ',
          data?.size >= 5 && 'border border-[#C33025]',
        )}>
        <img className="absolute top-1" src={LooperGroup2} alt="" />
        <p className="pl-3 text-gray-500 font-medium text-sm leading-5 tracking-wider">
          {data?.description}
        </p>
        {renderPhotoAndButton()}
      </div>
      {renderNegativeCaseText()}
      {renderUploadDeleteButton()}
    </>
  );
}

export default UploadList;
