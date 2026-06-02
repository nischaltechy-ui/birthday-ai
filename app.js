/**
 * ==========================================================================
 * Birthday Surprise by Niz - Application Logic
 * High-performance, premium, offline-first client database and UX managers.
 * ==========================================================================
 */

// Global App State
const state = {
    surprises: [],
    filters: {
        category: 'all',
        searchQuery: ''
    },
    activeImageBase64: null // Holds the base64 string for the currently selected upload image
};

// LocalStorage Database Keys
const DB_KEY = 'birthday_surprises_niz_v10';

// Seed Data (Initial Premium Presets)
const SEED_SURPRISES = [
    {
        id: 'seed-traditional-birthday',
        title: 'Happy Birthday Traditional Embroidered Poster',
        category: 'Girls Stories',
        prompt: 'A cinematic, multi-layered digital collage portrait featuring a young woman with long dark hair wearing a vibrant red traditional outfit heavily adorned with intricate gold floral embroidery. The composition blends four different expressive poses of the same subject against a soft, gradient background transitioning from crisp white with faint, wavy marble-like lines at the top to a deep, hazy pinkish-red at the bottom. The largest, central figure shows her with a red dupatta gracefully draped over her head, smiling gently downward, while the surrounding portraits capture her laughing, making warm eye contact, and looking thoughtfully into the distance with her hand near her hair. The bottom center of the graphic features white english text reading "happy birthday", with the smaller, , creating a romantic and visually striking movie-poster aesthetic.9:16 ratio',
        wish: 'Happy Birthday! May your year ahead be as vibrant, beautiful, and richly embroidered with happiness as your stunning traditional red outfit! ✨🌸❤️',
        image: './assets/traditional_birthday.jpg',
        createdAt: new Date('2026-06-01T22:58:00Z').toISOString(),
        isSeed: true
    },
    {
        id: 'seed-lime-birthday',
        title: 'Happy Birthday Lime Reflection Poster',
        category: 'Boys Stories',
        prompt: 'A striking, modern birthday graphic that seamlessly combines black-and-white photography with bold, colorful typography. At the bottom of the frame, a young man with a mustache, dressed in a checkered button-down shirt, stands with his hands in his pockets facing the camera against a softly blurred, moody background of a serene lake and distant hills. At the top of the composition, an upside-down, semi-translucent mirror image of the man facing away creates a surreal, reflective effect blending into the pale sky. Dominating the center of the poster is vertically elongated, bright lime-green block text spelling "BIRTHDAY," which dramatically breaks up the monochrome palette. Intersecting the middle of these massive green letters is the word "h a p p y" overlaid horizontally in a delicate, widely spaced, white lowercase sans-serif font, resulting in a stylish, contemporary, and artistic design layout.',
        wish: 'h a p p y B I R T H D A Y Akhil! Wishing you an artistic, contemporary year filled with reflective peace, modern style, and bright achievements! 🟢✨🖤',
        image: './assets/lime_birthday.jpg',
        createdAt: new Date('2026-06-01T23:02:00Z').toISOString(),
        isSeed: true
    },
    {
        id: 'seed-y2k-birthday',
        title: 'Happy Birthday Y2K Poster',
        category: 'Boys Stories',
        prompt: 'A vibrant, purple-tinted digital collage portrait featuring a young man with short dark hair and a light beard as the central subject, wearing black rectangular sunglasses and a purple t-shirt with large reversed white text, smiling confidently while giving a thumbs-up. The background is a layered composite of faded, semi-transparent monochrome images of the same man in different casual poses, such as wearing a helmet and pointing to his head. The entire composition is tied together with a retro, Y2K-inspired aesthetic, including horizontal VHS-style scanlines, a deep violet color grade, and glowing white pixelated light patterns scattered across the frame. Prominently displayed in the upper center is stylized white text that reads "HAPPY BIRTHDAY" above the name "AKHIL" in a sharp, edgy custom font, with a small watermark reading "created by 4dithynn" visible on the right edge, resulting in a dynamic and highly stylized celebratory graphic.',
        wish: 'PLAY ▶ PM 07:07 APR. 24 2024. Happy Birthday Akhil! Keep smiling, keep rockin\', and keep giving those thumbs-ups! You are magic! 💜✨👾',
        image: './assets/y2k_birthday.jpg',
        createdAt: new Date('2026-06-01T22:47:00Z').toISOString(),
        isSeed: true
    },
    {
        id: 'seed-akhil-birthday',
        title: 'Happy Birthday Akhil Poster',
        category: 'Boys Stories',
        prompt: 'A high-contrast, black-and-white portrait of a smiling young man with a mustache, wearing a casual t-shirt with the word "Bench." and a backward baseball cap, positioned centrally against a stark white background with intentionally blurred figures visible on the left and right edges. Above the subject, a modern typographical layout is displayed, featuring the words "HAPPY BIRTHDAY" in a bold, stylized black serif font, followed by the Malayalam text "പ്രിയപ്പെട്ട" in solid black, and the name "Akhil" written underneath in a vibrant, contrasting red cursive script, seamlessly combining monochrome photography with bold graphic design elements to create a stylish and modern birthday greeting.',
        wish: 'പ്രിയപ്പെട്ട Akhil (Dear Akhil), Wishing you a very Happy Birthday filled with love, laughter, and spectacular achievements! Have an amazing year ahead! 🎂✨❤️',
        image: './assets/akhil_birthday.jpg',
        createdAt: new Date('2026-06-01T22:41:00Z').toISOString(),
        isSeed: true
    },
    {
        id: 'seed-mauve-birthday',
        title: 'Happy Birthday Mauve Collage',
        category: 'Boys Stories',
        prompt: 'A detailed vertical poster-style digital edit, in a mauve and white color scheme, based on image_7.png. The upper half features a textured mauve fabric background with repeated, stacked, white-outline "BIRTHDAY" text pattern and floating geometric paper scraps. Centered is a large, white-bordered portrait cutout of the young man in a mauve button-up shirt and silver chain from image_7.png, smiling. To his top-right is a smaller, framed polaroid-style portrait of him smiling in a distinct location, and to his bottom-left is another framed polaroid-style portrait of him smiling, also in a different location. The lower half of the poster, separated by a torn paper edge texture, has a lighter paper background. It features "HAPPY BIRTHDAY" in small, clean text, above a massive, stylized, dark-bordered title "Name" with a wavy pattern fill. Below this, a block of smaller text is transcribed verbatim, preserving all original errors and formatting: "TOGHETHER FOREVER *** ITS A HUNDRED PERCENT LOVE MAKE TO ACT PERSON THAT THE FELL ON MY LOVES. TOGHERTGER FOREVER EVEN DEATH THE LUCKY FOR ME SO IAM SO HAPPY XCUSE ME HEY GIRLS DONT FORGET MY LOVES I CANT LOVE THIS". The entire composition is a polished digital collage. --ar 9:16',
        wish: 'TOGHETHER FOREVER *** ITS A HUNDRED PERCENT LOVE MAKE TO ACT PERSON THAT THE FELL ON MY LOVES. TOGHERTGER FOREVER EVEN DEATH THE LUCKY FOR ME SO IAM SO HAPPY XCUSE ME HEY GIRLS DONT FORGET MY LOVES I CANT LOVE THIS 💜✨',
        image: './assets/mauve_birthday.jpg',
        createdAt: new Date('2026-06-01T22:31:00Z').toISOString(),
        isSeed: true
    },
    {
        id: 'seed-terracotta-birthday',
        title: 'Happy Birthday Terracotta Poster',
        category: 'Girls Stories',
        prompt: "A vertical (9:16) poster composition featuring the same young woman, with dark hair and front-dyed strands, in two distinct poses. The top section is in full color, showing her smiling and holding sunglasses near her hair with both hands, positioned from the waist up against a terracotta brick wall and large green fan palm leaves, wearing a black blazer over a black crop top, blue jeans, and a black quilted chain purse. In the upper left corner, there is a small stylized plant logo and the white text '24 Maret 2022'. Across the center, massive white script text reads 'Happy Birthday'. The lower section of the image transitions to a monochrome (black and white) version of the woman in a second pose from the waist up, also smiling with her hand near her cheek and sunglasses near her chest, wearing the identical outfit, and with the surrounding plants rendered in a monochrome texture. Small white text blocks in the bottom left corner read: 'selamat ulang. semoga selalu tahun', 'atau selamat happy. semoga selalu birthday', 'may all your birthday wishes', 'come true except for the illegal ones!'. In the bottom right corner, smaller white text reads 'sclamat happy' accompanied by a few tiny white sparkles. The entire composition has a polished, editorial poster quality.",
        wish: 'selamat ulang. semoga selalu tahun | atau selamat happy. semoga selalu birthday | may all your birthday wishes come true except for the illegal ones! sclamat happy ✨🌸',
        image: './assets/terracotta_birthday.jpg',
        createdAt: new Date('2026-06-01T22:20:00Z').toISOString(),
        isSeed: true
    },
    {
        id: 'seed-daisy-birthday',
        title: 'Happy Birthday Daisy Poster',
        category: 'Girls Stories',
        prompt: 'A professional graphic design birthday poster. Subject: A smiling young Indian woman wearing a textured Villote short-sleeved top and a patterned shoulder strap, with one hand resting gently near her chin. Maintain strict facial consistency with the reference image; do not alter her core facial structure or identity. Background: A flat, light pastel blue backdrop scattered with simple, flat white 2D daisy flowers. Typography: Large, dark teal serif text. . The word "Birthday" written vertically, spanning down the center behind the subject. The word "Happy " written vertically on the bottom left. I Clean composite, high-quality editorial layout. --ar 9:16',
        wish: 'She: I hope all your wishes come true today, my friend. Happy Birthday! 🌸✨',
        image: './assets/daisy_birthday.jpg',
        createdAt: new Date('2026-06-01T22:15:00Z').toISOString(),
        isSeed: true
    },
    {
        id: 'seed-scrapbook-birthday',
        title: 'Happy Birthday Gurl - Scrapbook Poster',
        category: 'Girls Stories',
        prompt: 'A creative scrapbook-style birthday poster graphic design. The central subject is a young South Asian woman wearing a red sleeveless top , smiling peacefully with her eyes closed. She is isolated as a sticker cutout with a thick white outline around her. The background features a warm, dreamy collage of faded, semi-transparent images of the exact same woman in different poses. Add delicate white line-art doodles of a butterfly on the left and a ringed planet on the right. A subtle halftone grid texture overlays the background. At the bottom, on a soft white gradient fade, include the text "Happy BIRTHDAY" in a stylized serif font, and "Gurl" in a casual handwritten script font. - 9:16 ratio needed',
        wish: "Happy Birthday Gurl! You glow differently when you're being you. She's magic, that one. Be your own kind of beautiful! 💖✨",
        image: './assets/gurl_birthday.jpg',
        createdAt: new Date('2026-06-01T22:01:00Z').toISOString(),
        isSeed: true
    }
];

// ==========================================================================
// DOM Elements Registry
// ==========================================================================
const DOM = {
    // Gallery & Filter Grid
    galleryGrid: document.getElementById('gallery-grid'),
    itemsCountText: document.getElementById('items-count-text'),
    emptyState: document.getElementById('empty-state'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    categoryFilters: document.getElementById('category-filters'),
    searchInput: document.getElementById('search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    
    // Lightbox Modal
    lightboxOverlay: document.getElementById('lightbox-overlay'),
    closeLightboxBtn: document.getElementById('close-lightbox-btn'),
    lightboxImage: document.getElementById('lightbox-image'),
    lightboxDownloadBtn: document.getElementById('lightbox-download-btn'),
    lightboxBadge: document.getElementById('lightbox-badge'),
    lightboxTitle: document.getElementById('lightbox-title'),
    lightboxPromptText: document.getElementById('lightbox-prompt-text'),
    lightboxWishSection: document.getElementById('lightbox-wish-section'),
    lightboxWishText: document.getElementById('lightbox-wish-text'),
    lightboxCopyPromptFloating: document.getElementById('lightbox-copy-prompt-btn'),
    lightboxCopyWishFloating: document.getElementById('lightbox-copy-wish-btn'),
    lightboxCopyShortcutBtn: document.getElementById('lightbox-copy-shortcut-btn'),
    
    // Toasts Container
    toastContainer: document.getElementById('toast-container')
};

// ==========================================================================
// Initialization & Database Handlers
// ==========================================================================

function initApp() {
    loadDatabase();
    setupEventListeners();
    renderCategoryFilters();
    renderGallery();
}

/**
 * Loads birthday surprises from localStorage or initializes seeds
 */
function loadDatabase() {
    // Always use premium seeded contents to lock down the seed collections.
    state.surprises = [...SEED_SURPRISES];
}

function saveToLocalStorage() {
    // Read-only locked database
}

// ==========================================================================
// Clipboard Utilities
// ==========================================================================

/**
 * Modern secure copying engine with legacy fallback
 * @param {string} text To copy
 * @param {HTMLElement} btnElement Trigger button to update states
 * @param {string} successMessage Toast text
 */
function copyToClipboard(text, btnElement, successMessage = 'Prompt copied to clipboard!') {
    if (!text) return;
    
    // Copy Action
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => handleCopySuccess(btnElement, successMessage))
            .catch(err => {
                console.error('Clipboard write failed. Retrying with fallback.', err);
                fallbackCopyText(text, btnElement, successMessage);
            });
    } else {
        fallbackCopyText(text, btnElement, successMessage);
    }
}

function fallbackCopyText(text, btnElement, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Prevent scrolling
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            handleCopySuccess(btnElement, successMessage);
        } else {
            showToast('Unable to copy text. Please select and copy manually.', 'error');
        }
    } catch (err) {
        console.error('Fallback copy error', err);
        showToast('Copy failed. Standard permission block.', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Displays visual copy states (Icon change, class toggles, audio visual pulse)
 */
function handleCopySuccess(btn, messageText) {
    showToast(messageText, 'success');
    
    // Setup transition hooks on the trigger button
    btn.classList.add('copied');
    
    // Handle toggle for shortcut icons inside cards or lightboxes
    const defaultIcon = btn.querySelector('.copy-icon-default');
    const successIcon = btn.querySelector('.copy-icon-success');
    const innerItalic = btn.querySelector('i:not(.copy-icon-success)'); // fallback for simple icons
    
    if (defaultIcon && successIcon) {
        defaultIcon.style.display = 'none';
        successIcon.style.display = 'block';
    } else if (innerItalic) {
        innerItalic.className = 'fa-solid fa-check';
    }
    
    // Revert styling after 1.5 seconds
    setTimeout(() => {
        btn.classList.remove('copied');
        if (defaultIcon && successIcon) {
            defaultIcon.style.display = 'block';
            successIcon.style.display = 'none';
        } else if (innerItalic) {
            innerItalic.className = btn.classList.contains('btn-copy-wish-floating') || btn.classList.contains('btn-copy-prompt-floating')
                ? 'fa-regular fa-copy'
                : 'fa-regular fa-copy btn-icon-left';
        }
    }, 1500);
}

// ==========================================================================
// Toast Engine
// ==========================================================================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
    
    toast.innerHTML = `
        <div class="toast-message-body">
            <i class="${iconClass} toast-icon"></i>
            <span class="toast-text">${message}</span>
        </div>
        <button class="toast-close" aria-label="Close notification">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    // Setup close click
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 400);
    });
    
    // Autoclose after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 400);
        }
    }, 3000);
}

// ==========================================================================
// Rendering Engine
// ==========================================================================

/**
 * Populates styles/categories pills dynamically based on available categories
 */
function renderCategoryFilters() {
    // Get unique categories from current store
    const categories = new Set(state.surprises.map(item => item.category));
    
    // Pre-populate core filter pills
    let html = `<button class="filter-pill ${state.filters.category === 'all' ? 'active' : ''}" data-category="all" id="pill-all">All Stories</button>`;
    
    categories.forEach(cat => {
        // Exclude standard seeded names if already displayed statically
        if (cat) {
            html += `<button class="filter-pill ${state.filters.category === cat ? 'active' : ''}" data-category="${cat}">${cat}</button>`;
        }
    });
    
    DOM.categoryFilters.innerHTML = html;
    
    // Bind pill clicks
    const pills = DOM.categoryFilters.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            state.filters.category = pill.dataset.category;
            renderGallery();
        });
    });
}

/**
 * Filter matching elements and draw grid
 */
function renderGallery() {
    const query = state.filters.searchQuery.toLowerCase().trim();
    const category = state.filters.category;
    
    // Filter matching cards
    const filtered = state.surprises.filter(card => {
        const matchesCategory = category === 'all' || card.category === category;
        const matchesSearch = !query || 
            card.title.toLowerCase().includes(query) || 
            card.prompt.toLowerCase().includes(query) || 
            card.category.toLowerCase().includes(query) ||
            (card.wish && card.wish.toLowerCase().includes(query));
            
        return matchesCategory && matchesSearch;
    });
    
    // Sort surprises by date descending (Newest first), placing seed items logically
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Clear grid
    DOM.galleryGrid.innerHTML = '';
    
    // Update stats label
    DOM.itemsCountText.textContent = `Showing ${filtered.length} surprise${filtered.length === 1 ? '' : 's'}`;
    
    if (filtered.length === 0) {
        DOM.galleryGrid.style.display = 'none';
        DOM.emptyState.style.display = 'flex';
        return;
    }
    
    DOM.galleryGrid.style.display = 'grid';
    DOM.emptyState.style.display = 'none';
    
    // Inject HTML
    filtered.forEach(card => {
        const cardEl = document.createElement('article');
        cardEl.className = 'prompt-card';
        cardEl.dataset.id = card.id;
        
        cardEl.innerHTML = `
            <div class="card-media-wrapper" aria-label="Zoom in detailed view of ${card.title}">
                <img src="${card.image}" alt="${card.title}" class="card-img" loading="lazy">
                <span class="card-badge">${card.category}</span>
                <div class="card-overlay-actions">
                    <button class="overlay-zoom-btn" aria-label="Open Lightbox details">
                        <i class="fa-solid fa-expand"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${card.title}</h3>
                <div class="card-prompt-preview">${escapeHTML(card.prompt)}</div>
                <div class="card-footer">
                    <span class="card-author-info">9:16 Aspect Ratio</span>
                    <div class="card-action-btns">
                        <button class="btn-copy-shortcut" title="Copy AI Prompt" aria-label="One-click copy AI Prompt">
                            <i class="fa-regular fa-copy copy-icon-default"></i>
                            <i class="fa-solid fa-check copy-icon-success" style="display: none;"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Bind media actions (Lightbox open)
        const mediaArea = cardEl.querySelector('.card-media-wrapper');
        mediaArea.addEventListener('click', () => openLightbox(card.id));
        
        // Bind Copy Prompt Action
        const copyBtn = cardEl.querySelector('.btn-copy-shortcut');
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(card.prompt, copyBtn, 'AI prompt copied successfully!');
        });
        
        DOM.galleryGrid.appendChild(cardEl);
    });
}

// Escapes special HTML tags to prevent XSS issues on text inputs
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}



// ==========================================================================
// Lightbox Modal Controllers
// ==========================================================================

let activeLightboxCardId = null;

function openLightbox(id) {
    const card = state.surprises.find(item => item.id === id);
    if (!card) return;
    
    activeLightboxCardId = id;
    
    // Inject image
    DOM.lightboxImage.src = card.image;
    DOM.lightboxImage.alt = card.title;
    
    // Setup download tag
    DOM.lightboxDownloadBtn.href = card.image;
    DOM.lightboxDownloadBtn.download = `${card.title.toLowerCase().replace(/\s+/g, '_')}_prompt.png`;
    
    // Title & Badge
    DOM.lightboxBadge.textContent = card.category;
    DOM.lightboxTitle.textContent = card.title;
    
    // Prompt
    DOM.lightboxPromptText.textContent = card.prompt;
    
    // Birthday wish block toggling
    if (card.wish && card.wish.trim()) {
        DOM.lightboxWishText.textContent = card.wish;
        DOM.lightboxWishSection.style.display = 'flex';
    } else {
        DOM.lightboxWishSection.style.display = 'none';
    }
    

    
    // Open modal
    DOM.lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock body scroll
}

function closeLightbox() {
    DOM.lightboxOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
    activeLightboxCardId = null;
}

// ==========================================================================
// Event Listeners Setup
// ==========================================================================

function setupEventListeners() {
    
    // --- Lightbox Modal Controls ---
    DOM.closeLightboxBtn.addEventListener('click', closeLightbox);
    
    DOM.lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.lightboxOverlay) closeLightbox();
    });
    
    // Close modals on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // --- Search Logic with Input Handling ---
    let searchTimeout = null;
    DOM.searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        state.filters.searchQuery = value;
        
        // Toggle search clear button
        DOM.clearSearchBtn.style.display = value ? 'flex' : 'none';
        
        // Debounce render to maintain high 60fps scrolling
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderGallery();
        }, 150);
    });
    
    DOM.clearSearchBtn.addEventListener('click', () => {
        DOM.searchInput.value = '';
        state.filters.searchQuery = '';
        DOM.clearSearchBtn.style.display = 'none';
        renderGallery();
        DOM.searchInput.focus();
    });

    // --- Lightbox Action Controls ---
    
    // Main "Copy AI Prompt" modal button
    DOM.lightboxCopyShortcutBtn.addEventListener('click', () => {
        if (!activeLightboxCardId) return;
        const card = state.surprises.find(item => item.id === activeLightboxCardId);
        if (card) {
            copyToClipboard(card.prompt, DOM.lightboxCopyShortcutBtn, 'AI Prompt copied!');
        }
    });
    
    // Floating Prompt copy button
    DOM.lightboxCopyPromptFloating.addEventListener('click', () => {
        if (!activeLightboxCardId) return;
        const card = state.surprises.find(item => item.id === activeLightboxCardId);
        if (card) {
            copyToClipboard(card.prompt, DOM.lightboxCopyPromptFloating, 'AI Prompt copied!');
        }
    });
    
    // Floating Wish copy button
    DOM.lightboxCopyWishFloating.addEventListener('click', () => {
        if (!activeLightboxCardId) return;
        const card = state.surprises.find(item => item.id === activeLightboxCardId);
        if (card && card.wish) {
            copyToClipboard(card.wish, DOM.lightboxCopyWishFloating, 'Birthday Wish copied!');
        }
    });

    // --- Empty state reset triggers ---
    DOM.resetFiltersBtn.addEventListener('click', () => {
        // Reset state search and pill categories
        state.filters.searchQuery = '';
        state.filters.category = 'all';
        DOM.searchInput.value = '';
        DOM.clearSearchBtn.style.display = 'none';
        
        // Refresh styles
        renderCategoryFilters();
        renderGallery();
    });
}

// Run App!
document.addEventListener('DOMContentLoaded', initApp);
