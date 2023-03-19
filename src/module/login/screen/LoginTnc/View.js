import { trans } from '@cp-util/trans';
import { Button } from '@cp-component';
import { BtnBack } from '@cp-config/Svgs';
import locale from './locale';

export default function View({ lang, setShowTerm }) {
  return (
    <div className="w-full md:h-[70vh] bg-gray-50">
      <div className="w-full h-full">
        <div className="w-[100%] h-[10%] bg-white shadow-lg z-30 flex flex-row relative">
          <div
            role="button"
            onClick={() => setShowTerm(false)}
            className="ml-5 flex justify-center items-center">
            <img src={BtnBack} className="w-5" />
          </div>
          <div className="flex justify-center items-center mr-10 w-full text-xl font-bold">
            {trans(locale, lang, 'termsOfService')}
          </div>
        </div>
        <div className="w-full h-[70%] overflow-y-auto mb-5 bg-white grid place-items-center">
          <div id="pengantar" className="w-[90%] pb-[30px] mt-[30px]">
            <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
              PENGANTAR
            </p>
            <p className="pt-[20px] pl-[10px] text-sm opacity-70">
              Dengan mengakses halaman ini dan menggunakan Layanan, berarti Anda
              dan Perusahaan terikat dalam suatu perjanjian. Maka dari itu, Anda
              dianggap telah memahami dan menyatakan setuju untuk terikat pada
              ketentuan yang berlaku. Perusahaan mengimbau agar Anda membaca
              Syarat dan Ketentuan ini dengan saksama.
            </p>
            <p className="pt-[20px] pl-[10px] text-sm opacity-70">
              Dalam hal Anda berusia di bawah persyaratan usia minimum atau
              termasuk dalam kategori anak sesuai dengan ketentuan peraturan
              perundang-undangan yang berlaku, maka persetujuan untuk
              menggunakan Layanan harus diberikan oleh orang tua (bapak atau
              ibu) atau wali dari Anda sesuai dengan ketentuan peraturan
              perundang-undangan yang berlaku. Syarat dan Ketentuan ini berlaku
              bagi seluruh pengguna yang menggunakan Layanan Perusahaan termasuk
              aplikasi, platform, atau berbagai media lainnya, kecuali apabila
              diatur dalam syarat dan ketentuan yang terpisah.
            </p>
          </div>
          <div id="pengantar" className="w-[90%] pb-[30px] mt-[30px]">
            <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
              PENGELOLAAN INSTRUKSI ANDA
            </p>
            <p className="pt-[20px] pl-[10px] text-sm opacity-70">
              Anda akan diminta untuk melakukan otorisasi atas instruksi Anda
              dengan menggunakan berbagai jenis informasi keamanan (misalnya
              PIN, nama pengguna, kata sandi, token). Anda bertanggung jawab
              sepenuhnya atas penggunaan dan kerahasiaan atas segala jenis
              informasi keamanan yang digunakan dalam bertransaksi. Pastikan
              Anda tidak memberitahukan informasi keamanan Anda kepada orang
              lain, termasuk staf Perusahaan.
            </p>
            <p className="pt-[20px] pl-[10px] text-sm opacity-70">
              Setelah melakukan otorisasi, kami akan menjalankan instruksi Anda.
              Anda memahami dan menyetujui metode pengiriman informasi secara
              elektronik yang digunakan untuk mengirimkan data Anda dan segala
              risikonya. Anda menyatakan menyetujui untuk membebaskan Perusahaan
              dari segala kerugian yang timbul.
            </p>
          </div>
          <div id="pengantar" className="w-[90%] pb-[30px] mt-[30px]">
            <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
              PENYIMPANAN DATA PRIBADI ANDA DAN INFORMASI LAINNYA
            </p>
            <ul className="list-disc pt-[20px] pl-[10px] text-sm opacity-70">
              <li className="pb-[5px]">
                Anda diminta untuk memberikan data pribadi dan informasi lainnya
                yang dipersyaratkan dalam rangka penggunaan{' '}
                <b>Aplikasi Life by IFG.</b>
              </li>
              <li className="pb-[5px]">
                Pastikan informasi yang Anda berikan adalah informasi yang benar
                dan akurat, dan mohon menginformasikan kembali kepada Perusahaan
                jika terdapat perubahan.
              </li>
              <li className="pb-[5px]">
                Kami menyimpan kerahasiaan dan keamanan informasi diri yang Anda
                berikan. Penggunaan data Anda akan kami lakukan sesuai dengan
                ketentuan yang berlaku.
              </li>
              <li className="pb-[5px]">
                Anda wajib memberitahukan dan menyampaikan perubahan data kepada
                Perusahaan. Perubahan tersebut hanya berlaku jika telah diterima
                dan/atau disetujui oleh Perusahaan. Dalam hal Perusahaan tidak
                menerima informasi apapun mengenai perubahan data, maka
                Perusahaan akan menggunakan data Anda yang tercatat pada sistem
                Perusahaan.
              </li>
              <li className="pb-[5px]">
                Anda wajib menanggung segala akibat dan/atau kerugian yang
                mungkin timbul dari kelalaian Anda dalam memperbarui data pada
                Perusahaan.
              </li>
            </ul>
          </div>
          <div id="pengantar" className="w-[90%] pb-[30px] mt-[30px]">
            <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
              PENGELOLAAN INSTRUKSI ANDA
            </p>
            <p className="pt-[20px] pl-[10px] text-sm opacity-70">
              Anda akan diminta untuk melakukan otorisasi atas instruksi Anda
              dengan menggunakan berbagai jenis informasi keamanan (misalnya
              PIN, nama pengguna, kata sandi, token). Anda bertanggung jawab
              sepenuhnya atas penggunaan dan kerahasiaan atas segala jenis
              informasi keamanan yang digunakan dalam bertransaksi. Pastikan
              Anda tidak memberitahukan informasi keamanan Anda kepada orang
              lain, termasuk staf Perusahaan.
            </p>
            <p className="pt-[20px] pl-[10px] text-sm opacity-70">
              Setelah melakukan otorisasi, kami akan menjalankan instruksi Anda.
              Anda memahami dan menyetujui metode pengiriman informasi secara
              elektronik yang digunakan untuk mengirimkan data Anda dan segala
              risikonya. Anda menyatakan menyetujui untuk membebaskan Perusahaan
              dari segala kerugian yang timbul.
            </p>
          </div>
        </div>
        <div className="w-full h-[20%] grid place-items-center relative">
          <div className="w-[90%] h-full flex flex-col">
            <Button
              type="linear-gradient"
              onButtonClick={() => {
                setShowTerm(false);
              }}
              shadow
              full>
              {trans(locale, lang, 'setuju')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
