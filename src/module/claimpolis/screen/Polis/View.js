import {
    Container,
    Button,
    Input,
} from '@cp-component';
import {
    ProgressSubmission,
    Header,
} from '@cp-module/claimpolis/components'
import {
    trans,
} from '@cp-util/trans';
import locale from './locale';
import {
    PapanKertas,
    Dokumen,
    Folder,
} from '@cp-config/Images';
import classNames from 'classnames';
import {
    useEffect,
    useState,
} from 'react';
import {
    useRouter,
} from 'next/router';
import {
    NAVIGATION
} from '@cp-util/constant';
import {
    GET_POLICY_DIGITAL_FAILED,
} from '@cp-module/claimpolis/claimpolisConstant';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_red.css';
import 'flatpickr/dist/l10n/id.js';

export default function Page({
    lang,
    getPolicyDigital,
    getPolicyDigitalResponse,
    getPolicyDigitalSuccess,
    getPolicyDigitalFetch,
    getPolicyDigitalFetchStatus,
    setPolicyNumber,
    getPolicyDigitalClear,
    claimpolisAction,
}) {
    const router = useRouter()
    const [nik, setNik] = useState('')
    const [dob, setDob] = useState('')
    const [selectedPolicy, setSelectedPolicy] = useState(null)
    const [messageNotFound, setMessageNotFound] = useState('')

    const progressDataMap = [
        {
            type: "point",
            src: PapanKertas,
            title: "Pilih Polis",
            isActive: true,
        },
        {
            type: "point",
            src: Dokumen,
            title: "Data Klaim",
            isActive: false,
        },
        {
            type: "point",
            src: Folder,
            title: "Upload Dokumen",
            isActive: false,
        },
    ]

    const getPolicy = () => {
        setSelectedPolicy(null)
        getPolicyDigital({
            id: nik,
            dob: dob,
        })
    }

    const setPolicy = (data) => {
        const dataUpdate = getPolicyDigitalResponse?.map((item) => {
            if (item?.policyNo === data?.policyNo) {
                return {
                    ...item,
                    checked: true,
                }
            } else {
                return {
                    ...item,
                    checked: false,
                }
            }
        })

        getPolicyDigitalSuccess({ data: dataUpdate, status: getPolicyDigitalFetchStatus })
        setSelectedPolicy({
            ...data,
            idCard: nik,
            dob: dob,
        })
    }

    useEffect(() => {
        getPolicyDigitalClear()
    }, [])

    useEffect(() => {
        if (claimpolisAction) {
            if (claimpolisAction === GET_POLICY_DIGITAL_FAILED) {
                setMessageNotFound("Data tidak ditemukan!")
            }
        }
    }, [claimpolisAction])

    // component
    const InputRadio = ({ data, onClick }) => {
        return (
            <button
                className={classNames('rounded-xl border flex justify-between w-full text-xs font-medium p-3', { "border-[#ED1C24] bg-[#FDE8EB] text-[#ED1C24]": data?.checked })}
                onClick={onClick}
                disabled={getPolicyDigitalFetch}
            >
                <p className='my-auto'>{`${data?.policyNo} - ${data?.productName}`}</p>
                <div className='h-4 w-4 rounded-full border border-[#ED1C24] my-auto p-0.5 overflow-hidden'>
                    {
                        data?.checked ? <div className='bg-[#ED1C24] w-full h-full rounded-full'></div> : null
                    }
                </div>
            </button>
        )
    }

    const RenderPolicies = () => {
        return (
            <div>
                {
                    getPolicyDigitalResponse?.length > 0 ?
                        <div className='mt-10'>
                            <h1 className='font-bold'>{trans(locale, lang, "pilihProduk")}</h1>
                            <div className='my-4'>
                                {
                                    getPolicyDigitalResponse?.map((item, index) => {
                                        return (
                                            <div key={index} className={classNames('mb-3 last:mb-0', { "opacity-50": getPolicyDigitalFetch })}>
                                                <InputRadio data={item} onClick={() => setPolicy(item)} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : <div className='my-3 text-[#ED1C24]'>{messageNotFound}</div>

                }
            </div>
        )
    }

    return (
        <div>
            <Header />
            <Container className="relative rounded-2xl shadow-md bg-white" noBackground>
                <div className='px-[5%] mb-28'>
                    <div className='my-3'>
                        <ProgressSubmission endPoints={progressDataMap} />
                    </div>
                    <div className='mb-4 mt-8'>
                        <h1 className='font-bold'>{trans(locale, lang, "dataTertanggung")}</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-4'>
                        <Input className="w-full" type='number' placeholder={trans(locale, lang, "phNikTertanggung")} label={trans(locale, lang, "nikTertanggung")} handleOnChange={(value) => setNik(value)} />
                        <Input className="w-full" placeholder="DD/MM/YYYY" type='date' label={trans(locale, lang, "tanggalLahir")} handleOnChange={(value) => setDob(value)} />
                    </div>
                    <Button
                        type="linear-gradient"
                        disabled={getPolicyDigitalFetch || (!nik || !dob)}
                        full
                        onButtonClick={() => {
                            setPolicy(null)
                            getPolicy()
                        }}>{trans(locale, lang, "cek")}</Button>
                    <RenderPolicies />
                </div>
                <div className='absolute bottom-5 w-full px-[5%]'>
                    <Button
                        type="linear-gradient"
                        full
                        onButtonClick={() => {
                            setMessageNotFound('')
                            setPolicyNumber(selectedPolicy)
                            router.push(NAVIGATION.CLAIMPOLIS.document)
                        }}
                        disabled={!selectedPolicy}
                    >
                        {trans(locale, lang, "lanjutkan")}
                    </Button>
                </div>
            </Container>
        </div>
    )
}