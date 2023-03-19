import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Container } from '@cp-component';
import { BtnBack } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import locale from './locale';

export default function Page(props) {
  const router = useRouter();
  const { lang } = props;
  return (
    <Container>
      <div className="w-full md:h-[70vh] bg-gray-50">
        <div className="w-full h-full">
          <div className="w-[100%] h-[10%] bg-white shadow-lg z-30 flex flex-row relative">
            <div
              role="button"
              onClick={() => router.back()}
              className="ml-5 flex justify-center items-center">
              <Image src={BtnBack} width={24} height={24} />
            </div>
            <div className="flex justify-center items-center mr-10 w-full text-xl font-bold">
              {trans(locale, lang, 'kebijakanPrivasi')}
            </div>
          </div>
          <div className="w-full h-[70%] overflow-y-auto mb-5 px-4 bg-white grid place-items-center">
            <div id="pengantar" className="w-[90%] pb-[30px] mt-[30px]">
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Kebijakan Privasi ini berlaku bagi seluruh pengguna Layanan
                Perusahaan termasuk aplikasi, platform, atau berbagai media
                lainnya, kecuali apabila diatur dalam kebijakan privasi yang
                terpisah.
              </p>
            </div>
            <div id="pendahuluan" className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                1. Pendahuluan
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
            <div id="data-informasi" className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                2. Data Informasi yang Dikumpulkan
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Data informasi yang dikumpulkan dalam penyelenggaraan Layanan,
                antara lain:
              </p>
              <ul className="list-decimal pt-[20px] pl-[22px] text-sm opacity-70">
                <li className="pb-[5px]">
                  Data pribadi yang dibutuhkan oleh Perusahaan untuk
                  menyelenggarakan Layanan Perusahaan, termasuk namun tidak
                  terbatas pada:
                  <ul className="list-none py-[5px] pl-[2vw]">
                    <li className="pb-[5px]">a. Nomor Induk Kependudukan;</li>
                    <li className="pb-[5px]">b. Nomor Kartu Keluarga;</li>
                    <li className="pb-[5px]">c. Nama/Inisial;</li>
                    <li className="pb-[5px]">d. Foto;</li>
                    <li className="pb-[5px]">e. Sidik jari;</li>
                    <li className="pb-[5px]">f. Alamat tempat tinggal;</li>
                    <li className="pb-[5px]">g. Tanggal lahir;</li>
                    <li className="pb-[5px]">h. Jenis kelamin;</li>
                    <li className="pb-[5px]">i. Pekerjaan;</li>
                    <li className="pb-[5px]">j. Penghasilan;</li>
                    <li className="pb-[5px]">
                      k. Nomor telepon kantor/rumah dan/atau
                    </li>
                    <li className="pb-[5px]">
                      l. data-data pendukung lainnya yang dibutuhkan oleh
                      Perusahaan.
                    </li>
                  </ul>
                </li>
                <li className="pb-[5px]">
                  Selain data pribadi yang telah disebutkan di atas, Anda
                  memiliki pilihan untuk memberikan data pribadi tambahan kepada
                  Perusahaan untuk kebutuhan personalisasi akun.
                </li>
                <li className="pb-[5px]">
                  Data penelusuran atas informasi yang dikumpulkan ketika Anda
                  menggunakan Layanan. Informasi yang berkenaan dengan data Anda
                  termasuk namun tidak terbatas pada:
                  <ul className="list-none py-[5px] pl-[2vw]">
                    <li className="pb-[5px]">
                      i. Informasi Uniform Resource Locator (URL) yang Anda
                      kunjungi;
                    </li>
                    <li className="pb-[5px]">
                      ii. Data cookie (saat Anda mengunjungi situs web/portal
                      Perusahaan, maka Perusahaan akan mengumpulkan bagian data
                      tentang Anda yang disimpan di perangkat, yang memungkinkan
                      Perusahaan untuk mengetahui ketika Anda mengunjungi situs
                      Perusahaan di masa mendatang);
                    </li>
                    <li className="pb-[5px]">
                      iii. Advertising ID yang digunakan Perusahaan untuk
                      penyelenggaraan aktivitas periklanan;
                    </li>
                    <li className="pb-[5px]">
                      iv. Log file (data log hanya digunakan dalam bentuk
                      agregat (keseluruhan) untuk menganalisa penggunaan Layanan
                      yang dimiliki Perusahaan);
                    </li>
                    <li className="pb-[5px]">
                      v. Alamat IP (Perusahaan menyimpan IP{' '}
                      <em>(Internet Protocol) address</em>, atau lokasi
                      perangkat Anda di Internet, untuk keperluan administrasi
                      sistem dan <em>troubleshooting</em>. Perusahaan
                      menggunakan IP <em>address</em> secara agregat
                      (keseluruhan) untuk mengetahui lokasi-lokasi yang
                      mengakses Layanan yang dimiliki Perusahaan);
                    </li>
                    <li className="pb-[5px]">
                      vi Informasi mengenai tipe perangkat yang Anda gunakan,
                      seperti ID unik perangkat, tipe koneksi jaringan seluler,
                      penyelenggara, jaringan dan kinerja perangkat, tipe
                      browser, bahasa, informasi yang memungkinkan pengelolaan
                      hak digital, dan sistem operasi;
                    </li>
                  </ul>
                </li>
                <li className="pb-[5px]">
                  Metadata tertentu yang didapat dari penggunaan produk
                  Perusahaan, termasuk namun tidak terbatas pada;
                  <ul className="list-none py-[5px] pl-[2vw]">
                    <li className="pb-[5px]">
                      a. Data olahan teknis, seperti{' '}
                      <em>mobile positioning, telco score, location scoring</em>
                      , dan <em>advance profiling;</em>
                    </li>
                    <li className="pb-[5px]">
                      b. Metadata aktivitas pemakaian Anda (aktivasi kartu,
                      panggilan suara), penggunaan data, aktivasi layanan{' '}
                      <em>Value-Added Services</em> (“VAS”), pengisian deposit
                      berbayar, pembayaran tagihan, transfer deposit berbayar,
                      pembelian konten dan paket, serta pemrofilan dan
                      segmentasi Anda;
                    </li>
                  </ul>
                </li>
                <li className="pb-[5px]">
                  Data dari pemasok, mitra bisnis dan/atau pihak ketiga lainnya
                  yang berpartisipasi dalam proses pengadaan barang atau jasa,
                  mengadakan kerja sama, atau pengaturan dalam aktivitas
                  tertentu dengan Perusahaan, termasuk namun tidak terbatas
                  pada:
                  <ul className="list-none py-[5px] pl-[2vw]">
                    <li className="pb-[5px]">
                      a. Data mitra otentikasi adalah data yang didapat apabila
                      Anda mendaftar atau masuk untuk menggunakan Layanan
                      Perusahaan menggunakan kredensial pihak ketiga, Perusahaan
                      akan mengumpulkan informasi Anda dari pihak ketiga
                      tersebut untuk membantu Anda membuat akun pada Layanan
                      Perusahaan sepanjang Anda telah memberikan persetujuan
                      kepada layanan pihak ketiga tersebut;
                    </li>
                    <li className="pb-[5px]">
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
            <div
              id="tujuan-pengumpulan-data-informasi"
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                3. Tujuan Pengumpulan dan Pengolahan Data Informasi
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Perusahaan memiliki tujuan untuk mengumpulkan dan mengolah Data
                Informasi sebagaimana dijelaskan di atas, dengan tetap
                memperhatikan persetujuan yang Anda berikan atas masing-masing
                tujuan, sebagai berikut:
              </p>
              <ul className="list-decimal pt-[20px] pl-[22px] text-sm opacity-70">
                <li className="pb-[5px]">
                  Untuk berkomunikasi, menjalankan prinsip Know Your Customer
                  (KYC), penentuan kredit (credit scoring) dan memberikan
                  personalisasi kepada Anda terhadap pemakaian Layanan yang
                  dimiliki oleh Perusahaan;
                </li>
                <li className="pb-[5px]">
                  Untuk melakukan diagnosa dan penyelesaian masalah terkait
                  kesulitan dalam pengaksesan Layanan (troubleshoot);
                </li>
                <li className="pb-[5px]">
                  Untuk menyelenggarakan Layanan, mengevaluasi, dan
                  mengembangkan fitur Layanan Perusahaan dari waktu ke waktu;
                </li>
                <li className="pb-[5px]">
                  Untuk menganalisis aktivitas, perilaku, dan data demografis
                  Pengguna termasuk kebiasaan dan penggunaan berbagai Layanan;
                </li>
                <li className="pb-[5px]">
                  Untuk menyelenggarakan undian, kontes maupun memberikan reward
                  sebagai bentuk loyalty lainnya kepada Anda;
                </li>
                <li className="pb-[5px]">
                  Untuk memproses maupun memfasilitasi pembayaran Anda;
                </li>
                <li className="pb-[5px]">
                  Untuk menawarkan iklan/promosi maupun penawaran dari pihak
                  lain yang bekerja sama dengan Perusahaan;
                </li>
                <li className="pb-[5px]">
                  Untuk menjalankan mandat peraturan perundang-undangan;
                </li>
                <li className="pb-[5px]">
                  Untuk mengolah dan menanggapi pertanyaan dan saran yang
                  diterima dari Anda;
                </li>
                <li className="pb-[5px]">
                  untuk pemeriksaan referensi dan informasi dalam hal memeriksa
                  identitas serta untuk mencegah penipuan dan pencucian uang;
                </li>
                <li className="pb-[5px]">
                  Untuk dapat dihubungkan ke, dan disimpan di, pusat data
                  Perusahaan, Perusahaan Afiliasi dan/atau pihak lainnya yang
                  tunduk pada perjanjian penyimpanan data dengan Perusahaan
                  untuk jangka waktu dan sebagaimana yang disyaratkan
                  berdasarkan peraturan yang berlaku;
                </li>
                <li className="pb-[5px]">
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
            <div
              id="pengungkapan-data-informasi"
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                4. Pengungkapan Data Informasi
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Data Informasi yang dikumpulkan oleh Perusahaan dapat
                diungkapkan kepada pemerintah, ataupun pihak lain yang berwenang
                berdasarkan basis hukum yang sah, dalam kondisi/tujuan antara
                lain:
              </p>
              <ul className="list-decimal pt-[20px] pl-[22px] text-sm opacity-70">
                <li className="pb-[5px]">
                  Di bawah hukum yang berlaku atau untuk menanggapi proses
                  hukum, seperti surat perintah penggeledahan, perintah
                  pengadilan, atau panggilan pengadilan;
                </li>
                <li className="pb-[5px]">
                  Untuk melindungi keselamatan Perusahaan dan perusahaan
                  afiliasi, keselamatan Anda atau keselamatan orang lain atau
                  demi kepentingan sah pihak manapun dalam konteks keamanan
                  nasional, penegakan hukum, litigasi, investigasi kriminal atau
                  untuk mencegah wabah, keadaan darurat yang telah ditetapkan
                  oleh Pemerintah;
                </li>
                <li className="pb-[5px]">
                  Untuk kepentingan investigasi internal atas tindak pidana atau
                  pelanggaran peraturan atau kebijakan di lingkungan Perusahaan
                  dan Perusahaan Afiliasi;
                </li>
                <li className="pb-[5px]">
                  Jika diperlukan sehubungan dengan proses hukum yang diajukan
                  terhadap Perusahaan, pejabat, karyawan, afiliasi, atau
                  vendornya;
                </li>
                <li className="pb-[5px]">
                  Pengungkapan data dan informasi nasabah kepada pihak
                  regulator;
                </li>
                <li className="pb-[5px]">
                  Untuk menetapkan, melaksanakan, melindungi, mempertahankan,
                  dan menegakkan hak-hak hukum Perusahaan.
                </li>
                <li className="pb-[5px]">
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
                <li className="pb-[5px]">
                  Dalam hal kerja sama dengan supplier, vendor, dan penyedia
                  jasa yang bekerja atas nama Perusahaan, dengan tujuan untuk
                  menyelenggarakan Layanan, membantu melindungi dan mengamankan
                  sistem dan layanan Perusahaan.
                </li>
                <li className="pb-[5px]">
                  Untuk bekerja sama dengan mitra dan Perusahaan Afiliasi guna
                  peningkatan pengalaman Anda pada Layanan, yang hanya akan
                  dilakukan sesuai dengan tujuan pemrosesan sebagaimana
                  disampaikan sebelumnya, atau untuk melindungi kepentingan
                  Pengguna, serta tunduk pada perjanjian kolaborasi pengelolaan
                  data dengan Perusahaan.
                </li>
                <li className="pb-[5px]">
                  Terjadinya penggabungan, penjualan aset perusahaan,
                  konsolidasi atau restrukturisasi, pembiayaan atau akuisisi
                  seluruh atau sebagian dari bisnis Perusahaan oleh dan/atau ke
                  perusahaan lain, untuk keperluan transaksi tersebut. Tindakan
                  ini dilindungi oleh perjanjian kerahasiaan antara Perusahaan
                  dengan pihak ketiga yang terkait.
                </li>
                <li className="pb-[5px]">
                  Untuk melaksanakan kegiatan-kegiatan sebagaimana dijelaskan
                  pada bagian Tujuan Pengumpulan dan Pengolahan Data.
                </li>
              </ul>
            </div>
            <div
              id="penyimpanan-data-informasi"
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                5. Penyimpanan Data Informasi
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
            <div
              id="perbaikan-data-pribadi"
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                6. Perbaikan Data Pribadi
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Dalam hal Anda menemukan kekeliruan yang ditampilkan mengenai
                data pribadi Anda dikarenakan ketidakakuratan atau diperlukan
                dilakukan pembaruan atas data pribadi Anda, maka Anda dapat
                meminta kepada Perusahaan untuk memperbaiki dan atau memperbarui
                data pribadi Anda yang berada dalam pengelolaan Perusahaan,
                dengan menghubungi saluran komunikasi yang tersedia berdasarkan
                Syarat dan Ketentuan.
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Anda diimbau untuk turut berperan aktif memastikan keakuratan
                dan pembaruan data Anda dari waktu ke waktu.
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                7. Penghapusan dan Pemusnahan Data Informasi
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Sesuai dengan aturan perundangan yang berlaku, atas
                permintaan/permohonan Anda dan/atau telah melewati periode
                retensi sesuai ketentuan perundang-undangan yang berlaku,
                Perusahaan dapat menghapus (right to erasure) dan/atau
                memusnahkan Data Informasi Anda dari sistem (right to delisting)
                agar data tersebut tidak lagi mengidentifikasi Anda, kecuali
                dalam hal:
              </p>
              <ul className="list-decimal pt-[20px] pl-[22px] text-sm opacity-70">
                <li className="pb-[5px]">
                  Apabila Perusahaan perlu menyimpan Data Informasi untuk
                  memenuhi kewajiban hukum, pajak, audit, dan akuntansi,
                  Perusahaan akan menyimpan Data Informasi yang diperlukan
                  selama anda menggunakan layanan Perusahaan atau sesuai jangka
                  waktu yang disyaratkan oleh perundang-undangan yang berlaku;
                </li>
                <li className="pb-[5px]">
                  Data pribadi dalam Data Informasi Anda masih berada dalam
                  periode retensi berdasarkan peraturan perundang-undangan yang
                  berlaku; dan/atau,
                </li>
                <li className="pb-[5px]">
                  Untuk keperluan pemusnahan data pribadi dalam data informasi
                  Anda dari sistem (right to delisting), diperlukan penetapan
                  pengadilan yang diajukan oleh Anda agar Perusahaan dapat
                  memusnahkan data pribadi dalam Data Informasi Anda yang tidak
                  relevan dari daftar mesin pencari yang berada di bawah
                  pengelolaan Perusahaan.
                </li>
              </ul>
            </div>
            <div
              id="keamanan-data-informasi"
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                8. Keamanan Data Informasi
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
            <div
              id="pembaruan-kebijakan-privasi"
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                9. Pembaruan Kebijakan Privasi
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
            <div
              id="pengaturan-layanan"
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                10. Pengaturan Layanan
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
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
            <div
              id="pengakuan-dan-persetujuan"
              className="w-[90%] pb-[30px] mt-[30px]">
              <p className="font-semibold text-md text-primary-90 pb-[30px] border-b-[0.75px] border-dashed border-[#AEB1B4]">
                11. Pengakuan dan Persetujuan
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Dengan menyetujui Kebijakan Privasi, Anda mengakui bahwa anda
                telah membaca dan memahami Kebijakan Privasi ini dan menyetujui
                segala ketentuannya. Secara khusus, Anda setuju dan memberikan
                persetujuan kepada kami untuk melaksanakan pengumpulan,
                pengolahan, penganalisisan, penyimpanan, pengungkapan, perbaikan
                dan penghapusan data-data pribadi milik Anda sesuai dengan
                Kebijakan Privasi ini.
              </p>
              <p className="pt-[20px] pl-[10px] text-sm opacity-70">
                Dalam hal Anda berusia di bawah persyaratan usia minimum atau
                termasuk dalam kategori anak sesuai dengan ketentuan peraturan
                perundang-undangan yang berlaku, maka persetujuan atas
                Pemrosesan data pribadi Anda harus diberikan oleh orang tua
                (bapak atau ibu) atau wali dari Pengguna sesuai dengan ketentuan
                peraturan perundang-undangan yang berlaku
              </p>
            </div>
          </div>
          <div className="w-full h-[20%] grid place-items-center relative">
            <div className="w-[90%] h-full flex flex-col">
              <Button
                type="linear-gradient"
                onButtonClick={() => router.back()}
                shadow
                full>
                {trans(locale, lang, 'setuju')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
