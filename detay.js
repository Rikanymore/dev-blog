document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    // İçeriği basacağımız veya hata göstereceğimiz alanı bul
    let icerikAlani = document.getElementById('detay-icerik');
    if (!icerikAlani) {
        // Eğer detay-icerik diye bir ID HTML'de yoksa, hatayı direkt sayfanın ortasına basar
        icerikAlani = document.body; 
    }

    // 1. KONTROL: URL'de ID var mı?
    if (!id) {
        icerikAlani.innerHTML = "<h2 style='color:#ff477e; text-align:center; padding:50px;'>Hata: URL'de yazı ID'si yok! Lütfen ana sayfadan 'Devamını Oku' butonuna tıklayarak gelin.</h2>";
        return;
    }

    // JSON Verisini Çek
    fetch('./yazilar.json')
        .then(response => {
            if (!response.ok) throw new Error("JSON dosyası okunamadı. Dosya yolu yanlış olabilir.");
            return response.json();
        })
        .then(yazilar => {
            const yazi = yazilar.find(y => y.id == id);
            
            // 2. KONTROL: ID'ye ait yazı JSON'da var mı?
            if (yazi) {
                const kategoriEl = document.getElementById('detay-kategori');
                if (kategoriEl) kategoriEl.textContent = yazi.kategori;

                const baslikEl = document.getElementById('detay-baslik');
                if (baslikEl) baslikEl.textContent = yazi.baslik;

                const tarihEl = document.getElementById('detay-tarih');
                if (tarihEl) tarihEl.textContent = yazi.tarih;
                
                // Resmi bul ve bas
                const resimEl = document.getElementById('detay-resim') || document.getElementById('detay-gorsel');
                if (resimEl) {
                    resimEl.src = yazi.resim;
                    resimEl.alt = yazi.baslik;
                }
                
                // İçeriği bas
                const gercekIcerikEl = document.getElementById('detay-icerik');
                if (gercekIcerikEl) {
                    gercekIcerikEl.innerHTML = yazi.icerik;
                }
                
            } else {
                icerikAlani.innerHTML = `<h2 style='color:#ff477e; text-align:center; padding:50px;'>Hata: ${id} numaralı yazı veritabanında (JSON) bulunamadı!</h2>`;
            }
        })
        .catch(error => {
            // 3. KONTROL: JavaScript kod çökmesi
            icerikAlani.innerHTML = `<h2 style='color:#ff477e; text-align:center; padding:50px;'>Kritik Hata: ${error.message}</h2>`;
        });
});