document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    // HTML'deki tek ve gerçek alanımızı (tuvalimizi) seçiyoruz
    const makaleAlani = document.getElementById('makale-alani');

    // Eğer URL'de ID yoksa uyar
    if (!id) {
        makaleAlani.innerHTML = "<h2 style='color:#ff477e; text-align:center; padding:50px;'>Hata: URL'de yazı ID'si bulunamadı. Lütfen ana sayfadan gelin.</h2>";
        return;
    }

    // JSON Verisini Çek
    fetch('./yazilar.json')
        .then(response => {
            if (!response.ok) throw new Error("JSON okunamadı");
            return response.json();
        })
        .then(yazilar => {
            // URL'deki ID ile JSON'daki yazıyı eşleştir
            const yazi = yazilar.find(y => y.id == id);
            
            if (yazi) {
                // Makaleyi tüm şıklığıyla HTML'in içine tek parça halinde bas!
                makaleAlani.innerHTML = `
                    <div class="article-header">
                        <span style="color: var(--accent-pink); font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">${yazi.kategori}</span>
                        <h1 class="article-title" style="margin-top: 15px;">${yazi.baslik}</h1>
                        <div class="article-meta">
                            <span><i class="far fa-calendar-alt"></i> ${yazi.tarih}</span>
                        </div>
                    </div>
                    
                    <img src="${yazi.resim}" alt="${yazi.baslik}" class="article-image">
                    
                    <div class="article-body">
                        ${yazi.icerik}
                    </div>
                `;
            } else {
                makaleAlani.innerHTML = `<h2 style='color:#ff477e; text-align:center; padding:50px;'>Hata: ${id} numaralı yazı bulunamadı!</h2>`;
            }
        })
        .catch(error => {
            console.error("Hata:", error);
            makaleAlani.innerHTML = "<h2 style='color:#ff477e; text-align:center; padding:50px;'>İçerik yüklenirken bir hata oluştu.</h2>";
        });
});