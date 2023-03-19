import Icon from 'react-icons-kit';
import { lifeIdRed } from '@cp-config/Images';
import { chevronDown, chevronUp } from 'react-icons-kit/fa';
import { useState } from 'react';

export default function Component({ className }) {
  const [showDetail, setShowDetail] = useState({ 1: false, 2: false });

  const expandCollapseCell = (id) => {
    setShowDetail({ ...showDetail, [id]: !showDetail[id] });
  };

  return (
    <div className={`relative flex flex-col h-full ${className}`}>
      <style>
        {`
        .transition {
          transition: height 0.8s ease,opacity 0.5s ease-out,margin 0.5s 0s;
        }
        detail::after{

        }

        `}
      </style>
      {/* <div className="h-[10vh]">
        <img
          className="relative top-[1vh] left-[30px] w-[10vw] md:w-[8vw] lg:w-[5vw]"
          src={lifeIdRed}></img>
      </div> */}
      <div
        onClick={() => expandCollapseCell(1)}
        className="flex justify-center w-full relative py-5 border-b ">
        <div
          role="button"
          id="syaratdanketentuandropdown"
          className="flex relative rounded-[12px] px-8 py-4 h-20 w-full shadow-sm border"
          // style={{ boxShadow: `0px 12px 12px rgba(185, 186, 192, 0.3)` }}>
        >
          <span className="flex-row font-bold text-[10px] md:text-base">
            SYARAT DAN KETENTUAN SERTA PERNYATAAN PENGGUNA APLIKASI PT ASURANSI
            JIWA IFG
          </span>
          <Icon
            className="font-normal ml-auto text-[#ED1C24] self-center w-8"
            icon={showDetail[1] ? chevronUp : chevronDown}
          />
        </div>
      </div>

      {showDetail[1] && (
        <div
          id="detail-1"
          className=" transition flex flex-col items-center w-full px-5 max-h-[35vh] overflow-y-scroll">
          <div id="pengantar" className="pb-[30px] mt-[30px]">
            <p className="font-semibold text-body2 md:text-lg text-primary-90 pb-6 border-b">
              PENGANTAR
            </p>
            <p className="pt-5 text-xs md:text-sm">
              Dengan mengakses halaman ini dan menggunakan Layanan, berarti Anda
              dan Perusahaan terikat dalam suatu perjanjian. Maka dari itu, Anda
              dianggap telah memahami dan menyatakan setuju untuk terikat pada
              ketentuan yang berlaku. Perusahaan mengimbau agar Anda membaca
              Syarat dan Ketentuan ini dengan saksama.
            </p>
            <p className="pt-5 text-xs md:text-sm">
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
          <div id="pengelolaan-instruksi-anda" className="pb-[30px]">
            <p className="font-semibold text-[14px] md:text-xl lg:text-2xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              PENGELOLAAN INSTRUKSI ANDA
            </p>
            <ul className="list-disc pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Anda akan diminta untuk melakukan otorisasi atas instruksi Anda
                dengan menggunakan berbagai jenis informasi keamanan (misalnya
                PIN, nama pengguna, kata sandi, token). Anda bertanggung jawab
                sepenuhnya atas penggunaan dan kerahasiaan atas segala jenis
                informasi keamanan yang digunakan dalam bertransaksi. Pastikan
                Anda tidak memberitahukan informasi keamanan Anda kepada orang
                lain, termasuk staf Perusahaan.
              </li>
              <li className="pb-2">
                Setelah melakukan otorisasi, kami akan menjalankan instruksi
                Anda.
              </li>
              <li className="pb-2">
                Anda memahami dan menyetujui metode pengiriman informasi secara
                elektronik yang digunakan untuk mengirimkan data Anda dan segala
                risikonya. Anda menyatakan menyetujui untuk membebaskan
                Perusahaan dari segala kerugian yang timbul.
              </li>
            </ul>
          </div>

          <div
            id="penyimpanan-data-pribadi-anda-dan-informasi-lainnya"
            className="pb-[30px]">
            <p className="font-semibold text-[14px] md:text-xl lg:text-2xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              PENYIMPANAN DATA PRIBADI ANDA DAN INFORMASI LAINNYA
            </p>
            <ul className="list-disc pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Anda diminta untuk memberikan data pribadi dan informasi lainnya
                yang dipersyaratkan dalam rangka penggunaan{' '}
                <b>Aplikasi Life by IFG.</b>
              </li>
              <li className="pb-2">
                Pastikan informasi yang Anda berikan adalah informasi yang benar
                dan akurat, dan mohon menginformasikan kembali kepada Perusahaan
                jika terdapat perubahan.
              </li>
              <li className="pb-2">
                Kami menyimpan kerahasiaan dan keamanan informasi diri yang Anda
                berikan. Penggunaan data Anda akan kami lakukan sesuai dengan
                ketentuan yang berlaku.
              </li>
              <li className="pb-2">
                Anda wajib memberitahukan dan menyampaikan perubahan data kepada
                Perusahaan. Perubahan tersebut hanya berlaku jika telah diterima
                dan/atau disetujui oleh Perusahaan. Dalam hal Perusahaan tidak
                menerima informasi apapun mengenai perubahan data, maka
                Perusahaan akan menggunakan data Anda yang tercatat pada sistem
                Perusahaan.
              </li>
              <li className="pb-2">
                Anda wajib menanggung segala akibat dan/atau kerugian yang
                mungkin timbul dari kelalaian Anda dalam memperbarui data pada
                Perusahaan.
              </li>
            </ul>
          </div>

          <div id="definisi" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              A. Definisi
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                "Perusahaan/kami" adalah PT Asuransi Jiwa IFG, berkedudukan di
                Jakarta Selatan, yang terdiri dari kantor pusat, kantor cabang
                representatif, serta berbagai bentuk kantor lainnya.
              </li>
              <li className="pb-2">
                "Aplikasi Life by IFG" adalah aplikasi produk/layanan untuk
                mendukung pelaksanaan Layanan yang dikeluarkan oleh Perusahaan.
              </li>
              <li className="pb-2">
                "Anda" adalah individu yang telah cakap untuk mengadakan
                perjanjian yang mengikat termasuk pada Syarat dan Ketentuan ini
                dan untuk menggunakan Layanan yang disediakan oleh Perusahaan.
              </li>
              <li className="pb-2">
                "Contact Center" adalah pusat layanan nasabah Perusahaan yang
                dapat dihubungi lewat telepon, email, dan/atau chat.
              </li>
              <li className="pb-2">
                "Device" berarti semua perangkat elektronik, wireless,
                komunikasi, transmisi atau peralatan telekomunikasi, perangkat
                atau media yang termasuk dan tidak terbatas pada internet,
                komputer atau peralatan mobile, perangkat, terminal atau sistem
                yang mungkin dibutuhkan untuk mengakses dan menggunakan Aplikasi
                Life by IFG.
              </li>
              <li className="pb-2">
                "Polis" adalah dokumen yang dikeluarkan oleh Perusahaan termasuk
                syarat-syarat umum polis dan ketentuan lainnya (apabila
                diadakan) beserta segala tambahan/perubahannya yang memuat
                syarat-syarat perjanjian asuransi yang merupakan lampiran yang
                tak terpisahkan dari Polis.
              </li>
              <li className="pb-2">
                “Layanan” berarti setiap program dan/atau layanan yang
                digunakan/diakses oleh Anda pada situs web/portal Perusahaan
                dan/atau Aplikasi Life by IFG, termasuk tetapi tidak terbatas
                pada, pembelian Polis, pengajuan klaim, pengecekan saldo dana
                investasi, pengkinian data, dan lain-lain.
              </li>
            </ul>
          </div>

          <div id="Persyaratan-dan-tata-cara" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              B. Persyaratan dan tata cara
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Pendaftaran akun hanya dapat dilakukan melalui Life by IFG yang
                dapat diunduh melalui App Store (Apple) dan Google Play Store.
                Dengan demikian, (calon) Anda harus memiliki smartphone dengan
                kriteria minimum yang dipersyaratkan oleh Perusahaan dan
                memiliki nomor ponsel Indonesia yang aktif dan valid agar dapat
                menerima SMS yang dikirim oleh Perusahaan.
              </li>
              <li className="pb-2">
                Sebagai bagian dari proses pendaftaran akun, informasi Kartu
                Tanda Penduduk (KTP) dan NPWP dalam bentuk foto harus diunggah
                dan diajukan pada Perusahaan dengan menggunakan kamera
                smartphone dengan Aplikasi Life by IFG.
              </li>
              <li className="pb-2">
                Sebagai prasyarat, Anda wajib memberikan alamat email aktif
                miliknya sendiri yang memiliki kapasitas memadai untuk menerima
                pesan yang dikirim oleh Perusahaan. Perusahaan tidak bertanggung
                jawab atas keabsahan, kepemilikan, aktivitas, dan kapasitas
                alamat email tersebut.
              </li>
              <li className="pb-2">
                Anda setuju untuk melepaskan Perusahaan dari seluruh kerugian,
                tanggung jawab, tuntutan, dan biaya (termasuk biaya adanya
                gugatan hukum) yang dapat muncul terkait dengan eksekusi
                instruksi Anda, kecuali Anda dapat membuktikan lain dan/atau
                Layanan tersebut dieksekusi karena kesalahan Perusahaan.
              </li>
              <li className="pb-2">
                Penutupan akun dapat dilakukan oleh Anda secara langsung melalui
                Aplikasi Life by IFG atau dengan Contact Center.
              </li>
              <li className="pb-2">
                Anda setuju bahwa Perusahaan berhak untuk menutup, memblokir,
                atau membekukan akun Anda dan/atau layanan/fasilitas Anda di
                Aplikasi Life by IFG, antara lain jika:
                <ul className="list-none py-2">
                  <li className="pb-2">
                    a. Akun Anda diduga telah disalahgunakan, meliputi tetapi
                    tidak terbatas pada mengakomodasi dan/atau melakukan tindak
                    kriminal dan/atau telah atau akan terjadi penipuan yang
                    terkait dengan Polis dan/atau layanan/fasilitas Anda
                    termasuk yang menimbulkan kerugian bagi masyarakat dan pihak
                    lain, dan/atau Perusahaan.
                  </li>
                  <li className="pb-2">
                    b. Anda memberikan data/informasi yang dianggap mencurigakan
                    oleh Perusahaan dan/atau memberikan data/informasi
                    palsu/tidak valid/tidak lengkap, dan/atau tidak bersedia
                    memberikan data/informasi apapun yang diminta oleh
                    Perusahaan sesuai dengan hukum dan perundangan yang berlaku.
                  </li>
                  <li className="pb-2">
                    c. Profil data Anda identik dengantermasuk dalam Daftar
                    Teroris dan Terduga Teroris (DTTOT) dan Daftar proliferasi
                    senjata pemusnah massal.
                  </li>
                  <li className="pb-2">
                    d. Profil data Anda sesuai dengan daftar hitam yang
                    diterbitkan oleh regulator.
                  </li>
                  <li className="pb-2">
                    e. Terdapat permintaan tertulis dari instansi Kepolisian,
                    Kejaksaan, Pengadilan, Pusat Pelaporan dan Analisis
                    Transaksi Keuangan (PPATK), Komisi Pemberantas Korupsi
                    (KPK), Kantor Pajak, atau lembaga berwenang lainnya sesuai
                    dengan hukum dan perundangan yang berlaku.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div id="manfaat-dan-risiko" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              C. Manfaat dan Risiko
            </p>
            <ul className="list-disc pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Manfaat.
                <ul className="list-none py-[5px]">
                  <li className="pb-2">
                    a. Aplikasi Life by IFG tersedia bagi Anda untuk mengakses
                    Layanan yang disediakan oleh Perusahaan. Anda akan dibantu
                    oleh Contact Center dan/atau cabang Perusahaan atau jaringan
                    layanan untuk mendapatkan Layanan tertentu pada saat Life by
                    IFG tidak dapat digunakan karena alasan yang kuat.
                  </li>
                  <li className="pb-2">
                    b. Contact Center tersedia untuk membantu Anda seperti
                    pengajuan pertanyaan atau pengaduan.
                  </li>
                  <li className="pb-2">
                    c. Transaksi pembelian Polis, pengecekan saldo dana
                    investasi, pengajuan klaim, pengkinian data dan lain-lain.
                  </li>
                  <li className="pb-2">
                    d. Anda sepenuhnya memahami berbagai fitur dari seluruh
                    Aplikasi Life by IFG, termasuk namun tidak terbatas pada
                    pembelian Polis, pengecekan saldo dana investasi, pengajuan
                    klaim, pengkinian data dan lain-lain. Anda dapat membeli
                    Polis hingga jumlah tertentu sesuai yang telah ditetapkan
                    Perusahaan. Rincian fitur seluruh Polis dapat ditemukan
                    dalam informasi produk yang berada di Aplikasi Life by IFG.
                  </li>
                </ul>
              </li>
              <li className="pb-2">
                Risiko.
                <ul className="list-none py-[5px]">
                  <li className="pb-2">
                    a. Perusahaan tidak pernah meminta kata sandi, OTP (One Time
                    Password), kode QR, dan/atau PIN kepada Anda. Oleh karena
                    itu, Anda harus selalu berhati-hati dan tidak merespon
                    segala bentuk panggilan maupun tautan yang dikirim melalui
                    email ataupun website (situs palsu menduplikasi situs resmi
                    Perusahaan) yang ditujukan untuk percobaan penipuan yang
                    mengatasnamakan Perusahaan yang meminta Anda untuk
                    memberikan kata sandi, OTP (One Time Password), kode QR,
                    dan/atau PIN.
                  </li>
                  <li className="pb-2">
                    b. Anda bertanggung jawab untuk memastikan seluruh data dan
                    instruksi yang diberikan pada Perusahaan telah benar dan
                    lengkap. Perusahaan tidak bertanggung jawab atas dampak
                    apapun yang dapat disebabkan oleh kelalaian,
                    ketidaklengkapan atau ketidakjelasan data dan/atau instruksi
                    yang diberikan oleh Anda.
                  </li>
                  <li className="pb-2">
                    c. Untuk setiap Layanan, data dan/atau instruksi yang
                    diberikan Anda akan dianggap benar dan valid untuk
                    dieksekusi oleh Perusahaan.
                  </li>
                  <li className="pb-2">
                    d. Anda dengan ini setuju bahwa Perusahaan berhak untuk
                    tidak menjalankan instruksi Anda meliputi, tetapi tidak
                    terbatas pada keadaan berikut:
                    <ul className="list-none py-2 pl-4">
                      <li className="pb-2">
                        i. Dokumen dan/atau data yang diberikan Anda tidak
                        sesuai
                      </li>
                      <li className="pb-2">
                        ii. Akun Anda dikenakan penyitaan atau blokir
                      </li>
                      <li className="pb-2">
                        iii. Perusahaan memiliki alasan untuk mencurigai adanya
                        tindakan fraud atau kriminal.
                      </li>
                    </ul>
                  </li>
                  <li className="pb-2">
                    e. Anda dengan ini setuju bahwa Perusahaan berhak untuk
                    menghentikan sementara akses Layanan untuk periode yang
                    telah ditentukan untuk tujuan pemeliharaan, dan tujuan
                    lainnya yang dianggap sah oleh Perusahaan, dengan atau tanpa
                    pemberitahuan sebelumnya pada Anda dan tanpa bertanggung
                    jawab pada siapapun.
                  </li>
                  <li className="pb-2">
                    f. Anda dengan ini setuju bahwa Perusahaan memiliki hak
                    mutlak untuk memperbarui, memodifikasi, atau mengubah situs
                    web atau perangkat lunak apapun (termasuk Life by IFG atau
                    aplikasi lainnya) yang digunakan untuk mengakses Aplikasi
                    Life by IFG sewaktu-waktu tanpa pemberitahuan dan tanpa
                    memberikan alasan apapun.
                  </li>
                  <li className="pb-2">
                    g. Anda dengan ini setuju bahwa Perusahaan berhak untuk
                    tidak mendukung versi sebelumnya dari perangkat lunak
                    (mobile app) yang digunakan. Jika Anda gagal untuk
                    memperbarui perangkat lunak yang relevan atau menggunakan
                    versi yang disempurnakan, Perusahaan tidak bertanggung jawab
                    atas segala konsekuensi yang ditimbulkannya.
                  </li>
                  <li className="pb-2">
                    h. Perusahaan tidak bertanggung jawab atas penggunaan
                    Aplikasi Life by IFG, pada perangkat yang tidak didukung
                    oleh Life by IFG, termasuk namun tidak terbatas pada
                    perangkat yang di-jailbreak atau root.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div id="informasi-keamanan" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              D. Informasi Keamanan
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Informasi keamanan berupa nama pengguna, kata sandi, OTP (One
                Time Password), kode QR, dan/atau PIN akan dibutuhkan untuk
                login, aktivasi perangkat, dan mengeksekusi setiap Layanan yang
                menurut Perusahaan dibutuhkan sebagai tujuan otentikasi. Untuk
                tiap informasi keamanan yang akan ditentukan dan ditetapkan oleh
                Anda, Anda harus memastikan untuk menggunakan kata sandi yang
                kuat dan tidak memasukkan kata sandi yang mudah ditebak serta
                informasi diri seperti tanggal lahir dan alamat. Penggunaan
                informasi tersebut akan dianggap sebagai kelalaian Anda. Anda
                bertanggung jawab penuh terhadap keamanan dan kerahasiaan
                seluruh penggunaan Aplikasi Life by IFG miliknya.
              </li>
              <li className="pb-2">
                Informasi keamanan akan menjadi rahasia di bawah tanggung jawab
                Anda, karena informasi tersebut memiliki keberlakuan setara
                dengan instruksi tertulis yang ditandatangani oleh Anda, dan
                akan diperlakukan sebagai otorisasi eksplisit oleh Anda dalam
                mengakses Layanan.
              </li>
              <li className="pb-2">
                Perusahaan akan mengajukan proses verifikasi yang memenuhi
                standar Perusahaan untuk memungkinkan Anda mengakses Layanan.
              </li>
              <li className="pb-2">
                Anda menyetujui untuk membebaskan Perusahaan dari segala
                kerugian, tanggung jawab, klaim dan biaya (termasuk biaya hukum)
                yang mungkin terjadi dalam kaitannya dengan pelaksanaan
                instruksi dari Perusahaan berdasarkan otorisasi Anda, kecuali
                dijalankan karena kesalahan dari Perusahaan.
              </li>
              <li className="pb-2">
                Anda bertanggung jawab untuk memperoleh dan menggunakan
                perangkat lunak dan/atau peralatan yang diperlukan untuk dapat
                mengakses Aplikasi Life by IFG dengan risiko yang ditanggung
                Anda.
              </li>
              <li className="pb-2">
                Anda juga bertanggung jawab atas kinerja dan keamanan (termasuk
                tanpa batasan mengambil semua langkah yang diperlukan untuk
                mencegah penggunaan atau akses yang tidak sah) dari setiap
                peralatan yang digunakan oleh Anda untuk mengakses Aplikasi Life
                by IFG
              </li>
              <li className="pb-2">
                Anda harus memastikan bahwa peralatan yang digunakan untuk
                mengakses Aplikasi Life by IFG bebas dari kegagalan elektronik,
                mekanik, data yang gagal atau terkorupsi, virus komputer, bug
                dan/atau perangkat lunak yang berbahaya/tidak diizinkan oleh
                penyedia layanan telekomunikasi, atau produsen atau vendor dari
                peralatan yang relevan. Dalam hal ini termasuk:
                <ul className="list-none py-2 pl-[2vw]">
                  <li className="pb-2">
                    a. penggunaan komputer pribadi Anda, perangkat mobile
                    dan/atau terminal Anda lainnya dengan perangkat lunak berupa
                    anti-virus terbaru, anti-malware dan firewall yang tersedia
                    dan perangkat lunak yang digunakan secara teratur selalu
                    diperbarui dan dijalankan dengan anti-virus signatures
                    terbaru
                  </li>
                  <li className="pb-2">
                    b. memastikan bahwa Anda tidak melakukan jailbreak, root
                    atau memodifikasi perangkat mobile dan/atau peralatan
                    lainnya, atau mengunduh aplikasi yang tidak diizinkan karena
                    hal ini dapat membuat perangkat lebih rentan terhadap virus
                    dan malware.
                  </li>
                </ul>
              </li>
              <li className="pb-2">
                Anda menyetujui bahwa Perusahaan tidak bertanggung jawab atas
                kegagalan elektronik maupun mekanik, atau data yang terkorupsi,
                virus komputer, bug dan/atau perangkat lunak yang berbahaya
                lainnya dari jenis apapun yang mungkin timbul dari layanan yang
                disediakan oleh penyedia layanan internet yang relevan atau
                informasi penyedia layanan.
              </li>
              <li className="pb-2">
                Polis diterbitkan dengan validitas yang menunjukkan tanggal,
                bulan dan tahun lahir Anda. Tanggal berakhirnya pertanggungan
                Polis adalah hari terakhir berlakunya Polis yang tercetak pada
                dokumen polis. Setelah tanggal pertanggungan pada Polis
                berakhir, Polis tersebut, beserta manfaat yang dipertanggungkan,
                dengan sendirinya menjadi tidak berlaku.
              </li>
              <li className="pb-2">
                Perusahaan dibebaskan oleh Anda dari segala kerugian dan dampak
                hukum yang muncul disebabkan oleh pelanggaran ketentuan Layanan,
                sehingga membuat Anda termasuk dalam Daftar Hitam Anda (DHN)
                yang diterbitkan oleh Otoritas Jasa Keuangan dan/atau Asosiasi
                Asuransi Jiwa Indonesia.
              </li>
              <li className="pb-2">
                Dengan mengakses Layanan, Anda memahami bahwa seluruh komunikasi
                dan instruksi dari Anda yang diterima oleh Perusahaan akan
                diperlakukan sebagai bukti sah meskipun tidak dibuat dalam
                bentuk dokumen tertulis atau diterbitkan dalam bentuk dokumen
                yang ditaAndatangani, dan, dengan demikian, Anda setuju untuk
                mengganti rugi dan melepaskan Perusahaan dari segala kerugian,
                tanggung jawab, tuntutan dan pengeluaran (termasuk biaya hukum)
                yang dapat muncul terkait dengan eksekusi dari instruksi Anda,
                kecuali kesalahan eksekusi dari instruksi diakibatkan oleh
                kesalahan atau kelalaian pihak Perusahaan.
              </li>
            </ul>
          </div>

          <div id="properti-intelektual" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              E. Properti Intelektual
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Semua kekayaan intelektual yang terkandung dalam atau di
                Aplikasi Life by IFG dan situs Perusahaan, dimiliki oleh
                Perusahaan atau pemberi lisensinya. Semua konten dalam program
                Aplikasi Life by IFG situs Perusahaan, termasuk, namun tidak
                terbatas pada, teks, perangkat lunak, skrip, kode, desain,
                grafik, foto, suara, musik, video, fitur interaktif, dan semua
                konten lainnya ("Konten") adalah karya kolektif berdasarkan
                undang-undang hak cipta yang berlaku dan merupakan milik
                Perusahaan. Perusahaan berhak atas semua haknya sehubungan
                dengan Hak Kekayaan Intelektual (“HKI”) yang terdapat dalam
                program Aplikasi Life by IFG dan situs Perusahaan sehubungan
                dengan Konten.
              </li>
              <li className="pb-2">
                Secara khusus, Aplikasi Life by IFG dan situs Perusahaan berisi
                merek dagang termasuk, namun tidak terbatas pada, tanda dan logo
                "IFG Life". Semua merek dagang yang disertakan sebagai bagian
                dari Aplikasi Life by IFG dan situs Perusahaan dimiliki oleh
                Perusahaan atau pemberi lisensinya. Perusahaan berhak atas semua
                haknya sehubungan dengan merek dagang yang disertakan sebagai
                bagian dari Aplikasi Life by IFG situs Perusahaan.
              </li>
              <li className="pb-2">
                Tidak ada dalam Syarat dan Ketentuan ini atau sebaliknya yang
                akan ditafsirkan sebagai pemberian kepada Anda lisensi HKI yang
                dimiliki oleh Perusahaan atau pemberi lisensinya.
              </li>
            </ul>
          </div>

          <div id="hukum-dan-yuridiksi" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              F. Hukum dan Yuridiksi yang berlaku
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Interpretasi dan implementasi Syarat dan Ketentuan ini diatur
                dan tunduk pada hukum yang berlaku di Republik Indonesia.
              </li>
              <li className="pb-2">
                Segala perselisihan atau pertentangan yang timbul sehubungan
                dengan atau terkait dengan hal-hal yang diatur dalam Syarat dan
                Ketentuan (maupun bagian daripadanya) termasuk perselisihan yang
                disebabkan karena adanya atau dilakukannya perbuatan melawan
                hukum atau pelanggaran atas satu atau lebih Syarat dan Ketentuan
                ini (<b>“Perselisihan”</b>) wajib diselesaikan dengan cara
                sebagai berikut:
                <ul className="list-none py-[5px] pl-[2vw]">
                  <li className="pb-2">
                    a. salah satu pihak baik Anda atau Perusahaan (
                    <b>“Pihak Pertama”</b>) wajib menyampaikan pemberitahuan
                    tertulis kepada pihak lainnya (<b>“Pihak Kedua”</b>) atas
                    telah terjadinya perselisihan (
                    <b>“Pemberitahuan Perselisihan”</b>). Perselisihan wajib
                    diselesaikan secara musyawarah mufakat dalam waktu paling
                    lambat 90 (sembilan puluh) hari kalender sejak tanggal
                    Pemberitahuan Perselisihan (
                    <b>“Periode Penyelesaian Musyawarah”</b>);
                  </li>
                  <li className="pb-2">
                    b. jika Perselisihan tidak dapat diselesaikan secara
                    musyawarah mufakat sampai dengan berakhirnya Periode
                    Penyelesaian Musyawarah, maka Pihak Pertama dan Pihak Kedua
                    wajib untuk bersama-sama menunjuk pihak ketiga (“Mediator”)
                    sebagai mediator untuk menyelesaikan Perselisihan dan
                    penunjukan tersebut wajib dituangkan dalam bentuk tertulis
                    yang ditandatangani bersama oleh Pihak Pertama dan Pihak
                    Kedua;
                  </li>
                  <li className="pb-2">
                    c. Proses mediasi oleh Mediator khusus akan diselesaikan
                    oleh satu arbiter yang ditunjuk berdasarkan Peraturan Badan
                    Arbitrase Nasional Indonesia (BANI) dan atau Lembaga
                    Alternatif Penyelesaian Sengketa Sektor Jasa Keuangan (LAPS
                    SJK);
                  </li>
                  <li className="pb-2">
                    d. Ketentuan mengenai seluruh biaya, ongkos dan pengeluaran
                    dalam rangka penyelesaian Perselisihan diputuskan
                    berdasarkan putusan arbitrase yang final dan mengikat;
                  </li>
                  <li className="pb-2">
                    e. Kecuali disyaratkan berdasarkan hukum yang berlaku atau
                    diminta berdasarkan permintaan, keputusan atau penetapan
                    resmi yang diterbitkan, dikeluarkan atau dibuat oleh
                    pengadilan atau instansi pemerintah yang berwenang, selama
                    proses penyelesaian Perselisihan sebagaimana diatur di atas
                    sampai dengan adanya keputusan yang sah, final dan mengikat
                    Pihak Pertama dan Pihak Kedua, maka Pihak Pertama dan Pihak
                    Kedua wajib untuk merahasiakan segala informasi terkait
                    dengan Perselisihan maupun proses penyelesaiannya dan
                    karenanya dilarang untuk dengan cara apapun
                    menginformasikan, memberitahukan atau mengumumkan kepada
                    pihak manapun adanya Perselisihan tersebut maupun proses
                    penyelesaiannya termasuk tetapi tidak terbatas melalui media
                    massa (koran, televisi atau media lainnya) dan/atau media
                    sosial.
                  </li>
                </ul>
              </li>
              <li className="pb-2">
                Sehubungan dengan kuasa yang tidak ditarik kembali yang Anda
                berikan kepada Kami berdasarkan Syarat dan Ketentuan ini, kuasa
                tersebut akan terus berlaku dan tidak dapat berakhir karena
                alasan apapun juga termasuk alasan-alasan yang dimaksud dan
                diatur dalam Pasal 1813, 1814, dan 1816 Kitab Undang-Undang
                Hukum Perdata, kecuali dalam hal Anda telah berhenti mengakses
                Layanan dan menutup akun Aplikasi Life by IFG.
              </li>
            </ul>
          </div>

          <div id="pertanyaan-dan-wewenang" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              G. Pertanyaan dan Wewenang
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Anda dengan ini menyatakan bahwa setiap data, deskripsi dan
                tanda tangan elektronik Anda pada Aplikasi Life by IFG dan/atau
                layanan/fasilitas Perusahaan yang digunakan oleh Anda, berbagai
                dokumen pendukung lain yang terkait dengan Aplikasi Life by IFG
                dan/atau layanan/fasilitas Perusahaan yang digunakan oleh Anda,
                serta tiap instruksi operasional pada Aplikasi Life by IFG
                dan/atau layanan/fasilitas Perusahaan yang digunakan oleh Anda,
                serta wewenang yang diberikan oleh Anda pada pihak ketiga (jika
                ada) dan wewenang yang diberikan pada Perusahaan adalah valid
                dan sah serta mengikat pada seluruh jenis layanan/fasilitas
                Perusahaan yang digunakan oleh Anda, kecuali jika dinyatakan
                lain. Anda diwajibkan untuk segera memberikan informasi pada
                Perusahaan atas tiap perubahan nama, alamat, nomor telepon, NPWP
                dan hal lain yang menyimpang/berbeda dari data/deskripsi yang
                sebelumnya diberikan oleh Anda pada Perusahaan terkait dengan
                Polis dan/atau proses registrasi akun Anda pada Life by IFG.
                Kelalaian Anda dalam memberitahukan perubahan tersebut pada
                Perusahaan sepenuhnya menjadi tanggung jawab Anda. Penyampaian
                data oleh Anda kepada Perusahaan pada atau melalui Aplikasi Life
                by IFG dan/atau layanan/fasilitas Perusahaan atau sistem tidak
                bertentangan dengan hukum yang berlaku serta tidak melanggar
                akta, perjanjian, kontrak, kesepakatan atau dokumen lain di mana
                Anda merupakan pihak atau di mana Anda atau aset Anda terikat.
              </li>
              <li className="pb-2">
                Anda dengan ini menyatakan bahwa:
                <ul className="list-none py-[5px] pl-[2vw]">
                  <li className="pb-2">
                    a. Perusahaan berhak untuk melakukan pengujian terhadap
                    validitas data yang diberikan oleh Anda pada Life by IFG
                    atau aplikasi untuk mengikuti fasilitas/layanan Perusahaan
                    atau aplikasi serupa; dan berhak untuk meminta data tambahan
                    yang dibutuhkan oleh Perusahaan;
                  </li>
                  <li className="pb-2">
                    b. Perusahaan telah memberikan penjelasan memadai mengenai
                    karakteristik produk Perusahaan yang akan digunakan dan Anda
                    telah memahami seluruh konsekuensi dari penggunaan produk
                    Perusahaan tersebut, termasuk keuntungan, risiko, biaya yang
                    ditimbulkan terkait dengan produk.
                  </li>
                </ul>
              </li>
              <li className="pb-2">
                Anda tidak akan memberikan hak, wewenang dan/atau kuasa dalam
                bentuk apapun dan dalam kondisi apapun kepada orang atau pihak
                lain untuk menggunakan data, akun Aplikasi Life by IFG, kata
                sandi, OTP (One Time Password), kode QR, dan/atau PIN, dan Anda
                karena alasan apapun dan dalam kondisi apapun tidak akan dan
                dilarang untuk mengalihkan akun Aplikasi Life by IFG kepada
                orang lain atau pihak manapun.
              </li>
              <li className="pb-2">
                Dengan mengakses Layanan, Anda memahami bahwa seluruh komunikasi
                dan instruksi dari Anda yang diterima oleh Perusahaan akan
                diperlakukan sebagai bukti solid meskipun tidak dibuat dalam
                bentuk dokumen tertulis atau diterbitkan dalam bentuk dokumen
                yang ditandatangani, dan, dengan demikian, Anda setuju untuk
                mengganti rugi dan melepaskan Perusahaan dan rekanan-rekanan
                Perusahaan dari segala kerugian, tanggung jawab, tuntutan dan
                pengeluaran (termasuk biaya litigasi) yang dapat muncul terkait
                dengan eksekusi dari instruksi Anda.
              </li>
              <li className="pb-2">
                Anda setuju untuk mengizinkan Perusahaan memberikan dan/atau
                mendistribusikan data pribadi Anda kepada dan/atau perwakilan
                dan/atau perusahaan induk dan/atau, pemegang saham dan/atau
                perusahaan afiliasinya dan/atau pihak ketiga yang telah
                melakukan kerja sama dengan Perusahaan (
                <span className="italic">
                  termasuk Penyelenggara Sistem Elektronik
                </span>
                ), untuk tujuan administrasi, verifikasi dan/atau penawaran
                produk/layanan, promosi, dan/atau dalam rangka peningkatan
                layanan terhadap Anda.
              </li>
              <li className="pb-2">
                Dalam hal Anda tidak memberikan persetujuan kepada Perusahaan
                untuk memberikan dan/atau menyebarluaskan data pribadi Anda
                kepada pihak lain (di luar Perusahaan) untuk tujuan komersil
                melalui saluran komunikasi yang tersedia berdasarkan syarat dan
                ketentuan, Perusahaan hanya akan menggunakan data pribadi Anda
                yang terdapat pada Perusahaan untuk kepentingan internal
                Perusahaan dan data pribadi tersebut tidak akan diberikan dan
                atau disebarluaskan kepada pihak lain di luar badan hukum
                Perusahaan, kecuali sebagaimana diatur pada ketentuan
                perundang-undangan yang berlaku.
              </li>
              <li className="pb-2">
                Terlepas dari ketentuan tersebut di atas, Anda dengan ini
                memberikan kuasa kepada Perusahaan untuk mengungkapkan informasi
                terkait Anda, termasuk namun tidak terbatas, informasi mengenai
                Polis atau hal-hal khusus yang berkaitan dengan Polis dari Anda
                kepada pemegang saham pengendali / pemegang saham pengendali
                terakhir, anak perusahaan dan afiliasi-afiliasi, serta jaringan
                pemasaran Perusahaan serta kepada otoritas terkait. baik di
                dalam maupun di luar negeri dengan tetap memperhatikan ketentuan
                perundang-undangan yang berlaku di Indonesia.
              </li>
              <li className="pb-2">
                Anda dengan ini memahami dan menyetujui bahwa jika Anda
                memberikan otorisasi dan/atau pembukaan akses kepada Perusahaan,
                termasuk tetapi tidak terbatas, atas:
                <ul className="list-none py-[5px] pl-[2vw]">
                  <li className="pb-2">a. akun media sosial Anda;</li>
                  <li className="pb-2">
                    b. akun bisnis elektronik (e-commerce) Anda;
                  </li>
                  <li className="pb-2">c. data perangkat seluler Anda;</li>
                  <li className="pb-2">
                    d. informasi resmi dari penyedia telekomunikasi Anda (tidak
                    termasuk data percakapan);maka Perusahaan dapat membaca,
                    memperoleh, mengumpulkan, mengolah serta menganalisis
                    informasi di akun Anda tersebut hanya terhadap informasi
                    yang relevan menurut Perusahaan dengan layanan atau produk
                    Perusahaan yang dipilih oleh Anda atau layanan atau produk
                    Perusahaan yang akan ditawarkan kepada Anda.
                  </li>
                </ul>
              </li>
              <li className="pb-2">
                Anda dengan ini menyatakan bahwa Anda bersedia dikunjungi
                dan/atau dihubungi oleh Perusahaan melalui sarana komunikasi
                pribadi Anda, untuk menyampaikan informasi (termasuk produk
                dan/atau layanan), pada hari Senin sampai Sabtu di luar hari
                libur nasional pada pukul 08.00 – 18.00 waktu setempat,
                sedangkan untuk kunjungan dalam rangka layanan (termasuk namun
                tidak terbatas pengiriman Polis dan pertemuan secara langsung
                untuk verifikasi data Anda) dapat dilakukan pada hari Senin
                sampai Minggu termasuk libur nasional pada pukul 08.00 – 21.00
                waktu setempat.
              </li>
              <li className="pb-2">
                Anda dengan ini menyatakan bahwa Perusahaan dibebaskan dari
                tuntutan/gugatan ganti rugi yang muncul akibat kegagalan sistem
                dan/atau fasilitas komunikasi yang disebabkan oleh faktor
                eksternal di luar kendali Perusahaan.
              </li>
              <li className="pb-2">
                Anda dengan ini menyatakan bahwa menyetujui penggunaan tanda
                tangan yang tertera pada Foto KTP yang disampaikan kepada
                Perusahaan untuk disimpan dan dipergunakan oleh Perusahaan
                sebagai specimen tanda tangan Anda.
              </li>
              <li className="pb-2">
                Anda dengan ini menyatakan tunduk dan terikat pada Syarat dan
                Ketentuan ini dan Syarat dan Ketentuan Polis Anda PT Asuransi
                Jiwa IFG (“Syarat dan Ketentuan”) persyaratan dan ketentuan yang
                terkait dengan fasilitas/layanan Perusahaan akan diterima oleh
                Anda seperti hukum, perundangan dan kuasa Perusahaan yang
                berlaku di Republik Indonesia, sama halnya ketentuan yang
                ditetapkan oleh Republik Indonesia terkait dengan
                fasilitas/layanan Perusahaan yang diberikan oleh Perusahaan pada
                Anda (meliputi tetapi tidak terbatas pada proses transaksi
                melalui media elektronik).
              </li>
              <li className="pb-2">
                Seluruh wewenang yang diberikan oleh Anda dalam Syarat dan
                Ketentuan tersebut diberikan dengan hak substitusi, dan
                sepanjang kewajiban Anda terhadap Perusahaan belum sepenuhnya
                selesai, wewenang tersebut tidak dapat ditarik dan diakhiri
                untuk alasan apapun, termasuk tetapi tidak terbatas pada alasan
                yang disebutkan pada Pasal 1813 Hukum Perdata karena wewenang
                tersebut adalah komponen tak terpisahkan dari Syarat dan
                Ketentuan yang ada.
              </li>
              <li className="pb-2">
                Anda menyetujui dan mengakui Perusahaan memiliki wewenang untuk
                meningkatkan, mengubah atau melengkapi Syarat dan Ketentuan
                tersebut sesuai dengan ketentuan yang berlaku. Setiap perubahan,
                tambahan atau pembaruan atas Syarat dan Ketentuan tersebut akan
                disosialisasikan melalui email Anda atau sarana
                komunikasi/informasi lainnya dan Anda terikat dengan perubahan
                di masa mendatang tersebut.
              </li>
              <li className="pb-2">
                Anda menyetujui untuk menerima pemberitahuan melalui sarana
                elektronik sesuai ketentuan hukum yang berlaku, Syarat dan
                Ketentuan ini, serta notifikasi lainnya mengenai penggunaan Anda
                terhadap produk/layanan dari Aplikasi Life by IFG. Sarana
                elektronik termasuk, namun tidak terbatas pada, surat
                elektronik, atau ditampilkan pada laman situs internet
                perusahaan atau pada Aplikasi Life by IFG, atau melalui sarana
                komunikasi nirkabel. Ketentuan, perjanjian dan notifikasi di
                atas akan dianggap telah diterima saat diterbitkan.
              </li>
              <li className="pb-2">
                Anda dengan ini menyatakan telah menyetujui bahwa Anda wajib
                memberikan informasi dan atau dokumen tambahan secara jelas dan
                akurat sebagaimana yang diminta oleh Perusahaan terkait dengan
                Layanan dan profil Anda jika dibutuhkan.
              </li>
              <li className="pb-2">
                {' '}
                Anda menyatakan dan menjamin bahwa dana yang dipergunakan dalam
                menggunakan Layanan bukan dana yang berasal dari tindak pidana
                yang dilarang berdasarkan peraturan perundang-undangan yang
                berlaku di Republik Indonesia dan tidak dimaksudkan dan/atau
                ditujukan dalam rangka upaya melakukan tindak pidana pencucian
                uang sesuai dengan ketentuan peraturan perundang-undangan yang
                berlaku, akses Layanan tidak dilakukan untuk maksud mengelabui,
                mengaburkan, atau menghindari pelaporan kepada Pusat Pelaporan
                dan Analisis Transaksi Keuangan (PPATK) berdasarkan ketentuan
                peraturan perundang-undangan yang berlaku, dan Anda bertanggung
                jawab sepenuhnya serta melepaskan Perusahaan dari segala
                tuntutan, klaim, atau ganti rugi dalam bentuk apapun, apabila
                Perusahaan melakukan tindak pidana pencucian uang berdasarkan
                ketentuan peraturan perundang-undangan yang berlaku.
              </li>
              <li className="pb-2">
                Dengan membaca, memahami dan menyetujui Syarat dan Ketentuan
                ini, Anda mengikatkan diri pada seluruh Syarat dan Ketentuan
                ini, dan seluruh syarat dan ketentuan yang telah ditetapkan oleh
                Perusahaan dan menyatakan bahwa Perusahaan telah memberikan
                penjelasan yang cukup mengenai karakteristik produk atau layanan
                Perusahaan yang akan Anda manfaatkan dan Anda telah mengerti dan
                memahami segala konsekuensi pemanfaatan produk atau layanan
                Perusahaan, berikut dengan manfaat, risiko dan biaya-biaya yang
                melekat pada pada produk atau layanan Perusahaan tersebut.
              </li>
            </ul>
          </div>

          <div id="identifikasi" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              H. identifikasi
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Perusahaan tidak bertanggung jawab dalam bentuk dan dengan cara
                apa pun atas segala kerusakan, kerugian atau pengeluaran
                termasuk tanpa pembatasan, kerusakan langsung atau tidak
                langsung, khusus, atau konsekuensial, atau kerugian ekonomi yang
                timbul dari atau sehubungan dengan:
                <ul className="list-none py-[5px] pl-[2vw]">
                  <li className="pb-2">
                    a. Akses atau penggunaan Aplikasi Life by IFG Anda, atau
                    ketidakmampuan Anda untuk mengakses atau menggunakan
                    Aplikasi Life by IFG;
                  </li>
                  <li className="pb-2">
                    b. Tidak dapat diterimanya dan/atau tidak ditindaklanjutinya
                    komunikasi terkait Aplikasi Life by IFG;
                  </li>
                  <li className="pb-2">
                    c. Segala penyalahgunaan kata sandi, OTP (One Time
                    Password), kode QR, dan/atau PIN, baik akibat kesengajaan
                    atau kelalaian Anda dalam menyimpan atau menggunakan atau
                    mengelola kata sandi, OTP (One Time Password), kode QR,
                    dan/atau PIN.
                  </li>
                  <li className="pb-2">
                    d. Setiap instruksi atau transaksi yang dilakukan melalui
                    Aplikasi Life by IFG;
                  </li>
                  <li className="pb-2">
                    e. Setiap kerugian atau penyalahgunaan atau pengungkapan
                    informasi yang tidak sah, yang disebabkan bukan oleh
                    kelalaian/atau pelanggaran oleh Perusahaan; atau
                  </li>
                  <li className="pb-2">
                    f. Kegagalan sistem, server atau koneksi, kesalahan,
                    kelalaian, gangguan, intersepsi, keterlambatan dalam
                    pengoperasian atau transmisi, atau virus komputer, serangan
                    dunia maya, email phishing, spyware, worm, software logic,
                    time bomb, trojan horse atau komponen-komponen berbahaya
                    serupa lainnya, kecuali kerusakan atau kerugian tersebut
                    dapat dibuktikan berdasarkan peraturan perundang-undangan
                    dan regulasi yang berlaku disebabkan oleh itikad tidak baik
                    atau kesalahan yang disengaja atau kelalaian yang nyata dari
                    Perusahaan.
                  </li>
                </ul>
              </li>
              <li className="pb-2">
                Bahwa Aplikasi Life by IFG ini dibuat dan/atau dioperasionalkan
                sesuai dengan prinsip kehati-hatian sesuai dengan peraturan
                perundang-undangan dan regulasi yang berlaku dan Perusahaan
                tidak memberikan jaminan dalam bentuk apa pun pada Aplikasi Life
                by IFG, termasuk dan tidak terbatas pada jaminan kualitas yang
                memuaskan, kesesuaiannya untuk suatu tujuan, akurasi, keandalan,
                dan kebebasan dari Perangkat Perusak (Malware), email phishing,
                yang diberikan sehubungan dengan Aplikasi Life by IFG, atau
                kontennya, termasuk tautan pihak ketiga apa pun.
              </li>
              <li className="pb-2">
                Konten Aplikasi Life by IFG diberikan sebagai informasi umum dan
                tidak dapat digunakan sebagai dasar untuk membuat keputusan
                investasi, usaha, atau komersial tertentu.
              </li>
              <li className="pb-2">
                Bahwa Aplikasi Life by IFG ini dioperasikan menggunakan layanan
                telekomunikasi daring/online dan/atau internet yang
                diselenggarakan oleh pihak ketiga sehingga Perusahaan tidak
                memberikan jaminan kestabilan jaringan telekomunikasi sehingga
                dapat dimungkinkan terjadinya gangguan transmisi, intersepsi,
                peretasan, fluktuasi, ketidaktepatan, cacat, kerusakan,
                kehilangan, kesalahan koneksi, pemadaman transmisi,
                keterlambatan atau kegagalan transmisi dan/atau transmisi data
                yang salah, tidak sesuai atau tidak lengkap. Perusahaan tidak
                akan bertanggung jawab atas kerusakan, gangguan, kegagalan,
                penutupan atau kegagalan pemakaian (malfungsi) dalam fasilitas
                internet atau komunikasi yang bukan di bawah pengendalian yang
                wajar dari Perusahaan atau kecuali jika disebabkan oleh itikad
                tidak baik, kesalahan yang disengaja, atau kelalaian yang nyata
                dari Perusahaan yang dapat mempengaruhi ketepatan, keaslian atau
                ketepatan waktu dari transmisi apa pun yang dapat dikirim.
              </li>
              <li className="pb-2">
                Dalam penyelenggaraan Aplikasi Life by IFG ini Perusahaan
                menerapkan langkah-langkah keamanan sebagaimana disyaratkan oleh
                peraturan perundang-undangan dan regulasi yang berlaku, oleh
                karena itu Anda secara personal bertanggung jawab untuk keamanan
                akses dan penggunaan email Anda, layanan pesan singkat (SMS),
                dan seluruh pesan lainnya yang dikirim melalui internet,
                Aplikasi Life by IFG, atau ponsel Anda, dan sepanjang diizinkan
                oleh peraturan perundang-undangan dan regulasi yang berlaku,
                Perusahaan tidak bertanggung jawab atas segala kerusakan atau
                kerugian atau potensi kerugian baik secara langsung ataupun
                tidak langsung yang ditimbulkan atau dialami oleh Anda
                sehubungan dengan atau timbul dari surel (email), SMS, dan pesan
                lainnya apa pun yang dikirim (baik kepada Perusahaan, atau oleh
                Perusahaan) melalui internet, Aplikasi Life by IFG, atau ponsel
                Anda kecuali jika disebabkan oleh itikad tidak baik, kesalahan
                yang disengaja, atau kelalaian yang nyata dari Perusahaan.
              </li>
            </ul>
          </div>

          <div id="keadaan-kahar" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              I. Keadaan Kahar <em>(Force Majeure)</em>
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Anda akan membebaskan Perusahaan dari segala tuntutan, jika
                Perusahaan tidak dapat melaksanakan instruksi dari Anda, baik
                sebagian maupun sepenuhnya yang disebabkan oleh kejadian atau
                sebab yang berada di luar kendali atau kemampuan Perusahaan,
                meliputi tetapi tidak terbatas pada bencana alam, peperangan,
                kerusuhan, kondisi perangkat keras, kegagalan sistem
                infrastruktur elektronik atau transmisi, gangguan daya, gangguan
                telekomunikasi, kegagalan sistem kliring atau hal lainnya yang
                ditetapkan oleh Perusahaan Indonesia atau lembaga berwenang
                lainnya.
              </li>
              <li className="pb-2">
                Setelah kejadian yang menyebabkan Perusahaan tidak dapat
                melaksanakan instruksi dari Anda berakhir, Perusahaan akan
                melanjutkan kembali instruksi tersebut dalam kurun waktu sesuai
                dengan ketentuan Perusahaan dan/atau Otoritas Jasa Keuangan.
              </li>
            </ul>
          </div>

          <div id="masa-berlaku-dan-pengakhiran" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              J. Masa Berlaku dan Pengakhiran
            </p>
            <ul className="list-decimal pt-5 pl-5 text-xs md:text-sm">
              <li className="pb-2">
                Syarat dan Ketentuan ini berlaku sejak Anda menggunakan Layanan
                dan tetap berlaku selama Anda belum melakukan penutupan akun
                pada Life by IFG atau Anda memiliki akun Aplikasi Life by IFG
                yang aktif.
              </li>
              <li className="pb-2">
                Anda sepakat dan mengikatkan diri untuk tidak melakukan tindakan
                apapun yang dapat membatasi, menghambat dan/atau mengurangi satu
                atau lebih hak dan/atau wewenang Perusahaan berdasarkan Syarat
                dan Ketentuan ini maupun hukum yang berlaku.
              </li>
              <li className="pb-2">
                Anda dengan ini sepakat untuk menyampingkan ketentuan Pasal 1266
                ayat (2) dan (3) Kitab Undang-undang Hukum Perdata sehingga
                Syarat dan Ketentuan, dan/atau Layanan dapat diakhiri (baik
                sebagian maupun seluruhnya, baik sementara waktu maupun
                seterusnya) sesuai dengan Syarat dan Ketentuan tanpa diperlukan
                adanya keputusan atau penetapan dari hakim pengadilan
              </li>
              <li className="pb-2">
                Seluruh persetujuan, kuasa, wewenang dan/atau hak yang Anda
                berikan kepada Perusahaan dalam Syarat dan Ketentuan ini tidak
                dapat berakhir karena alasan apapun termasuk karena
                alasan-alasan sebagaimana dimaksud dalam Pasal 1813, 1814, dan
                1816 Kitab Undang-Undang Hukum Perdata selama Anda masih
                menggunakan Layanan atau Aplikasi Life by IFG atau masih
                menggunakan dan/atau memiliki akun.
              </li>
              <li className="pb-2">
                Anda dengan ini membebaskan Perusahaan dari seluruh klaim
                sehubungan dengan pelaksanaan segala tindakan Perusahaan
                berdasarkan kuasa, wewenang dan/atau hak yang Anda berikan
                kepada Perusahaan dalam atau berdasarkan Syarat dan Ketentuan
                maupun pelaksanaan hak atau wewenang Perusahaan berdasarkan
                Syarat dan Ketentuan.
              </li>
            </ul>
          </div>

          <div id="keterpisahan" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              L. Keterpisahan
            </p>
            <p className="pt-[20px] pl-[10px] text-[10px] md:text-base lg:text-lg">
              Jika terdapat ketentuan dalam Syarat dan Ketentuan ini yang
              diketahui menjadi batal, tidak sah, tidak berlaku atau tidak dapat
              diberlakukan, maka ketentuan lainnya dari syarat dan ketentuan ini
              tidak akan terpengaruh. Apabila timbul permasalahan dalam
              penggunaan Layanan, maka hal tersebut tidak secara otomatis
              menimbulkan permasalahan dalam penggunaan Aplikasi Life by IFG
              secara menyeluruh, kecuali terbukti bahwa permasalahan dalam
              layanan dan/atau penggunaan produk tersebut mengakibatkan
              terlanggarnya Syarat dan Ketentuan penggunaan Aplikasi Life by IFG
              ini.
            </p>
          </div>

          <div id="perubahan" className="pb-[30px]">
            <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
              M. Perubahan
            </p>
            <p className="pt-[20px] pl-[10px] text-[10px] md:text-base lg:text-lg">
              Perusahaan berhak untuk, dari waktu ke waktu, melakukan perubahan,
              penambahan, dan/atau modifikasi atas seluruh atau sebagian dari
              isi Syarat dan Ketentuan ini dan kebijakan privasi dengan
              mengumumkannya kepada Anda antara lain melalui Aplikasi Life by
              IFG, situs Perusahaan dan media lain milik Perusahaan. Anda
              memahami dan menyetujui bahwa apabila Anda menggunakan layanan
              Aplikasi Life by IFG secara terus-menerus dan berlanjut setelah
              perubahan, penambahan dan/atau modifikasi atas seluruh atau
              sebagian dari isi Syarat dan Ketentuan merupakan bentuk
              persetujuan Anda atas perubahan, penambahan dan/atau modifikasi
              tersebut.
            </p>
            <p className="pt-[20px] pl-[10px] text-[10px] md:text-base lg:text-lg">
              Dengan melakukan klik persetujuan pada bagian bawah Syarat dan
              Ketentuan ini, atau apabila Anda tetap mengakses dan menggunakan
              Layanan ini setelah pemberitahuan pembaruan dari Perusahaan, maka
              Anda dianggap menyetujui perubahan-perubahan atas Syarat dan
              Ketentuan ini, sepanjang perubahan-perubahan tersebut tidak
              menyangkut perubahan tujuan pemrosesan data pribadi Anda.
            </p>
          </div>
        </div>
      )}

      <div
        onClick={() => expandCollapseCell(2)}
        className="flex justify-center w-full relative py-5 border-b ">
        <div
          role="button"
          id="kebijakanprivasi"
          className="flex relative items-center rounded-[12px] px-8 py-4 h-20 w-full shadow-sm border"
          // style={{ boxShadow: `0px 12px 12px rgba(185, 186, 192, 0.3)` }}>
        >
          <span className="flex-row font-bold text-[10px] md:text-base">
            KEBIJAKAN PRIVASI IFG LIFE
          </span>
          <Icon
            className="font-normal ml-auto text-[#ED1C24] self-center"
            icon={showDetail[2] ? chevronUp : chevronDown}
          />
        </div>
      </div>
      {
        // for accordion
        // <div id="detail-2"
        // ref={contentEl}
        // className=" transition flex flex-col items-center w-full px-[30px]"
        // style={
        //   showDetail[2]
        //     ? { height:contentEl.current.scrollHeight,opacity:"1",marginTop:"30px"}
        //     : { height:"0px",opacity:"0",marginTop:"0px"}
        // }>
        showDetail[2] && (
          <div
            id="detail-2"
            className=" transition flex flex-col items-center w-full px-5 max-h-[35vh] overflow-y-scroll">
            <div id="privasi-pembukaan" className="pb-[30px]">
              <p className="pt-5 pl-5 text-xs md:text-sm">
                Kebijakan Privasi ini menjelaskan bagaimana kami, PT Asuransi
                Jiwa IFG ("Perusahaan"), termasuk perusahaan afiliasi, anak
                perusahaan dan/atau perusahaan asosiasi (“Perusahaan Afiliasi"),
                melakukan pemrosesan data, termasuk pengumpulan, pengolahan,
                penganalisisan, penyimpanan, pengungkapan, perbaikan,
                penghapusan, atau pemusnahan data-data pribadi Anda yang
                diperoleh karena Anda menggunakan layanan Perusahaan, meliputi
                pembelian Polis asuransi, pengajuan klaim, pengecekan saldo dana
                investasi, pengkinian data dan lain-lain; dan/atau situs
                web/portal Perusahaan, fitur, aplikasi, media sosial ataupun
                bentuk lainnya yang yang disediakan oleh Perusahaan melalui
                jaringan seluler maupun jaringan internet dari waktu ke waktu
                (seluruhnya kemudian disebut “Layanan”).
              </p>
              <p className="pt-5 pl-5 text-xs md:text-sm">
                Kebijakan Privasi ini berlaku bagi seluruh pengguna Layanan
                Perusahaan termasuk aplikasi, platform, atau berbagai media
                lainnya, kecuali apabila diatur dalam kebijakan privasi yang
                terpisah.
              </p>
            </div>

            <div id="pendahuluan" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                1. Pendahuluan
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Mohon diperhatikan saat Anda menggunakan Layanan bahwa mungkin
                terdapat berbagai link ke situs web/portal lain yang disediakan
                demi kenyamanan Anda. Perusahaan dalam hal ini tidak bertanggung
                jawab terhadap kebijakan pengelolaan informasi pribadi di
                situs-situs tersebut. Kebijakan ini hanya ditujukan dan
                diberlakukan terhadap Layanan Perusahaan. Perusahaan sangat
                menganjurkan Anda untuk selalu melihat dan mempelajari kebijakan
                pengelolaan informasi pribadi di situs-situs tersebut sebelum
                memberikan informasi pribadi Anda.
              </p>
            </div>

            <div id="data-informasi" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                2. Data Informasi yang Dikumpulkan
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Data informasi yang dikumpulkan dalam penyelenggaraan Layanan,
                antara lain:
              </p>
              <ul className="list-decimal pt-2 pl-10 text-xs md:text-sm">
                <li className="pb-2">
                  Data pribadi yang dibutuhkan oleh Perusahaan untuk
                  menyelenggarakan Layanan Perusahaan, termasuk namun tidak
                  terbatas pada:
                  <ul className="list-none py-[5px] pl-[2vw]">
                    <li className="pb-2">a. Nomor Induk Kependudukan;</li>
                    <li className="pb-2">b. Nomor Kartu Keluarga;</li>
                    <li className="pb-2">c. Nama/Inisial;</li>
                    <li className="pb-2">d. Foto;</li>
                    <li className="pb-2">e. Sidik jari;</li>
                    <li className="pb-2">f. Alamat tempat tinggal;</li>
                    <li className="pb-2">g. Tanggal lahir;</li>
                    <li className="pb-2">h. Jenis kelamin;</li>
                    <li className="pb-2">i. Pekerjaan;</li>
                    <li className="pb-2">j. Penghasilan;</li>
                    <li className="pb-2">
                      k. Nomor telepon kantor/rumah dan/atau
                    </li>
                    <li className="pb-2">
                      l. data-data pendukung lainnya yang dibutuhkan oleh
                      Perusahaan.
                    </li>
                  </ul>
                </li>
                <li className="pb-2">
                  Selain data pribadi yang telah disebutkan di atas, Anda
                  memiliki pilihan untuk memberikan data pribadi tambahan kepada
                  Perusahaan untuk kebutuhan personalisasi akun.
                </li>
                <li className="pb-2">
                  Data penelusuran atas informasi yang dikumpulkan ketika Anda
                  menggunakan Layanan. Informasi yang berkenaan dengan data Anda
                  termasuk namun tidak terbatas pada:
                  <ul className="list-none py-[5px] pl-[2vw]">
                    <li className="pb-2">
                      i. Informasi Uniform Resource Locator (URL) yang Anda
                      kunjungi;
                    </li>
                    <li className="pb-2">
                      ii. Data cookie (saat Anda mengunjungi situs web/portal
                      Perusahaan, maka Perusahaan akan mengumpulkan bagian data
                      tentang Anda yang disimpan di perangkat, yang memungkinkan
                      Perusahaan untuk mengetahui ketika Anda mengunjungi situs
                      Perusahaan di masa mendatang);
                    </li>
                    <li className="pb-2">
                      iii. Advertising ID yang digunakan Perusahaan untuk
                      penyelenggaraan aktivitas periklanan;
                    </li>
                    <li className="pb-2">
                      iv. Log file (data log hanya digunakan dalam bentuk
                      agregat (keseluruhan) untuk menganalisa penggunaan Layanan
                      yang dimiliki Perusahaan);
                    </li>
                    <li className="pb-2">
                      v. Alamat IP (Perusahaan menyimpan IP{' '}
                      <em>(Internet Protocol) address</em>, atau lokasi
                      perangkat Anda di Internet, untuk keperluan administrasi
                      sistem dan <em>troubleshooting</em>. Perusahaan
                      menggunakan IP <em>address</em> secara agregat
                      (keseluruhan) untuk mengetahui lokasi-lokasi yang
                      mengakses Layanan yang dimiliki Perusahaan);
                    </li>
                    <li className="pb-2">
                      vi Informasi mengenai tipe perangkat yang Anda gunakan,
                      seperti ID unik perangkat, tipe koneksi jaringan seluler,
                      penyelenggara, jaringan dan kinerja perangkat, tipe
                      browser, bahasa, informasi yang memungkinkan pengelolaan
                      hak digital, dan sistem operasi;
                    </li>
                  </ul>
                </li>
                <li className="pb-2">
                  Metadata tertentu yang didapat dari penggunaan produk
                  Perusahaan, termasuk namun tidak terbatas pada;
                  <ul className="list-none py-[5px] pl-[2vw]">
                    <li className="pb-2">
                      a. Data olahan teknis, seperti{' '}
                      <em>mobile positioning, telco score, location scoring</em>
                      , dan <em>advance profiling;</em>
                    </li>
                    <li className="pb-2">
                      b. Metadata aktivitas pemakaian Anda (aktivasi kartu,
                      panggilan suara), penggunaan data, aktivasi layanan{' '}
                      <em>Value-Added Services</em> (“VAS”), pengisian deposit
                      berbayar, pembayaran tagihan, transfer deposit berbayar,
                      pembelian konten dan paket, serta pemrofilan dan
                      segmentasi Anda;
                    </li>
                  </ul>
                </li>
                <li className="pb-2">
                  Data dari pemasok, mitra bisnis dan/atau pihak ketiga lainnya
                  yang berpartisipasi dalam proses pengadaan barang atau jasa,
                  mengadakan kerja sama, atau pengaturan dalam aktivitas
                  tertentu dengan Perusahaan, termasuk namun tidak terbatas
                  pada:
                  <ul className="list-none py-[5px] pl-[2vw]">
                    <li className="pb-2">
                      a. Data mitra otentikasi adalah data yang didapat apabila
                      Anda mendaftar atau masuk untuk menggunakan Layanan
                      Perusahaan menggunakan kredensial pihak ketiga, Perusahaan
                      akan mengumpulkan informasi Anda dari pihak ketiga
                      tersebut untuk membantu Anda membuat akun pada Layanan
                      Perusahaan sepanjang Anda telah memberikan persetujuan
                      kepada layanan pihak ketiga tersebut;
                    </li>
                    <li className="pb-2">
                      b. Data mitra pembayaran adalah data yang didapat apabila
                      Anda memilih untuk membayar suatu Layanan atau fitur
                      dengan tagihan, Perusahaan mungkin menerima data dari
                      mitra pembayaran agar Perusahaan dapat mengirimkan tagihan
                      kepada Anda, memproses pembayaran Anda dan memberikan apa
                      yang Anda beli kepada Anda. Dalam hal terdapat tambahan
                      data informasi yang akan Perusahaan kumpulkan dari Anda,
                      Perusahaan akan meminta persetujuan tambahan dari Anda
                      dengan tetap memperhatikan perlindungan data pribadi Anda.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div id="tujuan-pengumpulan-data-informasi" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                3. Tujuan Pengumpulan dan Pengolahan Data Informasi
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Perusahaan memiliki tujuan untuk mengumpulkan dan mengolah Data
                Informasi sebagaimana dijelaskan di atas, dengan tetap
                memperhatikan persetujuan yang Anda berikan atas masing-masing
                tujuan, sebagai berikut:
              </p>
              <ul className="list-decimal pt-2 pl-10 text-xs md:text-sm">
                <li className="pb-2">
                  Untuk berkomunikasi, menjalankan prinsip Know Your Customer
                  (KYC), penentuan kredit (credit scoring) dan memberikan
                  personalisasi kepada Anda terhadap pemakaian Layanan yang
                  dimiliki oleh Perusahaan;
                </li>
                <li className="pb-2">
                  Untuk melakukan diagnosa dan penyelesaian masalah terkait
                  kesulitan dalam pengaksesan Layanan (troubleshoot);
                </li>
                <li className="pb-2">
                  Untuk menyelenggarakan Layanan, mengevaluasi, dan
                  mengembangkan fitur Layanan Perusahaan dari waktu ke waktu;
                </li>
                <li className="pb-2">
                  Untuk menganalisis aktivitas, perilaku, dan data demografis
                  Pengguna termasuk kebiasaan dan penggunaan berbagai Layanan;
                </li>
                <li className="pb-2">
                  Untuk menyelenggarakan undian, kontes maupun memberikan reward
                  sebagai bentuk loyalty lainnya kepada Anda;
                </li>
                <li className="pb-2">
                  Untuk memproses maupun memfasilitasi pembayaran Anda;
                </li>
                <li className="pb-2">
                  Untuk menawarkan iklan/promosi maupun penawaran dari pihak
                  lain yang bekerja sama dengan Perusahaan;
                </li>
                <li className="pb-2">
                  Untuk menjalankan mandat peraturan perundang-undangan;
                </li>
                <li className="pb-2">
                  Untuk mengolah dan menanggapi pertanyaan dan saran yang
                  diterima dari Anda;
                </li>
                <li className="pb-2">
                  untuk pemeriksaan referensi dan informasi dalam hal memeriksa
                  identitas serta untuk mencegah penipuan dan pencucian uang;
                </li>
                <li className="pb-2">
                  Untuk dapat dihubungkan ke, dan disimpan di, pusat data
                  Perusahaan, Perusahaan Afiliasi dan/atau pihak lainnya yang
                  tunduk pada perjanjian penyimpanan data dengan Perusahaan
                  untuk jangka waktu dan sebagaimana yang disyaratkan
                  berdasarkan peraturan yang berlaku;
                </li>
                <li className="pb-2">
                  Untuk dapat diproses oleh Perusahaan, Perusahaan Afiliasi
                  Perusahaan dan/atau pihak lainnya yang tunduk pada perjanjian
                  kolaborasi pengelolaan data dengan Perusahaan untuk
                  kepentingan kegiatan pemanfaatan Data Informasi untuk
                  menyempurnakan mutu pelayanan Perusahaan dan/atau Perusahaan
                  Afiliasi Perusahaan termasuk berdasarkan pengalaman Pengguna,
                  memperluas kegiatan usaha Perusahaan dan/atau Perusahaan
                  Afiliasi Perusahaan serta meningkatkan nilai perusahaan
                  termasuk sumber pendapatan Perusahaan dan/atau perusahaan
                  afiliasi Perusahaan berdasarkan rencana usaha yang telah
                  disusun oleh masing-masing dari Perusahaan dan/atau Perusahaan
                  Afiliasi Perusahaan. Dalam klausul ini, "Pemrosesan Data
                  Informasi” termasuk pengambilan keputusan yang didasarkan pada
                  pemrosesan secara otomatis atau manual terkait profil Anda
                  (profiling). Istilah memproses, diproses atau proses memiliki
                  arti korelasi yang sama dengan Pemrosesan.
                </li>
              </ul>
            </div>

            <div id="pengungkapan-data-informasi" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                4. Pengungkapan Data Informasi
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Data Informasi yang dikumpulkan oleh Perusahaan dapat
                diungkapkan kepada pemerintah, ataupun pihak lain yang berwenang
                berdasarkan basis hukum yang sah, dalam kondisi/tujuan antara
                lain:
              </p>
              <ul className="list-decimal pt-2 pl-10 text-xs md:text-sm">
                <li className="pb-2">
                  Di bawah hukum yang berlaku atau untuk menanggapi proses
                  hukum, seperti surat perintah penggeledahan, perintah
                  pengadilan, atau panggilan pengadilan;
                </li>
                <li className="pb-2">
                  Untuk melindungi keselamatan Perusahaan dan perusahaan
                  afiliasi, keselamatan Anda atau keselamatan orang lain atau
                  demi kepentingan sah pihak manapun dalam konteks keamanan
                  nasional, penegakan hukum, litigasi, investigasi kriminal atau
                  untuk mencegah wabah, keadaan darurat yang telah ditetapkan
                  oleh Pemerintah;
                </li>
                <li className="pb-2">
                  Untuk kepentingan investigasi internal atas tindak pidana atau
                  pelanggaran peraturan atau kebijakan di lingkungan Perusahaan
                  dan Perusahaan Afiliasi;
                </li>
                <li className="pb-2">
                  Jika diperlukan sehubungan dengan proses hukum yang diajukan
                  terhadap Perusahaan, pejabat, karyawan, afiliasi, atau
                  vendornya;
                </li>
                <li className="pb-2">
                  Pengungkapan data dan informasi nasabah kepada pihak
                  regulator;
                </li>
                <li className="pb-2">
                  Untuk menetapkan, melaksanakan, melindungi, mempertahankan,
                  dan menegakkan hak-hak hukum Perusahaan.
                </li>
                <li className="pb-2">
                  Dalam rangka pengungkapan data dengan mitra dan/atau
                  Perusahaan Afiliasi, di mana Perusahaan dengan iktikad baik
                  dapat memberikannya dalam bentuk agregat. Dalam hal Perusahaan
                  melakukan pengungkapan data bukan agregat, Perusahaan akan
                  melakukan upaya-upaya terbaik untuk melindungi data Anda,
                  seperti namun tidak terbatas pada dilakukan secara anonim
                  (dengan menghilangkan identifikasi personal milik Anda) dan
                  dilaksanakan setelah dilakukannya penandatanganan perjanjian
                  kerahasiaan.
                </li>
                <li className="pb-2">
                  Dalam hal kerja sama dengan supplier, vendor, dan penyedia
                  jasa yang bekerja atas nama Perusahaan, dengan tujuan untuk
                  menyelenggarakan Layanan, membantu melindungi dan mengamankan
                  sistem dan layanan Perusahaan.
                </li>
                <li className="pb-2">
                  Untuk bekerja sama dengan mitra dan Perusahaan Afiliasi guna
                  peningkatan pengalaman Anda pada Layanan, yang hanya akan
                  dilakukan sesuai dengan tujuan pemrosesan sebagaimana
                  disampaikan sebelumnya, atau untuk melindungi kepentingan
                  Pengguna, serta tunduk pada perjanjian kolaborasi pengelolaan
                  data dengan Perusahaan.
                </li>
                <li className="pb-2">
                  Terjadinya penggabungan, penjualan aset perusahaan,
                  konsolidasi atau restrukturisasi, pembiayaan atau akuisisi
                  seluruh atau sebagian dari bisnis Perusahaan oleh dan/atau ke
                  perusahaan lain, untuk keperluan transaksi tersebut. Tindakan
                  ini dilindungi oleh perjanjian kerahasiaan antara Perusahaan
                  dengan pihak ketiga yang terkait.
                </li>
                <li className="pb-2">
                  Untuk melaksanakan kegiatan-kegiatan sebagaimana dijelaskan
                  pada bagian Tujuan Pengumpulan dan Pengolahan Data.
                </li>
              </ul>
            </div>

            <div id="penyimpanan-data-informasi" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                5. Penyimpanan Data Informasi
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Perusahaan berkomitmen untuk mengumpulkan, memproses dan
                menyimpan data pribadi Anda secara enkripsi ataupun metode
                lainnya, dengan perlindungan terbaik berdasarkan peraturan
                perundang-undangan untuk menyediakan Layanan ini. Penyimpanan
                Data Informasi dapat dilakukan di wilayah Indonesia maupun di
                luar wilayah Indonesia dengan tetap mematuhi kewajiban atas
                akses dan efektivitas pengawasan sesuai hukum yang berlaku.
                Perusahaan akan mengumpulkan, memproses, dan menyimpan seluruh
                data Anda sesuai dengan peraturan perundang-undangan yang
                berlaku yang di kemudian hari dapat dipergunakan oleh Perusahaan
                untuk memberikan pelayanan, memberi informasi produk terbaru
                dan/atau informasi terkait lainnya.
              </p>
            </div>

            <div id="perbaikan-data-pribadi" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3border-b-[0.75px] border-solid border-[#AEB1B4]">
                6. Perbaikan Data Pribadi
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Dalam hal Anda menemukan kekeliruan yang ditampilkan mengenai
                data pribadi Anda dikarenakan ketidakakuratan atau diperlukan
                dilakukan pembaruan atas data pribadi Anda, maka Anda dapat
                meminta kepada Perusahaan untuk memperbaiki dan atau memperbarui
                data pribadi Anda yang berada dalam pengelolaan Perusahaan,
                dengan menghubungi saluran komunikasi yang tersedia berdasarkan
                Syarat dan Ketentuan.
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Anda diimbau untuk turut berperan aktif memastikan keakuratan
                dan pembaruan data Anda dari waktu ke waktu.
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Perusahaan tidak bertanggung jawab apabila terjadi pembaharuan
                data yang diberikan tidak akurat atau bahkan tidak dilakukan
                pembaharuan atas kelalaian atau tidak ada respon apabila
                terdapat permintaan pembaharuan data dari Perusahaan yang
                mengakibatkan kesalahan/kekeliruan atas layanan yang diberikan
                oleh Perusahaan.
              </p>
            </div>

            <div
              id="penghapusan-dan-pemusnahan-data-informasi"
              className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                7. Penghapusan dan Pemusnahan Data Informasi
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Sesuai dengan aturan perundangan yang berlaku, atas
                permintaan/permohonan Anda dan/atau telah melewati periode
                retensi sesuai ketentuan perundang-undangan yang berlaku,
                Perusahaan dapat menghapus (right to erasure) dan/atau
                memusnahkan Data Informasi Anda dari sistem (right to delisting)
                agar data tersebut tidak lagi mengidentifikasi Anda, kecuali
                dalam hal:
              </p>
              <ul className="list-decimal pt-2 pl-10 text-xs md:text-sm">
                <li className="pb-2">
                  Apabila Perusahaan perlu menyimpan Data Informasi untuk
                  memenuhi kewajiban hukum, pajak, audit, dan akuntansi,
                  Perusahaan akan menyimpan Data Informasi yang diperlukan
                  selama anda menggunakan layanan Perusahaan atau sesuai jangka
                  waktu yang disyaratkan oleh perundang-undangan yang berlaku;
                </li>
                <li className="pb-2">
                  Data pribadi dalam Data Informasi Anda masih berada dalam
                  periode retensi berdasarkan peraturan perundang-undangan yang
                  berlaku; dan/atau,
                </li>
                <li className="pb-2">
                  Untuk keperluan pemusnahan data pribadi dalam data informasi
                  Anda dari sistem (right to delisting), diperlukan penetapan
                  pengadilan yang diajukan oleh Anda agar Perusahaan dapat
                  memusnahkan data pribadi dalam Data Informasi Anda yang tidak
                  relevan dari daftar mesin pencari yang berada di bawah
                  pengelolaan Perusahaan.
                </li>
              </ul>
            </div>

            <div id="keamanan-data-informasi" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                8. Keamanan Data Informasi
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Kerahasiaan Data Informasi Anda adalah hal yang terpenting bagi
                Perusahaan. Perusahaan akan memberlakukan upaya terbaik untuk
                melindungi dan mengamankan Data Informasi Anda dari akses
                pengumpulan, pengolahan, penganalisisan, penyimpanan,
                pengungkapan, perbaikan dan penghapusan oleh pihak-pihak yang
                tidak berwenang. Perusahaan akan berusaha sebaik mungkin untuk
                menjaga keamanan dan melindungi Data Informasi Anda. Perusahaan
                dengan ini menjamin keutuhan dan keakuratan Data Informasi apa
                pun yang Anda kirimkan melalui Layanan dengan melakukan
                verifikasi dan Perusahaan juga menjamin akan melakukan upaya
                terbaik untuk mencegah Data Informasi tersebut dicegat, diakses,
                diungkapkan, diubah atau dihancurkan oleh pihak ketiga yang
                tidak berwenang.
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Dalam hal terjadi akses dan kegiatan illegal atau kegagalan
                perlindungan data pribadi atas kerahasiaan Data Informasi Anda
                baik yang berada di dalam kendali perusahaan ataupun yang berada
                di luar kendali Perusahaan, maka Perusahaan akan memberitahukan
                kepada Anda sesuai dengan ketentuan perundang-undangan yang
                berlaku sehingga Anda dapat mengurangi risiko yang timbul atas
                hal tersebut. Perusahaan telah memiliki prosedur operasional
                untuk menanggulangi kondisi kegagalan perlindungan data pribadi.
                Pada kondisi terdapat Pemrosesan Data Informasi yang dilakukan
                oleh pihak ketiga yang tidak sesuai dengan prosedur sebagaimana
                diatur dalam Kebijakan Privasi ini, maka tanggung jawab atas hal
                tersebut terdapat pada masingmasing pihak ketiga yang melakukan
                Pemrosesan Data Informasi.
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Anda bertanggung jawab untuk menjaga kerahasiaan detail data
                Anda, termasuk username, password, email maupun OTP dengan
                siapapun dan harus selalu menjaga dan bertanggung jawab atas
                keamanan perangkat yang Anda gunakan. Anda akan membebaskan
                Perusahaan dari segala bentuk kerugian atau tuntutan dalam hal
                Anda lalai dalam menjaga kerahasiaan detail akun Anda, termasuk
                username, password, email maupun OTP, serta dalam hal Anda lalai
                dalam menjaga keamanan perangkat yang Anda gunakan.
              </p>
            </div>

            <div id="pembaruan-kebijakan-privasi" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                9. Pembaruan Kebijakan Privasi
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Kebijakan Privasi ini dapat diubah dan/atau diperbarui dari
                waktu ke waktu, dengan tujuan untuk memastikan Kebijakan Privasi
                ini sesuai dengan perkembangan bisnis dan/atau perkembangan
                hukum yang terjadi. Sehubungan dengan hal ini, Perusahaan akan
                memberitahukan perubahan dan/atau pembaruan tersebut kepada
                Pengguna sesuai dengan ketentuan peraturan perundang-undangan
                yang berlaku. Dengan melakukan klik atau tindakan persetujuan
                pada Kebijakan Privasi ini, atau apabila Anda tetap mengakses
                dan menggunakan Layanan ini setelah pemberitahuan pembaharuan
                dari Perusahaan, maka Anda dianggap menyetujui
                perubahan-perubahan atas Kebijakan Privasi ini, sepanjang
                perubahan-perubahan tersebut tidak menyangkut perubahan
                informasi mengenai cakupan Data Informasi yang dikumpulkan,
                Tujuan Pengolahan dan Pengumpulan Data, serta perubahan lainnya
                yang berdampak pada Pemrosesan Data Informasi secara
                keseluruhan.
              </p>
            </div>

            <div id="pengaturan-layanan" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                10. Pengaturan Layanan
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Anda dapat memilih untuk tidak menerima layanan pemasaran,
                periklanan, atau aktivitas lainnya yang terkait dengan
                pengolahan data dengan menghubungi Perusahaan melalui detail
                kontak yang tersedia atau mekanisme lain yang disiapkan oleh
                masing-masing Layanan. Mohon perhatikan jika Anda memilih untuk
                tidak menerima layanan pemasaran, periklanan, atau aktivitas
                lainnya yang terkait dengan pengolahan data, sebagai bentuk
                pemenuhan hak Pengguna, Perusahaan tetap dapat mengirimi Anda
                pesan terkait penyelenggaraan Layanan Perusahaan, termasuk namun
                tidak terbatas pada tanda terima transaksi, notifikasi masa
                berlaku, dan SMS konfirmasi Layanan.
              </p>
            </div>

            <div id="pengakuan-dan-persetujuan" className="pb-[30px]">
              <p className="font-semibold text-[12px] md:text-lg lg:text-xl text-primary-90 pb-3 border-b-[0.75px] border-solid border-[#AEB1B4]">
                11. Pengakuan dan Persetujuan
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Dengan menyetujui Kebijakan Privasi, Anda mengakui bahwa anda
                telah membaca dan memahami Kebijakan Privasi ini dan menyetujui
                segala ketentuannya. Secara khusus, Anda setuju dan memberikan
                persetujuan kepada kami untuk melaksanakan pengumpulan,
                pengolahan, penganalisisan, penyimpanan, pengungkapan, perbaikan
                dan penghapusan data-data pribadi milik Anda sesuai dengan
                Kebijakan Privasi ini.
              </p>
              <p className="pt-2 pl-5 text-xs md:text-sm">
                Dalam hal Anda berusia di bawah persyaratan usia minimum atau
                termasuk dalam kategori anak sesuai dengan ketentuan peraturan
                perundang-undangan yang berlaku, maka persetujuan atas
                Pemrosesan data pribadi Anda harus diberikan oleh orang tua
                (bapak atau ibu) atau wali dari Pengguna sesuai dengan ketentuan
                peraturan perundang-undangan yang berlaku
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
}
