// ==========================================
// 1. KONFIGURASI PROSES DATABASE & WHATSAPP
// ==========================================
// Keduanya dipertahankan 100% tanpa diubah
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZDrVyLA8q4ky-Fg0qq64njfIvVWt8FshOBtCTtL9wQApdqiJgOy4mJytap3NdvUuc/exec"; 
const NOMOR_WA_TUJUAN = "6285353664560";

// ==========================================
// 2. DATA KATEGORI GALERI (UNTUK SIAPA SMARTQR)
// ==========================================
// Anda dapat mengganti URL gambar, judul, dan deskripsi produk di sini
const galleryData = {
    fashion: [
        { title: "Kaos & Apparel Custom", desc: "Sablon QR Code di kaos terhubung ke portofolio / katalog outfit.", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop" },
        { title: "Hoodie Streetwear", desc: "Label barcode interaktif pada hoodie menuju promosi eksklusif.", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop" },
        { title: "Topi Distro", desc: "Aksesori fashion modern ber-QR menuju profil komunitas.", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop" },
        { title: "Merchandise Totebag", desc: "Totebag kanvas terhubung ke link diskon belanja pelanggan.", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop" }
    ],
    souvenir: [
        { title: "Gantungan Kunci Akrilik", desc: "Keychain akrilik timbul terhubung langsung ke pesan WhatsApp.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" },
        { title: "Tumbler Stainless", desc: "Grafir QR Code pada tumbler harian untuk identitas digital.", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop" },
        { title: "Mug Keramik Custom", desc: "Souvenir mug unik terhubung ke video kenangan / ucapan.", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop" },
        { title: "Plakat Akrilik Event", desc: "Plakat penghargaan terintegrasi ke dokumen sertifikat resmi.", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop" }
    ],
    bisnis: [
        { title: "Kartu Nama Digital NFC/QR", desc: "Satu kartu bisnis elegan menuju link kontak & sosial media.", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop" },
        { title: "Standing Banner Promosi", desc: "Banner X-Stand untuk promo resto mengarahkan ke menu digital.", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop" },
        { title: "Stiker Kemasan Produk", desc: "Stiker packaging produk terhubung ke WhatsApp Order.", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop" },
        { title: "Standee Meja Resto/Kasir", desc: "Display akrilik meja kasir untuk link pembayaran & ulasan Google.", img: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?q=80&w=600&auto=format&fit=crop" }
    ]
};

// ==========================================
// 3. RENDER GALERI & MODAL PREVIEW
// ==========================================
function switchTab(tabKey) {
    // Style tombol tab
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.className = "tab-btn px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 bg-slate-900 border-slate-800 text-slate-400 hover:text-white";
    });

    const activeBtn = document.getElementById(`tab-${tabKey}`);
    if (activeBtn) {
        activeBtn.className = "tab-btn px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30";
    }

    // Render items
    const container = document.getElementById('galleryContainer');
    const items = galleryData[tabKey] || [];

    container.innerHTML = items.map(item => `
        <div onclick="openModal('${item.img}', '${item.title}', '${item.desc}')" class="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition cursor-pointer group">
            <div class="h-48 overflow-hidden relative">
                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                <div class="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition"></div>
            </div>
            <div class="p-5">
                <h4 class="font-bold text-white text-base mb-1 group-hover:text-indigo-400 transition">${item.title}</h4>
                <p class="text-xs text-slate-400 leading-relaxed">${item.desc}</p>
            </div>
        </div>
    `).join('');
}

function openModal(imgSrc, title, desc) {
    document.getElementById('modalImage').src = imgSrc;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('imageModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('imageModal').classList.add('hidden');
}

// ==========================================
// 4. LIVE DEMO TIMER & REAL-TIME ROTATING REDIRECT
// ==========================================
function startDemoTimer() {
    let timeLeft = 300; // 5 Menit (300 Detik)
    const timerElem = document.getElementById('demoTimer');
    const activeUrlElem = document.getElementById('demoActiveUrl');
    
    // URL Demo Berita Dinamis
    const demoRedirectUrl = "https://smart-qr-code-iota.vercel.app/scan.html?id=NEWS5M";
    
    if (activeUrlElem) {
        activeUrlElem.innerText = demoRedirectUrl;
        activeUrlElem.href = demoRedirectUrl;
    }

    setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (timerElem) {
            timerElem.innerText = `${minutes}:${seconds}`;
        }

        if (timeLeft <= 0) {
            timeLeft = 300; // Reset ke 5 menit lagi
        } else {
            timeLeft--;
        }
    }, 1000);
}

// ==========================================
// 5. INISIALISASI CHART ANALITIK (CHART.JS)
// ==========================================
function initAnalyticsCharts() {
    // Trend Chart (Line)
    const ctxTrend = document.getElementById('scanTrendChart');
    if (ctxTrend) {
        new Chart(ctxTrend, {
            type: 'line',
            data: {
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                datasets: [{
                    label: 'Total Scan',
                    data: [1200, 1900, 1500, 2400, 2800, 3200, 2845],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
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

    // Device Chart (Doughnut)
    const ctxDevice = document.getElementById('deviceChart');
    if (ctxDevice) {
        new Chart(ctxDevice, {
            type: 'doughnut',
            data: {
                labels: ['iOS (iPhone)', 'Android', 'Desktop / Tablet'],
                datasets: [{
                    data: [62, 30, 8],
                    backgroundColor: ['#8b5cf6', '#3b82f6', '#06b6d4'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12 } }
                }
            }
        });
    }
}

// ==========================================
// 6. PROSES FORM PENYIMPANAN DATA & WHATSAPP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Init Galeri Default
    switchTab('fashion');
    
    // Init Live Demo & Charts
    startDemoTimer();
    initAnalyticsCharts();

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // Form Handling (100% Menggunakan Rumus milik Anda)
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>Menyimpan Data...</span>`;

            const formData = new FormData(this);
            const data = {
                nama: formData.get('nama'),
                whatsapp: formData.get('whatsapp'),
                bisnis: formData.get('bisnis') || '-',
                kebutuhan: formData.get('kebutuhan'),
                pesan: formData.get('pesan') || '-'
            };

            // Kirim Data ke Apps Script Google Sheets
            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data)
            })
            .then(() => {
                const textWA = `Halo, saya *${data.nama}* (${data.bisnis}).\n\n` +
                               `*Kebutuhan:* ${data.kebutuhan}\n` +
                               `*No. WA:* ${data.whatsapp}\n` +
                               `*Catatan:* ${data.pesan}\n\n` +
                               `Saya berminat dengan SmartQR dan ingin konsultasi lebih lanjut.`;
                
                window.open(`https://wa.me/${NOMOR_WA_TUJUAN}?text=${encodeURIComponent(textWA)}`, '_blank');
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                this.reset();
            })
            .catch(error => {
                console.error("Error:", error);
                const textWA = `Halo, saya *${data.nama}* (${data.bisnis}). Saya ingin konsultasi SmartQR.`;
                window.open(`https://wa.me/${NOMOR_WA_TUJUAN}?text=${encodeURIComponent(textWA)}`, '_blank');
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }
});