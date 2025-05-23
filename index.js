// Initialisation du slider hero
const heroSwiper = new Swiper('.hero-slider .swiper', {
    loop: true,
    speed: 1000,
    parallax: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Changement de style de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-main');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Filtrage des voitures par catégorie
const tabBtns = document.querySelectorAll('.tab-btn');
const voitureCards = document.querySelectorAll('.voiture-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filtrer les voitures
        voitureCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Animation au défilement
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.marque-card, .voiture-card, .experience-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Préparation des éléments pour l'animation
document.querySelectorAll('.marque-card, .voiture-card, .experience-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

// Écouteur d'événement pour l'animation
window.addEventListener('scroll', animateOnScroll);
// Déclencher une première fois au chargement
window.addEventListener('load', animateOnScroll);

// Modal pour les détails des voitures
document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.voiture-card');
        const title = card.querySelector('h3').textContent;
        const imgSrc = card.querySelector('img').src;
        const specs = card.querySelector('.voiture-specs').innerHTML;
        const price = card.querySelector('.price').textContent;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-image">
                    <img src="${imgSrc}" alt="${title}">
                </div>
                <div class="modal-body">
                    <h2>${title}</h2>
                    <div class="modal-specs">${specs}</div>
                    <div class="modal-price">${price}</div>
                    <div class="modal-features">
                        <h4>Caractéristiques principales</h4>
                        <ul>
                            <li><i class="fas fa-check"></i> Système multimédia MBUX</li>
                            <li><i class="fas fa-check"></i> Sièges chauffants et ventilés</li>
                            <li><i class="fas fa-check"></i> Toit panoramique</li>
                            <li><i class="fas fa-check"></i> Pack conduite autonome</li>
                            <li><i class="fas fa-check"></i> Système audio Burmester®</li>
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-essai"><i class="fas fa-car"></i> Demander un essai</button>
                        <button class="btn-offre"><i class="fas fa-euro-sign"></i> Demander une offre</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Fermer le modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
        
        // Fermer en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Ajout du CSS pour le modal
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
        padding: 20px;
    }
    
    .modal-content {
        background-color: white;
        border-radius: 10px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 30px;
        cursor: pointer;
        color: var(--text-light);
        transition: color 0.3s;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .close-modal:hover {
        color: var(--accent);
    }
    
    .modal-image {
        position: relative;
        height: 100%;
    }
    
    .modal-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .modal-body {
        padding: 40px;
    }
    
    .modal-body h2 {
        margin-bottom: 20px;
        color: var(--primary);
    }
    
    .modal-specs {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
    
    .modal-price {
        font-size: 24px;
        font-weight: 700;
        color: var(--secondary);
        margin-bottom: 30px;
    }
    
    .modal-features h4 {
        margin-bottom: 15px;
        font-size: 18px;
    }
    
    .modal-features ul {
        list-style: none;
        margin-bottom: 30px;
    }
    
    .modal-features li {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }
    
    .modal-features i {
        margin-right: 10px;
        color: var(--secondary);
    }
    
    .modal-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }
    
    .btn-essai, .btn-offre {
        padding: 12px;
        border: none;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .btn-essai {
        background-color: var(--secondary);
        color: white;
    }
    
    .btn-essai:hover {
        background-color: #0088C3;
    }
    
    .btn-offre {
        background-color: var(--primary);
        color: white;
    }
    
    .btn-offre:hover {
        background-color: #333;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .modal-content {
            grid-template-columns: 1fr;
        }
        
        .modal-image {
            height: 250px;
        }
        
        .modal-body {
            padding: 25px;
        }
        
        .modal-specs {
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .modal-actions {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(modalStyle);