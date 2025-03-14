// Mevcut types içeriğine ekleme yapıyoruz
export interface ElektrikBakim {
  id: string;
  sahaId: string;
  tarih: any; // Timestamp
  kontrolEden: {
    id: string;
    ad: string;
    rol: string;
  };
  fotograflar: string[];
  durumlar: {
    trafoMerkezi: {
      trafoYagiSeviyesi: boolean;
      trafoSicakligi: boolean;
      trafoTemizligi: boolean;
    };
    dagitimPanolari: {
      sigortaKontrol: boolean;
      kabloBaglantilar: boolean;
      topraklamaDurumu: boolean;
    };
    kablolar: {
      izolasyonDurumu: boolean;
      kabloBaglantilar: boolean;
      kabloDuzenlemesi: boolean;
    };
    olcumDegerleri: {
      gerilimDegerleri: boolean;
      akimDegerleri: boolean;
      gucFaktoru: boolean;
    };
    korumaSistemleri: {
      kacanAkimRole: boolean;
      asiriAkimKoruma: boolean;
      yildirimaKarsiKoruma: boolean;
    };
    acilDurumSistemleri: {
      jeneratorDurumu: boolean;
      upsKontrol: boolean;
      acilAydinlatma: boolean;
    };
  };
  genelNotlar?: string;
  olusturmaTarihi: any; // Timestamp
}