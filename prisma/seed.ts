const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const knowledgeData = [
  {
    keywords: ["hukum nikah", "menikah", "hukum menikah", "wajib menikah"],
    answer: `Hukum menikah dalam Islam dapat berbeda-beda tergantung kondisi seseorang:

1. Wajib: Bagi yang mampu dan khawatir terjerumus dalam zina
2. Sunnah: Bagi yang mampu tapi bisa menahan diri
3. Mubah: Bagi yang tidak ada dorongan atau halangan
4. Makruh: Bagi yang tidak mampu memenuhi kewajiban
5. Haram: Bagi yang berniat menyakiti pasangan

Referensi: https://almanhaj.or.id/3234-hukum-menikah-dan-keutamaannya.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: [
      "syarat nikah",
      "rukun nikah",
      "syarat sah nikah",
      "rukun sah nikah",
    ],
    answer: `Rukun dan syarat sah nikah dalam Islam:

1. Rukun Nikah:
   - Adanya calon suami dan istri
   - Wali nikah
   - Dua orang saksi
   - Ijab dan qabul

2. Syarat Sah:
   - Muslim/Muslimah
   - Baligh dan berakal
   - Tidak ada paksaan
   - Tidak dalam masa iddah
   - Bukan mahram

Referensi: https://almanhaj.or.id/4145-rukun-rukun-nikah-dan-syarat-syaratnya.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["mahar", "maskawin", "mas kawin"],
    answer: `Mahar adalah pemberian wajib dari suami kepada istri saat menikah. Ketentuan mahar:

1. Wajib diberikan
2. Jumlah sesuai kesepakatan
3. Bisa berupa barang atau jasa
4. Menjadi hak penuh istri
5. Tidak ada batasan minimal atau maksimal
6. Sebaiknya disesuaikan kemampuan

Referensi: https://almanhaj.or.id/3244-mahar-maskawin-dalam-islam.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["wali nikah", "wali nasab", "wali hakim"],
    answer: `Urutan wali nikah dalam Islam:

1. Wali Nasab:
   - Ayah
   - Kakek dari ayah
   - Saudara laki-laki kandung
   - Saudara laki-laki seayah
   - Anak laki-laki dari saudara kandung
   - Anak laki-laki dari saudara seayah
   - Paman kandung
   - Paman seayah

2. Wali Hakim: Jika tidak ada wali nasab atau wali adhal (menolak)

Referensi: https://almanhaj.or.id/3407-urutan-wali-dalam-pernikahan.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["saksi nikah", "syarat saksi nikah"],
    answer: `Syarat-syarat saksi nikah:

1. Muslim
2. Laki-laki
3. Baligh
4. Berakal sehat
5. Adil
6. Dapat mendengar dan melihat
7. Memahami bahasa ijab qabul
8. Minimal dua orang
9. Hadir saat akad nikah

Referensi: https://almanhaj.or.id/4146-syarat-syarat-saksi-nikah.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["taaruf", "ta'aruf", "proses taaruf", "cara taaruf"],
    answer: `Ta'aruf adalah proses perkenalan sebelum menikah secara islami:

1. Dilakukan dengan perantara
2. Ada batasan waktu
3. Fokus pada kriteria pasangan
4. Tidak berduaan
5. Menjaga adab islami
6. Tujuan jelas untuk menikah
7. Melibatkan keluarga
8. Tidak ada pacaran

Referensi: https://almanhaj.or.id/2822-taaruf-sebelum-menikah.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["kewajiban suami", "tanggung jawab suami", "hak istri"],
    answer: `Kewajiban suami dalam Islam:

1. Memberi nafkah lahir (makanan, pakaian, tempat tinggal)
2. Memberi nafkah batin
3. Mendidik dan membimbing istri
4. Memperlakukan istri dengan baik
5. Melindungi keluarga
6. Berlaku adil jika berpoligami
7. Memenuhi kebutuhan rumah tangga sesuai kemampuan

Referensi: https://almanhaj.or.id/3547-kewajiban-suami-terhadap-istri.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["kewajiban istri", "tanggung jawab istri", "hak suami"],
    answer: `Kewajiban istri dalam Islam:

1. Taat kepada suami dalam kebaikan
2. Menjaga kehormatan diri dan keluarga
3. Mengatur urusan rumah tangga
4. Mendidik anak-anak
5. Tidak keluar rumah tanpa izin suami
6. Menjaga harta suami
7. Mensyukuri pemberian suami

Referensi: https://almanhaj.or.id/3548-kewajiban-istri-terhadap-suami.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["nikah beda agama", "menikah beda agama", "kawin beda agama"],
    answer: `Hukum menikah beda agama dalam Islam:

1. Laki-laki muslim dilarang menikahi wanita musyrik/kafir
2. Wanita muslimah dilarang menikah dengan laki-laki non-muslim
3. Laki-laki muslim boleh menikahi wanita ahli kitab dengan syarat:
   - Wanita tersebut menjaga kehormatan
   - Tidak membahayakan aqidah
   - Ada maslahat yang jelas

Referensi: https://almanhaj.or.id/2085-larangan-menikah-dengan-wanita-kafir.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["poligami", "beristri lebih dari satu", "nikah lebih dari satu"],
    answer: `Ketentuan poligami dalam Islam:

1. Maksimal 4 istri
2. Syarat utama:
   - Mampu berlaku adil
   - Mampu memberi nafkah
   - Mampu menjaga kehormatan
3. Tidak dianjurkan jika khawatir tidak adil
4. Harus seizin istri pertama
5. Memperhatikan maslahat keluarga

Referensi: https://almanhaj.or.id/3033-poligami-dalam-pandangan-islam.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["talak", "cerai", "perceraian", "rujuk"],
    answer: `Hukum talak (perceraian) dalam Islam:

1. Talak adalah hal halal yang paling dibenci Allah
2. Jenis talak:
   - Talak raj'i (bisa rujuk)
   - Talak ba'in (tidak bisa rujuk)
3. Masa iddah wajib dijalani
4. Rujuk hanya bisa pada talak raj'i
5. Maksimal 3 kali talak
6. Harus ada alasan syar'i

Referensi: https://almanhaj.or.id/3198-talak-dalam-islam.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["ijab qabul", "syarat ijab qabul", "syarat sah ijab qabul"],
    answer: `Syarat sah ijab qabul dalam pernikahan:

1. Menggunakan kata "nikah/tazwij" atau terjemahannya
2. Antara ijab dan qabul tidak diselingi pembicaraan lain
3. Tidak ada jeda waktu yang lama antara ijab dan qabul
4. Ijab dan qabul harus sesuai maksudnya
5. Tidak digantungkan dengan syarat apapun
6. Tidak dibatasi waktu (tidak mut'ah)
7. Harus diucapkan dengan suara yang jelas
8. Tidak boleh ada syarat yang merusak tujuan nikah
9. Wali dan calon suami harus tetap memenuhi syarat hingga selesai akad

Referensi: https://tanyapenghulu.blogspot.com/2025/01/9-syarat-ijab-qobul-dinyatakan-sah.html`,
    category: "fiqih-nikah",
  },
  {
    keywords: ["menikah gila", "nikah orang gila", "hukum nikah gila"],
    answer: `Hukum menikah dengan orang yang mengalami gangguan jiwa (gila):

1. Jika calon istri yang mengalami gangguan jiwa:
   - Yang berhak menjadi wali hanya ayah, kakek, atau wali hakim
   - Harus ada kemaslahatan dalam pernikahan
   - Wali hakim harus bermusyawarah dengan keluarga

2. Jika calon suami yang mengalami gangguan jiwa:
   - Boleh dinikahkan jika ada hasrat untuk menikah
   - Yang menikahkan hanya boleh ayah, kakek, atau wali hakim
   - Tidak boleh menikah lebih dari satu istri
   - Wajib dinikahkan jika kesembuhannya bergantung pada pernikahan

Referensi: https://tanyapenghulu.blogspot.com/2025/01/hukum-menikahi-orang-yang-gila.html`,
    category: "fiqih-nikah",
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
