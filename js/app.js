// Interactividad: tema, smooth scroll, formulario, selector de idioma, menú móvil, animaciones y toast notifications
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const langButtons = document.querySelectorAll('.lang-btn');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const backToTopBtn = document.getElementById('back-to-top');
  const toastContainer = document.getElementById('toast-container');
  const scrollProgress = document.getElementById('scroll-progress');
  const projectFilters = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');

  // Sistema de Toast Notifications
  function showToast(message, type = 'info', title = '', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    const defaultTitles = {
      success: currentLang === 'es' ? 'Éxito' : 'Success',
      error: currentLang === 'es' ? 'Error' : 'Error',
      warning: currentLang === 'es' ? 'Advertencia' : 'Warning',
      info: currentLang === 'es' ? 'Información' : 'Information'
    };
    
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : `<div class="toast-title">${defaultTitles[type]}</div>`}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Cerrar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Cerrar al hacer click
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Auto-cerrar después del tiempo especificado
    if(duration > 0) {
      setTimeout(() => removeToast(toast), duration);
    }
    
    return toast;
  }
  
  function removeToast(toast) {
    toast.classList.add('removing');
    setTimeout(() => {
      if(toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  // Año en footer
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Intersection Observer para animaciones de scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observar todos los elementos con clase fade-in
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  
  // Observar items de timeline
  document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
  
  // Barra de progreso de scroll
  function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    if(scrollProgress) {
      scrollProgress.style.width = scrollPercentage + '%';
      scrollProgress.setAttribute('aria-valuenow', Math.round(scrollPercentage));
    }
  }
  
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress(); // Inicializar

  // Sistema de filtrado de proyectos
  if(projectFilters.length > 0 && projects.length > 0) {
    projectFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Actualizar botón activo
        projectFilters.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        filter.classList.add('active');
        filter.setAttribute('aria-pressed', 'true');
        
        const filterValue = filter.dataset.filter;
        
        // Filtrar proyectos con animación
        projects.forEach((project, index) => {
          setTimeout(() => {
            const categories = project.dataset.category || '';
            
            if(filterValue === 'all' || categories.includes(filterValue)) {
              project.classList.remove('hidden');
            } else {
              project.classList.add('hidden');
            }
          }, index * 50); // Animación escalonada
        });
      });
    });
  }
  
  // Botón volver arriba
  if(backToTopBtn) {
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
      if(window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll al inicio al hacer click
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Menú móvil toggle
  if(navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if(!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      }
    });
  }

  // Sistema de traducción
  let currentLang = localStorage.getItem('lang') || 'es';
  function setLanguage(lang){
    currentLang = lang;
    localStorage.setItem('lang', lang);
    // Actualizar botones activos y aria-pressed
    langButtons.forEach(btn=>{
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    // Actualizar tooltips según idioma
    document.querySelectorAll('.has-tooltip').forEach(el => {
      if(lang === 'en' && el.dataset.tooltipEn) {
        el.dataset.tooltip = el.dataset.tooltipEn;
      } else if(lang === 'es' && el.dataset.tooltip) {
        // Ya tiene el tooltip en español por defecto
      }
    });
    
    // Aplicar traducciones a elementos con data-es y data-en
    document.querySelectorAll('[data-es][data-en]').forEach(el=>{
      const text = el.dataset[lang];
      if(!text) return;
      // Para elementos con hijos complejos (como h1 con span), solo cambiamos el textNode inicial
      if(el.tagName === 'H1' && el.querySelector('.accent')){
        const nameSpan = el.querySelector('.accent');
        const nameText = nameSpan ? nameSpan.textContent : '';
        el.childNodes[0].textContent = text + ' ';
        if(nameSpan) nameSpan.textContent = nameText;
      } else if(el.tagName === 'P' && el.querySelector('.accent')){
        // Para párrafos con estructura especial (footer)
        const parts = Array.from(el.childNodes);
        const hasCopyright = parts.some(n=>n.nodeType===3 && n.textContent.includes('©'));
        if(hasCopyright){
          // Reconstruir manteniendo copyright y año
          const year = el.querySelector('#year')?.textContent || '';
          const link = el.querySelector('a');
          const linkText = link ? link.dataset[lang] || link.textContent : '';
          if(link && linkText) link.textContent = linkText;
          // Reemplazar solo la parte de "Ingeniero de software"
          const middle = el.childNodes[2]; // Texto entre año y link
          if(middle && middle.nodeType === 3){
            middle.textContent = ' Nasratullah Jabarkhil — ' + text + ' — ';
          }
        } else {
          el.textContent = text;
        }
      } else if(el.tagName === 'LABEL'){
        // Labels: mantener el input
        const input = el.querySelector('input, textarea');
        el.childNodes[0].textContent = text;
        if(input && !el.contains(input)) el.appendChild(input);
      } else {
        el.textContent = text;
      }
    });
  }
  // CV dinámico según idioma
  const cvLink = document.getElementById('cv-link');
  function updateCVLink(){
    const filename = currentLang === 'es' 
      ? 'CV_Nasratullah_Jabarkhil_ES.pdf' 
      : 'CV_Nasratullah_Jabarkhil_EN.pdf';
    cvLink.href = 'assets/' + filename;
    cvLink.download = filename;
    cvLink.setAttribute('type', 'application/pdf');
    cvLink.setAttribute('target', '_blank');
  }
  
  // Descarga de CV con verificación de archivo y manejo de errores
  cvLink.addEventListener('click', (e) => {
    e.preventDefault();
    const filename = currentLang === 'es' 
      ? 'CV_Nasratullah_Jabarkhil_ES.pdf' 
      : 'CV_Nasratullah_Jabarkhil_EN.pdf';
    const filepath = 'assets/' + filename;
    
    // Verificar si el archivo existe antes de descargar
    fetch(filepath, {method: 'HEAD'})
      .then(response => {
        if(response.ok) {
          // Archivo existe, proceder con la descarga
          const link = document.createElement('a');
          link.href = filepath;
          link.download = filename;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // Archivo no encontrado
          const message = currentLang === 'es' 
            ? 'CV no disponible en este momento. Por favor, contacta directamente.' 
            : 'CV not available at this time. Please contact directly.';
          showToast(message, 'warning', '', 5000);
        }
      })
      .catch(error => {
        // Error de red o servidor
        console.error('Error al descargar CV:', error);
        const message = currentLang === 'es' 
          ? 'Error al descargar el CV. Por favor, intenta de nuevo más tarde.' 
          : 'Error downloading CV. Please try again later.';
        showToast(message, 'error', '', 5000);
      });
  });
  
  // Inicializar idioma guardado
  setLanguage(currentLang);
  updateCVLink();
  
  // Event listeners para cambiar idioma
  langButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      setLanguage(btn.dataset.lang);
      updateCVLink();
      // Actualizar aria-pressed de filtros
      projectFilters.forEach(f => {
        f.setAttribute('aria-pressed', f.classList.contains('active') ? 'true' : 'false');
      });
    });
  });

  // Tema (dark / light)
  const saved = localStorage.getItem('theme');
  if(saved === 'light') document.documentElement.classList.add('light');
  function toggleTheme(){
    document.documentElement.classList.toggle('light');
    const now = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', now);
  }
  themeToggle && themeToggle.addEventListener('click', toggleTheme);

  // Smooth scroll para enlaces internos con mejor accesibilidad
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const t = document.querySelector(href);
        if(t) {
          t.scrollIntoView({behavior:'smooth',block:'start'});
          // Mejorar accesibilidad: mover foco al elemento
          t.setAttribute('tabindex', '-1');
          t.focus();
          // Remover tabindex después de que el foco se mueva naturalmente
          t.addEventListener('blur', () => t.removeAttribute('tabindex'), {once: true});
        }
      }
    })
  });

  // Formulario: envío con Formspree
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Mostrar estado de carga
      submitBtn.disabled = true;
      submitBtn.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';
      status.textContent = '';
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        
        if(response.ok){
          const message = currentLang === 'es' 
            ? '¡Tu mensaje ha sido enviado! Te responderé pronto.' 
            : 'Your message has been sent! I\'ll reply soon.';
          showToast(message, 'success', '', 6000);
          form.reset();
        } else {
          const message = currentLang === 'es' 
            ? 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.' 
            : 'There was an error sending the message. Please try again.';
          showToast(message, 'error', '', 5000);
        }
      } catch(error) {
        const message = currentLang === 'es' 
          ? 'Error de conexión. Por favor, verifica tu internet e intenta de nuevo.' 
          : 'Connection error. Please check your internet and try again.';
        showToast(message, 'error', '', 5000);
      } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
})();
