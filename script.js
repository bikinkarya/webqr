document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }

    // 2. Data Gallery Segmentasi (Untuk Siapa)
    const galleryData = {
        fashion: [
            { title: "Kaos & Streetwear", desc: "Cetak SmartQR pada label/sablon kaos untuk link katalog eksklusif.", icon: "fa-shirt" },
            { title: "Jaket & Outerwear", desc: "QR Dinamis pada hangtag jaket yang bisa dihubungkan ke promo musiman.", icon: "fa-vest" },
            { title: "Topi & Aksesoris", desc: "Sematkan QR pada aksesoris fashion untuk direct link media sosial.", icon: "fa-hat-cowboy" },
            { title: "Tote Bag Custom", desc: "Cetak QR pada tas kain untuk portofolio brand atau merchandise.", icon: "fa-bag-shopping" }
        ],
        souvenir: [
            { title: "Gantungan Kunci Akrilik", desc: "Souvenir akrilik timbul dengan QR yang langsung menuju chat WA.", icon: "fa-key" },
            { title: "Mug & Tumbler", desc: "Merchandise kantor dengan QR Code dinamis berisi profil perusahaan.", icon: "fa-glass-water" },
            { title: "Plakat & Throphy", desc: "Plakat acara dengan QR menuju galeri dokumentasi foto/video.", icon: "fa-award" },
            { title: "Stiker & Decal", desc: "Stiker custom anti air dengan QR dinamis yang mudah ditempel.", icon: "fa-note-sticky" }
        ],
        bisnis: [
            { title: "Meja Resto & Cafe", desc: "Standee meja akrilik untuk daftar menu digital tanpa ubah fisik.", icon: "fa-utensils" },
            { title: "Brosur & Banner", desc: "Alat promosi cetak yang selalu terhubung ke halaman promo terbaru.", icon: "fa-scroll" },
            { title: "Kartu Nama Digital", desc: "Kartu nama eksklusif yang menyimpan kontak langsung ke smartphone.", icon: "fa-address-card" },
            { title: "Kemasan Produk", desc: "Packaging makanan/barang dengan QR panduan atau autentikasi produk.", icon: "fa-box" }
        ]
    };

    window.switchTab = function(category) {
        // Toggle Active Tab Button Style
        document.querySelectorAll(".tab-btn").forEach(btn => {
            btn.className = "tab-btn px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 bg-slate-900 border-slate-800 text-slate-400 hover:text-white";
        });

        const activeBtn = document.getElementById(`tab-${category}`);
        if (activeBtn) {
            activeBtn.className = "tab-btn px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30";
        }

        // Render Gallery Items
        const container = document.getElementById("galleryContainer");
        if (container && galleryData[category]) {
            container.innerHTML = galleryData[category].map(item => `
                <div class="glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition flex flex-col items-start">
                    <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 text-xl">
                        <i class="fa-solid ${item.icon}"></i>
                    </div>
                    <h3 class="text-base font-bold text-white mb-2">${item.title}</h3>
                    <p class="text-slate-400 text-xs leading-relaxed">${item.desc}</p>
                </div>
            `).join("");
        }
    };

    // Load Default Tab
    switchTab('fashion');

    // 3. Demo Timer Countdown
    const timerElem = document.getElementById("demoTimer");
    if (timerElem) {
        let duration = 300; // 5 menit
        setInterval(() => {
            let minutes = Math.floor(duration / 60);
            let seconds = duration % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            timerElem.textContent = `${minutes}:${seconds}`;
            if (--duration < 0) {
                duration = 300;
            }
        }, 1000);
    }

    // 4. Render Analytics Charts (Chart.js)
    const trendCtx = document.getElementById('scanTrendChart');
    if (trendCtx) {
        new Chart(trendCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Ming'],
                datasets: [{
                    label: 'Jumlah Scan',
                    data: [120, 190, 300, 250, 420, 550, 480],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    const deviceCtx = document.getElementById('deviceChart');
    if (deviceCtx) {
        new Chart(deviceCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Android', 'iOS', 'Desktop/Lainnya'],
                datasets: [{
                    data: [55, 35, 10],
                    backgroundColor: ['#6366f1', '#a855f7', '#14b8a6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
            }
        });
    }

    // Update Dummy Realtime Analytics Counter
    const totalScanElem = document.getElementById("statTotalScan");
    const iosElem = document.getElementById("statIos");
    const androidElem = document.getElementById("statAndroid");
    const desktopElem = document.getElementById("statDesktop");

    if (totalScanElem) totalScanElem.textContent = "2,310";
    if (iosElem) iosElem.textContent = "808";
    if (androidElem) androidElem.textContent = "1,270";
    if (desktopElem) desktopElem.textContent = "232";

    // 5. WhatsApp Form Lead Handling
    const leadForm = document.getElementById("leadForm");
    if (leadForm) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(leadForm);
            const nama = formData.get("nama");
            const whatsapp = formData.get("whatsapp");
            const bisnis = formData.get("bisnis");
            const kebutuhan = formData.get("kebutuhan");
            const pesan = formData.get("pesan") || "-";

            const text = `Halo Admin SmartQR, saya ingin konsultasi/pemesanan:%0A%0A` +
                         `*Nama:* ${nama}%0A` +
                         `*No. WA:* ${whatsapp}%0A` +
                         `*Jenis Pelanggan:* ${bisnis}%0A` +
                         `*Kebutuhan:* ${kebutuhan}%0A` +
                         `*Catatan:* ${pesan}`;

            // Ganti nomor WhatsApp tujuan di bawah ini (Gunakan kode negara 62)
            const targetWaNumber = "6281234567890"; 
            window.open(`https://wa.me/${targetWaNumber}?text=${text}`, '_blank');
        });
    }
});