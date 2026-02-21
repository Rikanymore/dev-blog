document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let butunYazilar = [];

    // JSON Verisini Çek
    fetch('./yazilar.json')
        .then(response => response.json())
        .then(data => {
            butunYazilar = data;
            yazilariEkranaBas(butunYazilar); // Sayfa açılınca tümünü göster
        })
        .catch(error => {
            blogContainer.innerHTML = '<p style="color: red;">İçerikler yüklenirken bir hata oluştu.</p>';
            console.error("Veri çekme hatası:", error);
        });

    // Verileri HTML Kartlarına Dönüştüren Fonksiyon
    function yazilariEkranaBas(yazilar) {
        blogContainer.innerHTML = ''; // Önce ekranı temizle
        
        if(yazilar.length === 0) {
            blogContainer.innerHTML = '<p>Bu kategoride henüz yazı bulunmuyor.</p>';
            return;
        }

        yazilar.forEach(yazi => {
            const card = document.createElement('div');
            card.classList.add('blog-card');
            card.innerHTML = `
                <img src="${yazi.resim}" alt="${yazi.baslik}" class="blog-image">
                <div class="blog-content">
                    <span class="blog-category">${yazi.kategori}</span>
                    <h3 class="blog-title">${yazi.baslik}</h3>
                    <p class="blog-excerpt">${yazi.ozet}</p>
                    <div class="blog-footer">
                        <span class="blog-date">${yazi.tarih}</span>
                        <a href="yazi-detay.html?id=${yazi.id}" class="read-more">Devamını Oku ➔</a>
                    </div>
                </div>
            `;
            blogContainer.appendChild(card);
        });
    }

    // Kategori Filtreleme Mantığı (Tıklanan Butonu Renklendir ve Filtrele)
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Aktif buton rengini değiştir
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Hangi kategoriye tıklandığını bul
            const secilenKategori = e.target.getAttribute('data-filter');
            
            // Seçime göre filtrele
            if(secilenKategori === 'all') {
                yazilariEkranaBas(butunYazilar);
            } else {
                const filtrelenmisYazilar = butunYazilar.filter(yazi => yazi.kategori === secilenKategori);
                yazilariEkranaBas(filtrelenmisYazilar);
            }
        });
    });
});