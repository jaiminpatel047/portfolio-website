// Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        const themeIcon = themeToggle.querySelector('.icon');

        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }

        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Cursor hover effect
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .stat-card, .contact-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });

        // CV Download
        document.getElementById('downloadCV').addEventListener('click', function(e) {
            e.preventDefault();
            
            const cvContent = `YOUR NAME
.NET Developer & Software Architect

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
→ Email: your.email@example.com
→ Phone: +1 (123) 456-7890
→ Location: Your City, Country
→ GitHub: github.com/yourusername
→ LinkedIn: linkedin.com/in/yourusername
→ Portfolio: yourwebsite.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL SUMMARY

Passionate .NET Developer with 5+ years of experience building enterprise-level 
applications. Expert in C#, ASP.NET Core, and modern web technologies. Proven track 
record of delivering scalable, maintainable solutions using clean architecture 
principles and SOLID design patterns.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNICAL SKILLS

Backend: C#, .NET Core 8, ASP.NET Core MVC, Web API, Entity Framework, LINQ
Frontend: React, Angular, Blazor, TypeScript, JavaScript, HTML5/CSS3
Database: SQL Server, PostgreSQL, MongoDB, Redis
Cloud & DevOps: Azure, AWS, Docker, Kubernetes, CI/CD
Architecture: Microservices, Clean Architecture, SOLID, Design Patterns

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL EXPERIENCE

Senior .NET Developer | Tech Company Inc. | 2022 - Present
→ Architected microservices-based e-commerce platform (100K+ daily transactions)
→ Led .NET Framework to .NET 8 migration (60% performance improvement)
→ Mentored 5 junior developers with code reviews and training
→ Reduced API response time by 70% through optimization

.NET Developer | Digital Solutions Ltd. | 2020 - 2021
→ Developed RESTful APIs (500K+ daily requests, 99.9% uptime)
→ Built HIPAA-compliant healthcare management system
→ Implemented OAuth 2.0 authentication with ASP.NET Core Identity
→ Achieved 85% code coverage with comprehensive testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION

Bachelor of Science in Computer Science | University Name | 2019

CERTIFICATIONS
→ Microsoft Certified: Azure Developer Associate
→ Microsoft Certified: .NET Developer
→ Azure Solutions Architect Expert`;

            const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'YourName_DotNet_Developer_CV.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section-header, .skill-category, .project-card, .stat-card, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    

// =======================
// Project Modal (Popup)
// =======================
window.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');

  const modalEmoji = document.getElementById('modalEmoji');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalGithub = document.getElementById('modalGithub');
  const modalLive = document.getElementById('modalLive');

  if (!modalOverlay) return;

  function openProjectModal(card) {
    const emoji = card.querySelector('.project-image')?.textContent?.trim() || '💼';
    const category = card.querySelector('.project-category')?.textContent?.trim() || 'Project';
    const title = card.querySelector('.project-content h3')?.textContent?.trim() || 'Project';
    const desc = card.querySelector('.project-description')?.textContent?.trim() || '';

    const techTags = Array.from(card.querySelectorAll('.project-tech .tech-tag'))
      .map(x => x.textContent.trim())
      .filter(Boolean);

    const links = Array.from(card.querySelectorAll('.project-links a'));
    const githubLink = links.find(a => /github/i.test(a.textContent) || /github/i.test(a.href))?.href || '';
    const liveLink = links.find(a => /live|demo|visit/i.test(a.textContent))?.href || '';

    modalEmoji.textContent = emoji;
    modalCategory.textContent = category;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    modalTech.innerHTML = '';
    techTags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      modalTech.appendChild(span);
    });

    if (githubLink) {
      modalGithub.style.display = 'inline-flex';
      modalGithub.href = githubLink;
    } else {
      modalGithub.style.display = 'none';
    }

    if (liveLink) {
      modalLive.style.display = 'inline-flex';
      modalLive.href = liveLink;
    } else {
      modalLive.style.display = 'none';
    }

    modalOverlay.classList.add('show');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalOverlay.classList.remove('show');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.project-links a')) return;
      openProjectModal(card);
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
      closeProjectModal();
    }
  });
});


// =======================
// Nav Active Link (scroll spy)
// =======================
(function () {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function setActive() {
    const scrollY = window.scrollY + 120; // offset for fixed nav
    let current = sections[0];
    for (const sec of sections) {
      if (sec.offsetTop <= scrollY) current = sec;
    }
    links.forEach(a => a.classList.remove('active'));
    const active = links.find(a => a.getAttribute('href') === `#${current.id}`);
    if (active) active.classList.add('active');
  }

  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('load', setActive);
})();

