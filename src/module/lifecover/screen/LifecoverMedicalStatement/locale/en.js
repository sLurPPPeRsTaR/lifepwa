import { NAVIGATION } from '@cp-util/constant';

export default {
  title: 'Medical Statement',

  tinggi: 'Height',
  berat: 'Weight',
  tinggiDanBerat: 'Weight and Height',
  sedangCheck: 'Checking validation result of your height and weight',
  pertanyaan: 'Question',
  pilih: 'Select',
  sebelumLangganan:
    "Before subscribing to Life<i>COVER</i>, let's answer some questions first",
  silahkanPilihTidak:
    'Please select “No” if the follow-up or hospitalization is due to trauma and injury, where you have fully recovered and are out of follow-up for at least 6 months without complications, disabilities, or deformities or if the follow-up or hospitalization is due to pregnancy',
  denganIni:
    'I hereby declare that the medical satements have been filled out correctly and truthfully.',

  // button
  lanjutkan: 'Next',
  iya: 'Yes',
  tidak: 'No',
  btnKembali: 'Back',
  maaf: 'Sorry',
  ktpKamuTidak: (
    <text>
      Your Identity Card cannot be used. Sorry, you can't do that yet purchase{' '}
      <b>
        Life<i>COVER</i>
      </b>
      .
    </text>
  ),
  totalUangPertanggungan: (
    <text>
      The total Sum Assured that you already have and are currently submitting
      has exceeded the maximum limit. You have not been able to subscribe to
      <b>
        Life<i>COVER</i>
      </b>
    </text>
  ),
  kondisiKesehatan: (
    <text>
      The health condition that you have filled in does not meet the criteria.{' '}
      <a href={NAVIGATION.LIFECOVER.LifecoverFAQ} className="text-red-500">
        [Read more!]
      </a>
    </text>
  ),
  ringkasanData: 'Medical Statement Summary',
  tinggiDanBerat: 'Height and Weight',
  tinggi: 'Height',
  berat: 'Weight',
  cm: 'Cm',
  kg: 'Kg',
  jawab: 'Answer',
  bmiSesuai: 'Suitable',
  bmiTidakSesuai: 'Please re-check your height and weight',
  btnLanjutkan: 'Continue',
  placeholderTinggi: '-- Select Height --',
  placeholderBerat: '-- Select Weight --',
  dataKesehatan: 'Medical Statement',
  pastikanDataKesehatan:
    'Make sure the health data you fill in is correct and in accordance with the history of the disease you have.',
  terimaKasih: 'Thank You',
};
