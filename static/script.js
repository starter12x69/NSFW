
// Lightbox functionality
function openLightbox(imageSrc, imageAlt) {
    const modal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    lightboxCaption.textContent = imageAlt;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Buy Credits Modal Elements
    const buyCreditsBtn = document.getElementById('buyCreditsBtn');
    const subtleCTABtn = document.getElementById('subtleCTABtn');
    const buyCreditsModal = document.getElementById('buyCreditsModal');
    const closeModal = document.querySelector('.close');
    const creditsForm = document.getElementById('creditsForm');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');

    // Buy Credits Modal Functionality
    buyCreditsBtn.addEventListener('click', function() {
        buyCreditsModal.style.display = 'flex';
        emailInput.focus();
    });

    // Subtle CTA Button - same functionality as main CTA
    subtleCTABtn.addEventListener('click', function() {
        buyCreditsModal.style.display = 'flex';
        emailInput.focus();
    });

    closeModal.addEventListener('click', function() {
        buyCreditsModal.style.display = 'none';
        resetModal();
    });

    window.addEventListener('click', function(event) {
        if (event.target === buyCreditsModal) {
            buyCreditsModal.style.display = 'none';
            resetModal();
        }
    });

    function resetModal() {
        creditsForm.style.display = 'block';
        successMessage.style.display = 'none';
        emailInput.value = '';
    }

    creditsForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Disable form during submission
        const submitBtn = creditsForm.querySelector('.notify-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            const response = await fetch('/early-access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();
            
            if (data.success) {
                // Update success message with server response
                const successText = successMessage.querySelector('p');
                successText.textContent = `✅ ${data.message}`;
                
                // Show success message
                creditsForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Auto-close modal after 3 seconds
                setTimeout(() => {
                    buyCreditsModal.style.display = 'none';
                    resetModal();
                }, 3000);
            } else {
                alert(data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            // Re-enable form
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Allow Enter key to submit credits form
    emailInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            creditsForm.dispatchEvent(new Event('submit'));
        }
    });

    // Read More Toggle Functionality
    const readMoreBtn = document.getElementById('readMoreBtn');
    const seoContent = document.getElementById('seoContent');
    const seoCtaBtn = document.getElementById('seoCtaBtn');

    if (readMoreBtn && seoContent) {
        readMoreBtn.addEventListener('click', function() {
            const isExpanded = seoContent.style.display !== 'none';
            
            if (isExpanded) {
                // Collapse
                seoContent.style.display = 'none';
                readMoreBtn.classList.remove('expanded');
                readMoreBtn.querySelector('span').textContent = 'Read More';
            } else {
                // Expand
                seoContent.style.display = 'block';
                readMoreBtn.classList.add('expanded');
                readMoreBtn.querySelector('span').textContent = 'Read Less';
            }
        });
    }

    // SEO CTA Button - same functionality as main buy credits button
    if (seoCtaBtn) {
        seoCtaBtn.addEventListener('click', function() {
            buyCreditsModal.style.display = 'flex';
            emailInput.focus();
        });
    }

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });

    /* COMMENTED OUT: Original generation functionality - preserved for future re-enablement
    
    const promptInput = document.getElementById('promptInput');
    const styleSelect = document.getElementById('styleSelect');
    const imageCountSelect = document.getElementById('imageCount');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const loadingText = document.querySelector('.loading-text');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    const imageGrid = document.getElementById('imageGrid');
    const placeholderContent = document.querySelector('.placeholder-content');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    const tagCheckboxes = document.querySelectorAll('input[name="tags"]');

    // Handle suggestion tag clicks
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const prompt = this.getAttribute('data-prompt');
            promptInput.value = prompt;
            promptInput.focus();
            
            // Add a little animation feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Get selected tags
    function getSelectedTags() {
        const selectedTags = [];
        tagCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedTags.push(checkbox.value);
            }
        });
        return selectedTags;
    }

    // Validate form inputs
    function validateForm() {
        const prompt = promptInput.value.trim();
        const style = styleSelect.value;
        const count = parseInt(imageCountSelect.value);

        if (!prompt) {
            alert('Please enter a description for your image.');
            return false;
        }

        if (!style) {
            alert('Please select a style.');
            return false;
        }

        if (!count || count < 1 || count > 5) {
            alert('Please select a valid image count (1-5).');
            return false;
        }

        return true;
    }

    function createImagePlaceholder(imageNumber) {
        return `data:image/svg+xml;base64,${btoa(`
            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="512" height="512" fill="#1a1a1a"/>
                <text x="256" y="240" text-anchor="middle" font-family="Inter" font-size="18" fill="#ff1493" font-weight="600">Generated Image ${imageNumber}</text>
                <text x="256" y="270" text-anchor="middle" font-family="Inter" font-size="14" fill="#999999">Preview - Real image would</text>
                <rect x="106" y="300" width="300" height="80" rx="10" fill="#2a2a2a"/>
                <text x="256" y="330" text-anchor="middle" font-family="Inter" font-size="12" fill="#cccccc">appear here with AI</text>
                <text x="256" y="350" text-anchor="middle" font-family="Inter" font-size="12" fill="#cccccc">image generation</text>
            </svg>
        `)}`;
    }

    function showImages(imageCount) {
        // Hide placeholder
        imagePlaceholder.style.display = 'none';
        
        // Clear and show grid
        imageGrid.innerHTML = '';
        imageGrid.style.display = 'grid';
        
        // Create image containers
        for (let i = 1; i <= imageCount; i++) {
            const container = document.createElement('div');
            container.className = 'grid-image-container';
            
            const img = document.createElement('img');
            img.className = 'grid-image';
            img.alt = `Generated image ${i}`;
            img.src = createImagePlaceholder(i);
            
            container.appendChild(img);
            imageGrid.appendChild(container);
        }
    }

    function showRealImages(images) {
        // Hide placeholder
        imagePlaceholder.style.display = 'none';
        
        // Clear and show grid
        imageGrid.innerHTML = '';
        imageGrid.style.display = 'grid';
        
        // Create image containers with real images
        images.forEach((imageSrc, index) => {
            const container = document.createElement('div');
            container.className = 'grid-image-container';
            
            const img = document.createElement('img');
            img.className = 'grid-image';
            img.alt = `Generated image ${index + 1}`;
            img.src = imageSrc;
            img.style.opacity = '0';
            
            // Fade in animation
            img.onload = function() {
                this.style.transition = 'opacity 0.5s ease-out';
                this.style.opacity = '1';
            };
            
            // Add click to view full size
            container.addEventListener('click', function() {
                window.open(imageSrc, '_blank');
            });
            
            container.appendChild(img);
            imageGrid.appendChild(container);
        });
    }

    generateBtn.addEventListener('click', async function() {
        // Validate form before proceeding
        if (!validateForm()) {
            return;
        }

        const prompt = promptInput.value.trim();
        const style = styleSelect.value;
        const tags = getSelectedTags();
        const imageCount = parseInt(imageCountSelect.value);
        
        console.log('Form data:', { prompt, style, tags, count: imageCount });

        // Show loading state
        generateBtn.disabled = true;
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'block';
        loadingText.style.display = 'block';
        
        // Update loading text based on image count
        const loadingTextElement = document.querySelector('.loading-text');
        loadingTextElement.textContent = imageCount === 1 ? 'Generating image...' : `Generating ${imageCount} images...`;
        
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    prompt: prompt,
                    style: style,
                    tags: tags,
                    count: imageCount
                })
            });

            const data = await response.json();
            
            if (data.success && data.images) {
                showRealImages(data.images);
                console.log(data.message);
            } else {
                alert(data.error || 'Failed to generate images. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            // Reset button state
            generateBtn.disabled = false;
            btnText.style.display = 'block';
            loadingSpinner.style.display = 'none';
            loadingText.style.display = 'none';
        }
    });

    // Allow Enter key to trigger generation
    promptInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            generateBtn.click();
        }
    });

    // Auto-resize textarea
    promptInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.max(120, this.scrollHeight) + 'px';
    });

    // Add visual feedback for tag selection
    tagCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.tag-checkbox');
            if (this.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    });
    
    */
});
