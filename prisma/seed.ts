const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const knowledgeData = [
  {
    keywords: ["rukun", "rukun nikah", "rukun pernikahan"],
    answer: `Rukun pernikahan dalam Islam ada 5, yaitu:

1. Calon suami
2. Calon istri
3. Wali nikah
4. Dua orang saksi
5. Ijab dan Qabul

Semua rukun di atas harus terpenuhi agar pernikahan dianggap sah secara syariat Islam.`,
    category: "rukun-nikah",
  },
  {
    keywords: ["mahar", "maskawin", "mas kawin"],
    answer: `Mahar adalah pemberian wajib dari calon suami kepada calon istri. Ketentuan mahar:

1. Wajib diberikan kepada calon istri
2. Jumlah dan bentuknya sesuai kesepakatan kedua belah pihak
3. Bisa berupa uang, perhiasan, atau benda berharga lainnya
4. Bisa juga berupa manfaat (seperti mengajarkan Al-Quran)
5. Menjadi hak penuh calon istri`,
    category: "mahar",
  },
  {
    keywords: ["wali", "wali nikah", "syarat wali"],
    answer: `Wali nikah adalah salah satu rukun yang harus ada dalam pernikahan. Syarat wali nikah:

1. Muslim
2. Laki-laki
3. Baligh (dewasa)
4. Berakal sehat
5. Adil
6. Merdeka

Urutan wali nikah:
1. Ayah kandung
2. Kakek dari pihak ayah
3. Saudara laki-laki sekandung
4. Saudara laki-laki seayah
5. Anak laki-laki dari saudara laki-laki sekandung
6. Anak laki-laki dari saudara laki-laki seayah
7. Paman (saudara ayah) sekandung
8. Paman seayah
9. Wali hakim`,
    category: "wali-nikah",
  },
  {
    keywords: ["saksi", "saksi nikah", "syarat saksi"],
    answer: `Syarat-syarat saksi nikah dalam Islam:

1. Muslim
2. Laki-laki
3. Baligh (dewasa)
4. Berakal sehat
5. Adil
6. Dapat mendengar dan melihat
7. Memahami bahasa yang digunakan dalam ijab qabul
8. Minimal 2 orang saksi

Saksi wajib hadir dan menyaksikan langsung akad nikah.`,
    category: "saksi-nikah",
  },
  {
    keywords: ["ijab", "qabul", "ijab kabul", "akad"],
    answer: `Ijab qabul adalah rukun utama dalam akad nikah. Syarat ijab qabul:

1. Menggunakan kata yang jelas tentang pernikahan
2. Antara ijab dan qabul harus berkesinambungan
3. Dilakukan dalam satu majelis
4. Tidak dibatasi waktu
5. Qabul harus sesuai dengan ijab
6. Diucapkan dengan jelas dan dapat didengar oleh saksi`,
    category: "ijab-qabul",
  },
  {
    keywords: ["syarat", "syarat nikah", "syarat sah"],
    answer: `Syarat sah pernikahan dalam Islam:

1. Syarat calon suami:
   - Muslim (jika istri muslimah)
   - Laki-laki
   - Jelas orangnya
   - Tidak sedang ihram
   - Tidak terpaksa
   - Tidak beristri empat

2. Syarat calon istri:
   - Muslimah
   - Perempuan
   - Jelas orangnya
   - Tidak sedang ihram
   - Tidak dalam masa iddah
   - Bukan mahram calon suami`,
    category: "syarat-nikah",
  },
  {
    keywords: ["walimah", "walimatul ursy", "resepsi"],
    answer: `Walimatul 'ursy (resepsi pernikahan) hukumnya sunnah muakkadah. Ketentuan walimah:

1. Boleh diadakan sesuai kemampuan
2. Sebaiknya mengundang orang miskin
3. Tidak berlebihan dan menghindari mubazir
4. Tidak ada unsur maksiat
5. Boleh mengadakan hiburan yang sesuai syariat
6. Tamu wajib menghadiri jika diundang (jika tidak ada uzur)`,
    category: "walimah",
  },
  {
    keywords: ["mahram", "muhrim", "wanita yang haram dinikahi"],
    answer: `Wanita yang haram dinikahi (mahram) dalam Islam:

1. Mahram selamanya:
   - Ibu dan nenek
   - Anak dan cucu perempuan
   - Saudara perempuan
   - Bibi dari ayah
   - Bibi dari ibu
   - Anak perempuan saudara laki-laki
   - Anak perempuan saudara perempuan

2. Mahram sementara:
   - Istri orang lain
   - Saudara ipar (kakak/adik istri) selama masih dalam ikatan pernikahan
   - Wanita yang sedang dalam masa iddah
   - Wanita musyrik (sebelum masuk Islam)`,
    category: "mahram",
  },
  {
    keywords: ["khitbah", "lamaran", "peminangan"],
    answer: `Khitbah (peminangan) dalam Islam:

1. Hukumnya sunnah sebelum menikah
2. Boleh melihat calon pasangan dengan batasan:
   - Wajah
   - Telapak tangan
   - Dalam kehadiran mahram
3. Dilarang meminang pinangan orang lain
4. Boleh membatalkan khitbah dengan cara baik
5. Pemberian saat khitbah bukan mahar
6. Tetap harus menjaga batasan syariat sebelum menikah`,
    category: "khitbah",
  },
  {
    keywords: ["kafaah", "sekufu", "kesetaraan"],
    answer: `Kafaah (kesetaraan) dalam pernikahan Islam:

1. Aspek yang dipertimbangkan:
   - Agama dan ketakwaan (yang utama)
   - Akhlak dan perilaku
   - Pendidikan
   - Status sosial
   - Ekonomi

2. Tujuan kafaah:
   - Keharmonisan rumah tangga
   - Menghindari aib sosial
   - Kenyamanan kedua belah pihak

Note: Yang wajib adalah kesetaraan agama, selainnya adalah pertimbangan sosial.`,
    category: "kafaah",
  },
  {
    keywords: ["iddah", "masa iddah", "masa tunggu"],
    answer: `Masa iddah adalah masa tunggu bagi wanita setelah bercerai atau ditinggal mati suami:

1. Iddah cerai:
   - 3 kali suci bagi yang masih haid
   - 3 bulan bagi yang tidak haid
   - Sampai melahirkan bagi yang hamil

2. Iddah wafat:
   - 4 bulan 10 hari bagi yang tidak hamil
   - Sampai melahirkan bagi yang hamil

Selama masa iddah, wanita tidak boleh menikah dan memiliki batasan tertentu.`,
    category: "iddah",
  },
  {
    keywords: ["poligami", "beristri lebih dari satu"],
    answer: `Ketentuan poligami dalam Islam:

1. Batas maksimal 4 istri
2. Syarat-syarat:
   - Mampu berlaku adil
   - Mampu memberi nafkah
   - Mampu menjaga kehormatan istri-istri
3. Harus mendapat izin dari istri pertama
4. Tidak wajib atau sunnah, hanya dibolehkan dengan syarat
5. Jika khawatir tidak bisa adil, maka cukup satu istri saja

Allah SWT berfirman: "Dan jika kamu takut tidak akan dapat berlaku adil terhadap (hak-hak) perempuan yang yatim (bilamana kamu mengawininya), maka kawinilah wanita-wanita (lain) yang kamu senangi: dua, tiga atau empat. Kemudian jika kamu takut tidak akan dapat berlaku adil, maka (kawinilah) seorang saja." (An-Nisa: 3)`,
    category: "poligami",
  },
  {
    keywords: ["nafkah", "kewajiban suami"],
    answer: `Kewajiban nafkah suami kepada istri:

1. Nafkah lahir:
   - Makanan dan minuman
   - Pakaian
   - Tempat tinggal
   - Perawatan kesehatan
   - Kebutuhan rumah tangga

2. Nafkah batin:
   - Perlakuan baik
   - Perlindungan
   - Kasih sayang
   - Kebutuhan biologis

Nafkah wajib diberikan sesuai kemampuan suami.`,
    category: "nafkah",
  },
  {
    keywords: ["nusyuz", "pembangkangan", "istri membangkang"],
    answer: `Nusyuz adalah pembangkangan istri terhadap suami. Cara mengatasinya:

1. Tahapan penyelesaian:
   - Nasihat dengan baik
   - Pisah ranjang
   - Pukulan yang tidak menyakiti (sebagai simbol)
   
2. Yang bukan termasuk nusyuz:
   - Menolak hal yang bertentangan dengan syariat
   - Membela diri dari kekerasan
   - Menuntut hak-hak yang wajib dipenuhi

Penyelesaian harus dengan cara bijak dan tidak kasar.`,
    category: "nusyuz",
  },
  {
    keywords: ["talak", "perceraian", "cerai"],
    answer: `Ketentuan talak (perceraian) dalam Islam:

1. Hukum: Halal tapi dibenci Allah
2. Jenis talak:
   - Talak raj'i (bisa rujuk)
   - Talak bain (perlu akad baru)
   - Talak tiga (tidak bisa rujuk)

3. Tata cara:
   - Diucapkan dengan sadar
   - Dalam keadaan suci
   - Tidak dalam keadaan marah
   - Sebaiknya ada saksi

4. Konsekuensi:
   - Masa iddah bagi istri
   - Nafkah iddah
   - Hak asuh anak
   - Pembagian harta bersama`,
    category: "talak",
  },
  {
    keywords: ["rujuk", "kembali setelah talak"],
    answer: `Rujuk adalah kembalinya suami kepada istri setelah talak raj'i:

1. Syarat rujuk:
   - Masih dalam masa iddah
   - Talak yang pertama atau kedua
   - Pernikahan sebelumnya sah
   - Ada saksi

2. Cara rujuk:
   - Ucapan yang jelas
   - Niat yang baik
   - Persetujuan istri
   - Sebaiknya ada saksi

3. Setelah rujuk:
   - Suami istri boleh kembali berhubungan
   - Hak dan kewajiban kembali normal
   - Jumlah talak berkurang`,
    category: "rujuk",
  },
  {
    keywords: ["hak", "kewajiban", "hak suami istri"],
    answer: `Hak dan kewajiban suami istri:

1. Hak bersama:
   - Halal berhubungan suami istri
   - Saling mewarisi
   - Nasab anak
   - Perlakuan baik

2. Kewajiban suami:
   - Memberi nafkah
   - Membimbing keluarga
   - Melindungi keluarga
   - Berlaku adil

3. Kewajiban istri:
   - Taat pada suami dalam kebaikan
   - Menjaga kehormatan
   - Mengatur rumah tangga
   - Mendidik anak`,
    category: "hak-kewajiban",
  },
  {
    keywords: ["adab", "malam pertama", "pengantin baru"],
    answer: `Adab malam pertama dalam Islam:

1. Sebelum berhubungan:
   - Berdoa
   - Shalat sunnah 2 rakaat
   - Berlaku lembut
   - Memberikan mahar jika belum

2. Anjuran:
   - Membaca bismillah
   - Bersikap romantis
   - Menjaga privasi
   - Tidak menceritakan pada orang lain

3. Yang dilarang:
   - Berhubungan saat haid
   - Menyakiti pasangan
   - Memaksa kehendak
   - Menceritakan detail hubungan`,
    category: "malam-pertama",
  },
  {
    keywords: ["syarat", "calon", "kriteria pasangan"],
    answer: `Kriteria memilih calon pasangan dalam Islam:

1. Kriteria utama:
   - Agama dan ketakwaan
   - Akhlak yang baik
   - Nasab yang jelas

2. Kriteria tambahan:
   - Kemampuan memberi nafkah (untuk suami)
   - Kesuburan
   - Pendidikan
   - Kecantikan/ketampanan

3. Yang perlu dihindari:
   - Menikah karena harta semata
   - Mengabaikan aspek agama
   - Perbedaan yang terlalu mencolok
   - Cacat yang disembunyikan`,
    category: "kriteria-pasangan",
  },
  {
    keywords: ["perjanjian", "perjanjian nikah", "perjanjian pranikah"],
    answer: `Perjanjian pranikah dalam Islam:

1. Jenis perjanjian yang dibolehkan:
   - Tidak bertentangan dengan syariat
   - Harta bersama/terpisah
   - Tempat tinggal
   - Pekerjaan

2. Yang tidak boleh diperjanjikan:
   - Menghalalkan yang haram
   - Mengharamkan yang halal
   - Meniadakan kewajiban agama

3. Ketentuan:
   - Tertulis dan disaksikan
   - Disepakati kedua pihak
   - Tidak merugikan salah satu pihak
   - Bisa diubah atas persetujuan bersama`,
    category: "perjanjian-nikah",
  },
  {
    keywords: ["hamil", "nikah hamil", "menikah saat hamil"],
    answer: `Hukum menikah saat hamil dalam Islam:

1. Jika hamil dari zina:
   - Wajib bertaubat
   - Boleh dinikahi oleh yang menghamili
   - Ada perbedaan pendapat ulama tentang dinikahi selain yang menghamili
   - Anak dinasabkan ke ibu

2. Ketentuan:
   - Tidak boleh berhubungan sebelum akad nikah yang sah
   - Wajib mengakui kesalahan dan bertaubat
   - Mendaftarkan pernikahan secara resmi
   - Menjaga nama baik keluarga

3. Pencegahan:
   - Menjaga pergaulan
   - Menghindari khalwat (berduaan)
   - Menikah jika sudah siap
   - Menjaga kehormatan diri`,
    category: "nikah-hamil",
  },
  {
    keywords: ["zina", "hubungan terlarang", "dosa besar"],
    answer: `Zina dalam konteks pernikahan Islam:

1. Definisi:
   - Hubungan intim di luar nikah
   - Termasuk dosa besar
   - Merusak nasab dan kehormatan

2. Pencegahan:
   - Menikah jika mampu
   - Puasa jika belum mampu
   - Menjaga pandangan
   - Menghindari khalwat

3. Konsekuensi:
   - Hukuman had dalam syariat
   - Merusak kehormatan
   - Dapat menyebabkan penyakit
   - Merusak tatanan sosial

4. Taubat:
   - Berhenti total
   - Menyesali perbuatan
   - Bertekad tidak mengulangi
   - Menikah secara sah`,
    category: "zina",
  },
  {
    keywords: ["nikah siri", "nikah bawah tangan", "nikah tidak tercatat"],
    answer: `Nikah siri atau nikah di bawah tangan:

1. Definisi:
   - Pernikahan secara agama
   - Tidak tercatat di KUA
   - Tidak memiliki bukti resmi

2. Dampak negatif:
   - Tidak ada perlindungan hukum
   - Sulit mengurus dokumen anak
   - Istri tidak bisa menuntut hak
   - Anak sulit mendapat warisan

3. Saran:
   - Sebaiknya menikah tercatat
   - Mengurus administrasi dengan benar
   - Melindungi hak istri dan anak
   - Mematuhi hukum negara

4. Solusi jika terlanjur:
   - Isbat nikah ke Pengadilan Agama
   - Mencatatkan pernikahan
   - Mengurus dokumen resmi
   - Melindungi hak keluarga`,
    category: "nikah-siri",
  },
  {
    keywords: ["beda", "agama", "nikah beda agama"],
    answer: `Hukum nikah beda agama dalam Islam:

1. Ketentuan dasar:
   - Pria Muslim tidak boleh menikahi wanita musyrik
   - Pria Muslim boleh menikahi wanita ahli kitab (dengan syarat)
   - Wanita Muslimah tidak boleh menikah dengan pria non-Muslim

2. Alasan larangan:
   - Menjaga akidah
   - Pendidikan anak
   - Keharmonisan keluarga
   - Perbedaan keyakinan fundamental

3. Konsekuensi:
   - Pernikahan tidak sah
   - Hubungan termasuk zina
   - Anak dinasabkan ke ibu
   - Tidak ada hak waris

4. Solusi:
   - Dakwah dengan hikmah
   - Mencari pasangan seiman
   - Menjaga pergaulan
   - Mendahulukan agama`,
    category: "nikah-beda-agama",
  },
  {
    keywords: ["mut'ah", "kawin kontrak", "nikah temporal"],
    answer: `Nikah mut'ah (kawin kontrak) dalam Islam:

1. Hukum:
   - Haram menurut mayoritas ulama
   - Pernah dibolehkan lalu diharamkan
   - Bukan pernikahan yang sah

2. Alasan diharamkan:
   - Menyerupai zina
   - Merendahkan martabat wanita
   - Merusak tujuan pernikahan
   - Membahayakan keturunan

3. Perbedaan dengan nikah sah:
   - Ada batas waktu
   - Tidak ada hak waris
   - Tidak ada iddah
   - Tidak ada nafkah

4. Dampak negatif:
   - Eksploitasi wanita
   - Penelantaran anak
   - Kerusakan moral
   - Penyakit sosial`,
    category: "nikah-mutah",
  },
];

async function main() {
  console.log("Start seeding...");

  await prisma.knowledge.deleteMany();

  for (const knowledge of knowledgeData) {
    const result = await prisma.knowledge.create({
      data: knowledge,
    });
    console.log(`Created knowledge with id: ${result.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
