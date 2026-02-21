document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        fetch('./yazilar.json')
            .then(response => response.json())
            .then(yazilar => {
                const yazi = yazilar.find(y => y.id == id);
                
                if (yazi) {
                    document.getElementById('detay-kategori').textContent = yazi.kategori;
                    document.getElementById('detay-baslik').textContent = yazi.baslik;
                    document.getElementById('detay-tarih').textContent = yazi.tarih;
                    
                    // İŞTE SORUNU ÇÖZEN SATIR: JSON'daki "resim" kelimesiyle eşleştirildi
                    document.getElementById('detay-resim').src = yazi.resim;
                    document.getElementById('detay-resim').alt = yazi.baslik;
                    
                    document.getElementById('detay-icerik').innerHTML = yazi.icerik;
                } else {
                    document.getElementById('detay-icerik').innerHTML = "<p>Yazı bulunamadı.</p>";
                }
            })
            .catch(error => {
                console.error("Veri çekme hatası:", error);
                document.getElementById('detay-icerik').innerHTML = "<p>İçerik yüklenirken bir hata oluştu.</p>";
            });
    }
});