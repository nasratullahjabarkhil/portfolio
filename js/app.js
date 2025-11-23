// Interactividad: tema, smooth scroll, formulario y selector de idioma
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const langButtons = document.querySelectorAll('.lang-btn');

  // Año en footer
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Sistema de traducción
  let currentLang = localStorage.getItem('lang') || 'es';
  function setLanguage(lang){
    currentLang = lang;
    localStorage.setItem('lang', lang);
    // Actualizar botones activos
    langButtons.forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.lang === lang);
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
    if(currentLang === 'es'){
      cvLink.href = 'assets/CV_Nasratullah_Jabarkhil_ES.pdf';
      cvLink.download = 'CV_Nasratullah_Jabarkhil_ES.pdf';
    } else {
      cvLink.href = 'assets/CV_Nasratullah_Jabarkhil_EN.pdf';
      cvLink.download = 'CV_Nasratullah_Jabarkhil_EN.pdf';
    }
  }
  
  // Inicializar idioma guardado
  setLanguage(currentLang);
  updateCVLink();
  
  // Event listeners para cambiar idioma
  langButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      setLanguage(btn.dataset.lang);
      updateCVLink();
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

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const t = document.querySelector(href);
        if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  });

  // Formulario: envío con Formspree
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      status.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        
        if(response.ok){
          status.textContent = currentLang === 'es' 
            ? '¡Mensaje enviado! Te responderé pronto.' 
            : 'Message sent! I\'ll reply soon.';
          form.reset();
        } else {
          status.textContent = currentLang === 'es' 
            ? 'Hubo un error. Por favor intenta de nuevo.' 
            : 'There was an error. Please try again.';
        }
      } catch(error) {
        status.textContent = currentLang === 'es' 
          ? 'Error de conexión. Intenta de nuevo.' 
          : 'Connection error. Try again.';
      }
    });
  }
})();
