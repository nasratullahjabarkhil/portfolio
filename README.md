# Portfolio - Nasratullah Jabarkhil

Portfolio personal interactivo de un ingeniero de software. Incluye proyectos, habilidades técnicas y formulario de contacto.

## 🚀 Características

- ✨ Diseño responsive y moderno con glassmorphism
- 🌓 Modo claro/oscuro con persistencia
- 🌍 Soporte bilingüe (Español/Inglés)
- 📱 Totalmente optimizado para dispositivos móviles
- 📧 Formulario de contacto funcional con Formspree
- 🎨 Efectos visuales suaves y animaciones
- ♿ Enfocado en accesibilidad web

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Custom Properties, Grid, Flexbox, Glassmorphism
- **JavaScript (Vanilla)** - Sin dependencias externas
- **Formspree** - Gestión de formularios de contacto

## 📦 Estructura del Proyecto

```
portfolio/
├── index.html          # Página principal
├── css/
│   └── styles.css     # Estilos globales y responsive
├── js/
│   └── app.js         # Lógica de interacción (tema, i18n, formulario)
├── assets/            # Imágenes, CVs y recursos
└── README.md          # Documentación
```

## 🚀 Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/nasratullahjabarkhil/portfolio.git
   ```

2. Navega al directorio:
   ```bash
   cd portfolio
   ```

3. Abre `index.html` en tu navegador favorito o usa un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve
   ```

4. Visita `http://localhost:8000` en tu navegador.

## ✨ Funcionalidades Principales

### Sistema de Temas
- Modo oscuro/claro con almacenamiento persistente en `localStorage`
- Transiciones suaves entre temas
- Variables CSS para fácil personalización

### Internacionalización
- Soporte para Español e Inglés
- Cambio dinámico de idioma sin recargar la página
- CVs específicos por idioma

### Formulario de Contacto
- Integración con Formspree para envío de emails
- Validación HTML5 nativa
- Mensajes de estado bilingües

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:

```css
:root {
    --bg: #0f1724;
    --card: #0b1220;
    --text: #e6eef8;
    --accent: #7dd3fc;
    /* ... más variables */
}
```

### Agregar Proyectos
Añade nuevos proyectos en la sección `#projects` de `index.html`:

```html
<article class="project">
  <h3>Nombre del Proyecto</h3>
  <p data-es="Descripción ES" data-en="Description EN">Descripción</p>
  <p class="project-tags">Tech • Stack • Tags</p>
  <p><a class="link" href="URL">Ver en GitHub</a></p>
</article>
```

## 📱 Responsive Design

El portfolio está optimizado para:
- 📱 Móviles (320px - 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1920px+)

## 🌐 Navegadores Compatibles

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Opera (últimas 2 versiones)

## 📄 Licencia

© 2024-2025 Nasratullah Jabarkhil. Todos los derechos reservados.

## 🤝 Contribuciones

Las sugerencias y mejoras son bienvenidas. Siéntete libre de abrir un issue o pull request.

## 📧 Contacto

- **GitHub**: [@nasratullahjabarkhil](https://github.com/nasratullahjabarkhil)
- **LinkedIn**: [Nasratullah Jabarkhil](https://www.linkedin.com/in/nasratullah-jabarkhil-jabarkhil-274b9b178/)
- **Email**: A través del [formulario de contacto](https://nasratullahjabarkhil.github.io/portfolio/#contact)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
