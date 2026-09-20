document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    const cardsContainer = document.getElementById('cards-container');
    const adminDashboard = document.getElementById('admin-dashboard');
    const adminLinksList = document.getElementById('admin-links-list');
    const adminLayout = document.querySelector('.admin-layout');
    const logo = document.querySelector('.logo');
    
    const addBtn = document.getElementById('add-link-btn');
    const closeAdmin = document.getElementById('close-admin');
    const closeForm = document.getElementById('close-form');
    const addForm = document.getElementById('add-link-form');
    const formTitle = document.getElementById('form-title');
    const editIdInput = document.getElementById('edit-id');
    const island = document.getElementById('dynamic-island');
    const islandText = document.getElementById('island-text');
    const islandIcon = document.getElementById('island-icon');

    let allLinks = [];
    let clickCount = 0;
    let currentIconBase64 = null;
    let currentBgBase64 = null;

    const svgIcons = {
        'globe': '<svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
        'file-text': '<svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
        'github': '<svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
        'instagram': '<svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
        'mail': '<svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
        'book-open': '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
        'shopping-bag': '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>'
    };

    function renderIcon(iconName, className = '') {
        if (!iconName) return '';
        if (svgIcons[iconName]) {
            return svgIcons[iconName];
        }
        const isUrl = iconName.startsWith('http') || 
                      iconName.startsWith('/') || 
                      iconName.startsWith('data:') || 
                      iconName.includes('.');
        if (isUrl) {
            return `<img src="${iconName}" class="custom-icon ${className}" alt="icon" onerror="this.src='https://api.iconify.design/lucide:link.svg'">`;
        }
        return `<i data-lucide="${iconName}" class="${className}"></i>`;
    }

    function showNotification(text, type = 'success', icon = 'check') {
        islandText.innerText = text;
        islandIcon.setAttribute('data-lucide', icon);
        island.className = `active expanded ${type}`;
        lucide.createIcons();
        setTimeout(() => {
            island.classList.remove('active', 'expanded');
        }, 3000);
    }

    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 3) {
            adminDashboard.classList.add('active');
            clickCount = 0;
            showNotification('Admin Mode Enabled', 'success', 'shield-check');
            renderAdminList();
        }
        setTimeout(() => clickCount = 0, 1000);
    });

    closeAdmin.addEventListener('click', () => adminDashboard.classList.remove('active'));
    closeForm.addEventListener('click', () => adminLayout.classList.remove('editing'));

    async function fetchLinks() {
        try {
            const response = await fetch('/api/links');
            const data = await response.json();
            allLinks = data;
            renderPublicView(data);
            if (adminDashboard.classList.contains('active')) renderAdminList();
        } catch (error) {
            console.error('Error fetching links:', error);
        }
    }

    function renderPublicView(data) {
        linksContainer.innerHTML = '';
        cardsContainer.innerHTML = '';

        data.forEach(item => {
            if (item.type === 'link') {
                const linkEl = document.createElement('a');
                linkEl.href = item.url;
                const isInternal = item.url.startsWith('/') || item.url.startsWith('#');
                const isPortfolio = item.url.includes('portfolio') || item.url.includes('porto');
                linkEl.className = isPortfolio ? 'link-item featured-portfolio-link' : 'link-item';
                if (!isInternal) {
                    linkEl.target = '_blank';
                    linkEl.rel = 'noopener noreferrer';
                }
                const arrowHtml = isPortfolio 
                    ? '<span class="featured-badge">EXPLORE ↗</span>'
                    : '<span class="link-arrow"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></span>';

                linkEl.innerHTML = `
                    <div class="link-icon-wrapper">
                        ${item.image_url ? renderIcon(item.image_url) : renderIcon(item.icon || 'arrow-right')}
                    </div>
                    <span class="link-title">${item.title}</span>
                    ${arrowHtml}
                `;
                linksContainer.appendChild(linkEl);
            } else if (item.type === 'card') {
                const cardEl = document.createElement('a');
                cardEl.href = item.url || '#';
                cardEl.className = 'card-item';
                if (item.url && !item.url.startsWith('/') && !item.url.startsWith('#')) {
                    cardEl.target = '_blank';
                    cardEl.rel = 'noopener noreferrer';
                }
                
                const category = item.category || 'Featured Project';
                cardEl.innerHTML = `
                    <div class="card-icon">${renderIcon(item.icon || 'layout')}</div>
                    <div class="card-info">
                        <span class="card-category">${category}</span>
                        <h3>${item.title}</h3>
                    </div>
                `;
                if (item.image_url) {
                    const bgUrl = item.image_url.startsWith('/') || item.image_url.startsWith('http') || item.image_url.startsWith('data:') 
                        ? item.image_url 
                        : `/${item.image_url}`;
                    cardEl.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url('${bgUrl}')`;
                    cardEl.classList.add('has-bg');
                }
                cardsContainer.appendChild(cardEl);
            }
        });
        lucide.createIcons();
    }

    function renderAdminList() {
        adminLinksList.innerHTML = '';
        allLinks.forEach(item => {
            const adminItem = document.createElement('div');
            adminItem.className = 'admin-item';
            adminItem.innerHTML = `
                <div class="admin-item-info">
                    <div class="admin-item-icon">
                        ${item.image_url ? renderIcon(item.image_url) : renderIcon(item.icon || 'link')}
                    </div>
                    <div class="admin-item-text">
                        <h4>${item.title}</h4>
                        <p>${item.url}</p>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="edit-btn" onclick="window.editLink('${item.id}')"><i data-lucide="edit-3"></i></button>
                    <button class="delete-btn" onclick="window.deleteLink('${item.id}')"><i data-lucide="trash-2"></i></button>
                </div>
            `;
            adminLinksList.appendChild(adminItem);
        });
        lucide.createIcons();
    }

    // Helper to convert file to Base64
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let url = document.getElementById('url').value;
        if (url && !url.startsWith('http') && !url.startsWith('mailto:')) {
            url = 'https://' + url;
        }

        const editId = editIdInput.value.trim();
        const payload = {
            title: document.getElementById('title').value,
            url: url,
            type: document.getElementById('type').value,
            icon: currentIconBase64 || document.getElementById('icon').value,
            image_base64: currentBgBase64
        };

        const endpoint = editId ? `/api/links/${editId}` : '/api/links';

        try {
            const response = await fetch(endpoint, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                adminLayout.classList.remove('editing');
                addForm.reset();
                document.getElementById('image-preview').style.display = 'none';
                showNotification(editId ? 'Link Updated' : 'Link Created', 'success', 'check-circle');
                fetchLinks();
            } else {
                const err = await response.json();
                showNotification(err.error || 'Failed to save', 'error', 'alert-circle');
            }
        } catch (error) {
            showNotification('Server Error', 'error', 'wifi-off');
        }
    });

    document.getElementById('image-file').addEventListener('change', async function(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('image-preview');
        if (file) {
            currentBgBase64 = await toBase64(file);
            preview.src = currentBgBase64;
            preview.style.display = 'block';
        }
    });

    document.getElementById('icon-file').addEventListener('change', async function(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('icon-preview');
        if (file) {
            currentIconBase64 = await toBase64(file);
            preview.src = currentIconBase64;
            preview.style.display = 'block';
            document.getElementById('icon').value = ''; // Clear text input if image is chosen
        }
    });

    // Paste Image Support
    document.addEventListener('paste', async (e) => {
        if (!adminLayout.classList.contains('editing')) return;

        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                const base64 = await toBase64(blob);
                
                // Determine where to paste: Icon or Background
                const activeId = document.activeElement.id;
                if (activeId === 'icon' || activeId === 'icon-file') {
                    currentIconBase64 = base64;
                    const preview = document.getElementById('icon-preview');
                    preview.src = base64;
                    preview.style.display = 'block';
                    document.getElementById('icon').value = ''; 
                    showNotification('Icon Pasted!', 'success', 'image');
                } else {
                    currentBgBase64 = base64;
                    const preview = document.getElementById('image-preview');
                    preview.src = base64;
                    preview.style.display = 'block';
                    showNotification('Background Image Pasted!', 'success', 'image');
                }
                break;
            }
        }
    });

    window.editLink = (id) => {
        const item = allLinks.find(l => l.id.toString() === id.toString());
        if (!item) return;

        formTitle.innerText = 'Edit Link';
        editIdInput.value = item.id;
        document.getElementById('title').value = item.title;
        document.getElementById('url').value = item.url;
        document.getElementById('type').value = item.type;
        
        const iconPreview = document.getElementById('icon-preview');
        if (item.icon && (item.icon.startsWith('data:') || item.icon.includes('.'))) {
            currentIconBase64 = item.icon;
            iconPreview.src = item.icon;
            iconPreview.style.display = 'block';
            document.getElementById('icon').value = '';
        } else {
            currentIconBase64 = null;
            iconPreview.style.display = 'none';
            document.getElementById('icon').value = item.icon || '';
        }

        const bgPreview = document.getElementById('image-preview');
        if (item.image_url) {
            currentBgBase64 = item.image_url;
            bgPreview.src = item.image_url;
            bgPreview.style.display = 'block';
        } else {
            currentBgBase64 = null;
            bgPreview.style.display = 'none';
        }
        adminLayout.classList.add('editing');
    };

    window.deleteLink = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            const response = await fetch(`/api/links/${id}`, { method: 'DELETE' });
            if (response.ok) fetchLinks();
        } catch (error) {}
    };

    addBtn.addEventListener('click', () => {
        formTitle.innerText = 'Add New Link';
        editIdInput.value = '';
        currentIconBase64 = null;
        currentBgBase64 = null;
        addForm.reset();
        document.getElementById('icon-preview').style.display = 'none';
        document.getElementById('image-preview').style.display = 'none';
        adminLayout.classList.add('editing');
    });

    fetchLinks();
});
