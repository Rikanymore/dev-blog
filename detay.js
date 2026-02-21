document.addEventListener('DOMContentLoaded', () => {
    const makaleAlani = document.getElementById('makale-alani');
    
    // URL'den ID'yi al (Örn: yazi-detay.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const yaziId = parseInt(urlParams.get('id'));

    // Eğer URL'de ID yoksa ana sayfaya at
    if (!yaziId) {
        window.location.href = 'index.html';
        return;
    }

    // JSON'dan verileri çek ve o ID'ye ait makaleyi bul
    fetch('./yazilar.json')
        .then(response => response.json())
        .then(yazilar => {
            const secilenYazi = yazilar.find(yazi => yazi.id === yaziId);

            if (secilenYazi) {
                // Makaleyi ekrana bas
                document.title = `${secilenYazi.baslik} | CodeOguz`;
                
                makaleAlani.innerHTML = `
                    <div class="article-header">
                        <span class="blog-category" style="font-size:1rem; display:block; margin-bottom:15px;">${secilenYazi.kategori}</span>
                        <h1 class="article-title">${secilenYazi.baslik}</h1>
                        <div class="article-meta">
                            <span><i class="far fa-calendar-alt"></i> ${secilenYazi.tarih}</span>
                        </div>
                    </div>
                    <img src="${secilenYazi.gorsel}" alt="${secilenYazi.baslik}" class="article-image">
                    <div class="article-body">
                        ${secilenYazi.icerik}
                    </div>
                `;
            } else {
                makaleAlani.innerHTML = '<h2 style="color:var(--accent-pink);">Makale bulunamadı!</h2>';
            }
        })
        .catch(error => {
            console.error("Veri çekme hatası:", error);
            makaleAlani.innerHTML = '<p>Makale yüklenirken bir hata oluştu.</p>';
        });
});