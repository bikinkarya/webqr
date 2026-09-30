const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZVznwLX1WQRKzCoOr1bbAwlcjzOsIhdcEhlhu8u2dEzJIfMCH6sGTm-b3_HURD9PB/exec"; 
const NOMOR_WA_TUJUAN = "6285353664560";

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

function switchTab(tabKey) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.className = "tab-btn px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 bg-slate-900 border-slate-800 text-slate-400 hover:text-white";
    });

    const activeBtn = document.getElementById(`tab-${tabKey}`);
    if (activeBtn) {
        activeBtn.className = "tab-btn px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30";
    }

    const container = document.getElementById('galleryContainer');
    const items = galleryData[tabKey] || [];

    container.innerHTML = items.map(item => `
        <div class="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition group">
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

function startDemoTimer() {
    let timeLeft = 300;
    const timerElem = document.getElementById('demoTimer');
    setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        if (timerElem) timerElem.innerText = `${minutes}:${seconds}`;
        if (timeLeft <= 0) timeLeft = 300;
        else timeLeft--;
    }, 1000);
}

// Fetch Realtime Analytics dari Apps Script
function fetchRealtimeAnalytics() {
    fetch(`${SCRIPT_URL}?action=getAnalytics`)
        .then(res => res.json())
        .then(data => {
            const total = data.totalScan || 0;
            const ios = data.devices.iOS || 0;
            const android = data.devices.Android || 0;
            const desktop = data.devices.Desktop || 0;

            document.getElementById('statTotalScan').innerText = total.toLocaleString();
            document.getElementById('statIos').innerText = ios;
            document.getElementById('statAndroid').innerText = android;
            document.getElementById('statDesktop').innerText = desktop;

            renderCharts(total, ios, android, desktop);
        })
        .catch(() => {
            renderCharts(12, 5, 5, 2);
        });
}

function renderCharts(total, ios, android, desktop) {
    const ctxTrend = document.getElementById('scanTrendChart');
    if (ctxTrend) {
        new Chart(ctxTrend, {
            type: 'line',
            data: {
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                datasets: [{
                    label: 'Scan',
                    data: [Math.round(total*0.1), Math.round(total*0.15), Math.round(total*0.12), Math.round(total*0.18), Math.round(total*0.2), Math.round(total*0.12), total],
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

    const ctxDevice = document.getElementById('deviceChart');
    if (ctxDevice) {
        new Chart(ctxDevice, {
            type: 'doughnut',
            data: {
                labels: ['iOS', 'Android', 'Desktop/Lainnya'],
                datasets: [{
                    data: [ios, android, desktop],
                    backgroundColor: ['#8b5cf6', '#6366f1', '#14b8a6'],
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
}

document.addEventListener('DOMContentLoaded', () => {
    switchTab('fashion');
    startDemoTimer();
    fetchRealtimeAnalytics();

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

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

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data)
            })
            .then(() => {
                const textWA = `Halo, saya *${data.nama}* (${data.bisnis}).\n\n*Kebutuhan:* ${data.kebutuhan}\n*No. WA:* ${data.whatsapp}\n*Catatan:* ${data.pesan}\n\nSaya berminat dengan SmartQR dan ingin konsultasi lebih lanjut.`;
                window.open(`https://wa.me/${NOMOR_WA_TUJUAN}?text=${encodeURIComponent(textWA)}`, '_blank');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                this.reset();
            })
            .catch(() => {
                const textWA = `Halo, saya *${data.nama}* (${data.bisnis}). Saya ingin konsultasi SmartQR.`;
                window.open(`https://wa.me/${NOMOR_WA_TUJUAN}?text=${encodeURIComponent(textWA)}`, '_blank');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }
});