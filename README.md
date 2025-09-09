# Korykaai - Modern Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and JavaScript. Optimized for performance, SEO, and accessibility with comprehensive security features for Cloudflare deployment.

## 🚀 Features

### Design & User Experience
- **Modern, Clean Design**: Professional layout with smooth animations and transitions
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Dark Mode Support**: Automatic dark mode based on user preferences
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Interactive Elements**: Hover effects, animations, and micro-interactions

### Performance & SEO
- **Optimized Performance**: Fast loading times with optimized assets
- **SEO Optimized**: Comprehensive meta tags, structured data, and semantic HTML
- **Progressive Web App**: PWA capabilities with web manifest
- **Image Optimization**: Lazy loading and modern image formats support
- **Caching Strategy**: Optimized caching headers for better performance

### Security & Accessibility
- **Security Headers**: Comprehensive security headers for protection
- **WCAG Compliant**: Accessible design following WCAG guidelines
- **Keyboard Navigation**: Full keyboard navigation support
- **Screen Reader Friendly**: Proper ARIA labels and semantic markup
- **Content Security Policy**: Strict CSP for enhanced security

### Technical Features
- **Modern JavaScript**: ES6+ features with graceful degradation
- **CSS Grid & Flexbox**: Modern layout techniques
- **Form Validation**: Client-side form validation with accessibility
- **Cross-browser Compatible**: Works across all modern browsers
- **Print Styles**: Optimized styles for printing

## 📁 Project Structure

```
korykaai/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── main.js         # Main JavaScript file
│   ├── images/             # Image assets
│   ├── icons/              # Icon files
│   └── fonts/              # Font files
├── robots.txt              # Search engine directives
├── sitemap.xml             # XML sitemap
├── site.webmanifest        # PWA manifest
├── _headers                # Cloudflare headers
├── .htaccess               # Apache configuration
├── favicon.ico             # Website favicon
└── README.md               # This file
```

## 🛠️ Setup & Installation

### Prerequisites
- A modern web browser
- A web server (Apache, Nginx, or Cloudflare Pages)
- Optional: Node.js for development tools

### Local Development

1. **Clone or download the project**
   ```bash
   git clone https://github.com/korykaai/portfolio.git
   cd portfolio
   ```

2. **Serve the files locally**
   
   Using Python (if installed):
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js (if installed):
   ```bash
   npx serve .
   ```
   
   Or simply open `index.html` in your browser for basic testing.

3. **Access the website**
   Open your browser and navigate to `http://localhost:8000`

### Customization

#### Personal Information
Edit the following sections in `index.html`:

1. **Meta Tags** (lines 5-15): Update title, description, and keywords
2. **Hero Section** (lines 85-95): Update name, title, and description
3. **About Section** (lines 140-170): Update personal information and stats
4. **Portfolio Section** (lines 180-280): Add your projects
5. **Skills Section** (lines 290-320): Update your skills
6. **Contact Section** (lines 330-370): Update contact information

#### Social Media Links
Update social media URLs in:
- Hero section social links (lines 100-120)
- Footer social links (lines 380-400)
- Structured data (lines 35-45)

#### Colors & Styling
Modify CSS custom properties in `assets/css/styles.css` (lines 3-50):
```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #f59e0b;  /* Accent color */
    --accent-color: #10b981;     /* Success color */
    /* ... other variables */
}
```

#### Images
Replace placeholder images in `assets/images/`:
- `profile-hero.jpg` - Hero section profile image
- `about-image.jpg` - About section image
- `project-1.jpg`, `project-2.jpg`, `project-3.jpg` - Portfolio project images
- `og-image.jpg` - Open Graph image for social sharing
- `twitter-card.jpg` - Twitter card image

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. **Connect your repository** to Cloudflare Pages
2. **Build settings**: No build command needed (static site)
3. **Environment variables**: None required
4. **Custom domain**: Configure your domain in Cloudflare
5. **Headers**: The `_headers` file will automatically configure security headers

### Apache Server

1. **Upload files** to your web server
2. **Configure SSL** certificate for HTTPS
3. **Verify .htaccess** is working for security headers
4. **Test performance** and security headers

### Nginx Server

Create an Nginx configuration file:
```nginx
server {
    listen 443 ssl http2;
    server_name korykaai.com www.korykaai.com;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Root directory
    root /var/www/korykaai;
    index index.html;
    
    # Caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security
    location ~ /\. {
        deny all;
    }
}
```

## 🔧 Configuration

### SEO Configuration

1. **Update sitemap.xml**: Add all your pages and update URLs
2. **Google Search Console**: Submit your sitemap
3. **Analytics**: Add Google Analytics or your preferred analytics tool
4. **Schema markup**: Update structured data with your information

### Security Configuration

The website includes comprehensive security measures:

- **Content Security Policy**: Prevents XSS attacks
- **HTTPS enforcement**: Redirects all HTTP traffic to HTTPS
- **Security headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **File access restrictions**: Blocks access to sensitive files

### Performance Optimization

- **Image optimization**: Use WebP format when possible
- **Minification**: Minify CSS and JavaScript for production
- **CDN**: Use Cloudflare or similar CDN for global distribution
- **Compression**: Enable Gzip/Brotli compression

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+

## 🎨 Customization Guide

### Adding New Sections

1. **HTML Structure**: Add new section in `index.html`
2. **Navigation**: Add link to navigation menu
3. **Styling**: Add CSS styles in `styles.css`
4. **JavaScript**: Add any interactive functionality in `main.js`

### Changing Color Scheme

Modify the CSS custom properties in `:root`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Adding Animations

Use the existing animation classes or create new ones:
```css
.your-animation {
    animation: fadeInUp 1s ease-out;
}
```

## 🔍 SEO Checklist

- [x] Semantic HTML structure
- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] Structured data (JSON-LD)
- [x] XML sitemap
- [x] Robots.txt file
- [x] Alt text for all images
- [x] Fast loading speed
- [x] Mobile-friendly design
- [x] HTTPS enabled
- [x] Clean URLs

## 🛡️ Security Features

- [x] Content Security Policy
- [x] X-Frame-Options header
- [x] X-Content-Type-Options header
- [x] X-XSS-Protection header
- [x] Referrer-Policy header
- [x] Strict-Transport-Security header
- [x] Permissions-Policy header
- [x] File access restrictions
- [x] HTTPS enforcement
- [x] Input validation and sanitization

## 📊 Performance Metrics

Target performance metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Lighthouse Score**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions:
- **Email**: hello@korykaai.com
- **GitHub Issues**: [Create an issue](https://github.com/korykaai/portfolio/issues)
- **Website**: [korykaai.com](https://korykaai.com)

## 🙏 Acknowledgments

- **Design inspiration**: Modern portfolio trends and best practices
- **Icons**: SVG icons for social media and UI elements
- **Fonts**: Inter font family for clean typography
- **Tools**: Various web development tools and resources

---

**Built with ❤️ by Korykaai**

*Last updated: January 2024*
