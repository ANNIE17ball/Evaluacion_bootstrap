/* ====================================================================
   GEMINI HOME ENTERTAINMENT — SCRIPT PRINCIPAL COMPLETO
   ==================================================================== */

/* ── SLIDESHOW TARJETA 3 ────────────────────────────────────────── */
(function () {
    const wrap = document.getElementById('slideshowWrap');
    if (!wrap) return;

    const imgs = Array.from(wrap.querySelectorAll('img'));
    if (imgs.length === 0) return;

    imgs.forEach(img => img.style.transition = 'none');

    let current = 0;

    function changeImage() {
        imgs.forEach(img => img.classList.remove('slide-active'));
        current = Math.floor(Math.random() * imgs.length);
        imgs[current].classList.add('slide-active');

        let nextInterval = current === 0
            ? Math.floor(Math.random() * 2000) + 3500
            : Math.floor(Math.random() * 300) + 200;

        setTimeout(changeImage, nextInterval);
    }

    current = 0;
    imgs.forEach((img, i) => img.classList.toggle('slide-active', i === 0));
    setTimeout(changeImage, Math.floor(Math.random() * 2000) + 3500);
})();

/* ── IRIS — El ojo sigue al cursor ───────────────────────────────── */
(function () {
    const irisContainer = document.getElementById('irisContainer');
    const irisBall = document.getElementById('irisBall');

    if (!irisContainer || !irisBall) return;

    const MAX_MOVE = 35;

    document.addEventListener('mousemove', (e) => {
        const rect = irisContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        const move = Math.min(dist * 0.25, MAX_MOVE);

        irisBall.style.transform =
            `translate(calc(-50% + ${Math.cos(angle) * move}px), calc(-50% + ${Math.sin(angle) * move}px))`;
    });

    document.addEventListener('mouseleave', () => {
        if (irisBall) {
            irisBall.style.transform = 'translate(-50%, -50%)';
        }
    });
})();

/* ── TÍTULO DEL HEADER CON FLASHES (CORREGIDO) ──────────────────── */
(function() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarFlashes);
    } else {
        iniciarFlashes();
    }

    function iniciarFlashes() {
        const titleElement = document.getElementById('headerTitle');

        if (!titleElement) {
            console.warn("⚠️ No se encontró headerTitle");
            return;
        }

        console.log("✅ Flashes iniciados (modo espontáneo)");

        const tituloOriginal = "Gemini Home Entertainment";

        const mensajesFlash = [
            "ELLOS TE MIRAN",
            "SAL DE CASA",
            "NO ESTÁS SEGURO",
            "IRIS TE BUSCA",
            "EL BOSQUE LLAMA",
            "CORRE",
            "YA VIERON",
            "MIRA DETRÁS",
            "ES TARDE",
            "NO ABRAS LA PUERTA",
            "ESTÁN AQUÍ",
            "TE ENCONTRARON",
            "DETRÁS DE TI",
            "CUIDADO",
            "YA LLEGARON"
        ];

        let modoFlash = false;
        let timeoutId = null;
        let programarProximoFlash;

        function activarFlash() {
            if (modoFlash) return;
            modoFlash = true;

            // Elegir mensaje aleatorio
            const mensaje = mensajesFlash[Math.floor(Math.random() * mensajesFlash.length)];
            titleElement.textContent = mensaje;
            titleElement.classList.add('flash-mode');

            // 15% de probabilidad de pánico extremo
            if (Math.random() < 0.15) {
                titleElement.classList.add('panic-flash');
            }

            // Duración del flash: entre 0.3 y 2 segundos
            const duracionFlash = Math.floor(Math.random() * 1700) + 300;

            // Limpiar timeout anterior si existe
            if (timeoutId) clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                titleElement.textContent = tituloOriginal;
                titleElement.classList.remove('flash-mode', 'panic-flash');
                modoFlash = false;
                timeoutId = null;

                // Programar el próximo flash después de que termine este
                programarProximoFlash();
            }, duracionFlash);
        }

        programarProximoFlash = function () {
            // Tiempo aleatorio: entre 8 y 30 segundos
            const tiempoHastaProximo = Math.floor(Math.random() * 22000) + 8000; // 8-30 segundos

            setTimeout(() => {
                if (!modoFlash) {
                    activarFlash();
                }
            }, tiempoHastaProximo);
        };

        // Flash de bienvenida después de 3 segundos
        setTimeout(() => {
            if (!modoFlash) {
                activarFlash();
            } else {
                programarProximoFlash();
            }
        }, 3000);

        // Programar el primer flash normal
        programarProximoFlash();
    }
})();

/* ── CRÉDITOS ───────────────────────────────────────────────────── */
function creditos() {
    alert("Remy Abode es el creador canadiense de Gemini Home Entertainment, el cual escribió, dirigió, animó y produjo toda la serie prácticamente solo. Y que me dio la idea para mi evaluación");
}

/* ── MENSAJE OCULTO EN CONSOLA ──────────────────────────────────── */
console.log("%c👁️ GEMINI HOME ENTERTAINMENT", "font-size: 20px; color: #8b0010;");
console.log("%cTodo está bajo control...", "color: #5b82b0;");
console.log("%c...o quizás no.", "color: #c8a878; font-style: italic;");