// Theme toggle (Modo Claro / Modo Escuro — replica os dois estados do Figma via CSS vars)
(function () {
    const root = document.documentElement;
    const stored = localStorage.getItem('athletiq-theme');
    const initial = stored || 'light';
    root.setAttribute('data-theme', initial);

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;
        updateToggleIcon(toggle, initial);

        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('athletiq-theme', next);
            updateToggleIcon(toggle, next);
        });
    });

    function updateToggleIcon(el, theme) {
        el.textContent = theme === 'dark' ? '☀️' : '🌙';
        el.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    }
})();

// Login: agradecimento ao concluir
function handleLoginSubmit(form) {
    const btn = form.querySelector('.btn-primary');
    btn.textContent = 'Entrando ✓';

    const emailInput = form.querySelector('#email-login');
    localStorage.setItem('athletiq-auth', JSON.stringify({
        email: emailInput ? emailInput.value : ''
    }));

    showLoginThanks();

    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1500);
}

// Estado de login: alterna "Começar Agora" / "Sair da Conta" no header
document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('auth-nav-btn');
    if (!authBtn) return;

    const isLoggedIn = !!localStorage.getItem('athletiq-auth');

    const heroBtn = document.getElementById('hero-comecar-btn');
    if (heroBtn) {
        heroBtn.style.display = isLoggedIn ? 'none' : '';
    }

    if (!isLoggedIn) return;

    authBtn.textContent = 'Sair da Conta';
    authBtn.setAttribute('href', '#');
    authBtn.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('athletiq-auth');
        location.reload();
    });
});

function showLoginThanks() {
    let toast = document.querySelector('.login-thanks');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'login-thanks';
        document.body.appendChild(toast);
    }
    toast.textContent = 'Login realizado com sucesso! 🎉';
    toast.classList.add('show');
}

// Nav mobile (menu hamburguer simples)
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
});