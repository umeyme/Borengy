<script>
    // --- ELEMENT TANIMLARI ---
    const header = document.querySelector('header');
    const form = document.getElementById('appointmentForm');
    const submitBtn = document.getElementById('submitBtn'); // Mevcut butonun
    const phoneInput = document.getElementById('phone'); // Mevcut telefon alanÝn
    const inputs = document.querySelectorAll('input[required]');
    const successCard = document.getElementById('successCard');
    const formContainer = document.getElementById('form-container');
    let lastScrollY = window.scrollY;

    // --- 1. MEN† GÜZLEME (NAVÜGASYON) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { 
            if (window.scrollY > lastScrollY) {
                header.classList.add('nav-hidden');
            } 
        } else {
            header.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // --- 2. FORM KONTROL† (AD + SOYAD + 11 HANE TELEFON) ---
    if (form) {
        form.addEventListener('input', () => {
            let allFilled = true;
            
            // Ad ve Soyad dolu mu?
            inputs.forEach(input => {
                if (input.id !== 'phone') {
                    if (!input.value.trim()) allFilled = false;
                }
            });

            // Telefon KontrolŸ: BoßluklarÝ atarak rakam sayÝsÝna bak (Tam 11 olmalÝ)
            const rawPhone = phoneInput.value.replace(/\s/g, ''); 
            const isPhoneValid = rawPhone.length === 11;

            // Þartlar tamamsa butonu canlandÝr, deÛilse pasif bÝrak
            if (allFilled && isPhoneValid) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                submitBtn.style.cursor = "pointer";
            } else {
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.4";
                submitBtn.style.cursor = "not-allowed";
            }
        });

        // Form Gšnderimi (Onay KartÝ Animasyonu)
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formContainer.style.opacity = "0";
            formContainer.style.transition = "opacity 0.4s ease";
            
            setTimeout(() => {
                formContainer.style.display = "none";
                successCard.classList.add('show');
            }, 400);
        });
    }

    // --- 3. SMOOTH SCROLL ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
</script>