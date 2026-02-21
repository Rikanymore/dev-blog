document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        fetch('./yazilar.json')
            .then(response => response.json())
            .then(yazilar => {
                const yazi = yazilar.find(y => y.id == id);
                
                if (yazi) {
                    // Hata Korumalı Atamalar (Element yoksa kodu çökertmez, atlar)
                    const kategoriEl = document.getElementById('detay-kategori');
                    if (kategoriEl) kategoriEl.textContent = yazi.kategori;

                    const baslikEl = document.getElementById('detay-baslik');
                    if (baslikEl) baslikEl.textContent = yazi.baslik;

                    const tarihEl = document.getElementById('detay-tarih');
                    if (tarihEl) tarihEl.textContent = yazi.tarih;
                    
                    // Hem detay-resim hem de detay-gorsel ID'sini arar
                    const resimEl = document.getElementById('detay-resim') || document.getElementById('detay-gorsel');
                    if (resimEl) {
                        resimEl.src = yazi.resim;
                        resimEl.alt = yazi.baslik;
                    }
                    
                    const icerikEl = document.getElementById('detay-icerik');
                    if (icerikEl) icerikEl.innerHTML = yazi.icerik;
                    
                } else {
                    const icerikEl = document.getElementById('detay-icerik');
                    if (icerikEl) icerikEl.innerHTML = "<p>Yazı bulunamadı.</p>";
                }
            })
            .catch(error => {
                console.error("Veri çekme hatası:", error);
                const icerikEl = document.getElementById('detay-icerik');
                if (icerikEl) icerikEl.innerHTML = "<p>İçerik yüklenirken bir hata oluştu.</p>";
            });
    }
});