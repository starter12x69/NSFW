
document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('promptInput');
    const imageCountSelect = document.getElementById('imageCount');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const loadingText = document.querySelector('.loading-text');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    const imageGrid = document.getElementById('imageGrid');
    const placeholderContent = document.querySelector('.placeholder-content');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

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

    generateBtn.addEventListener('click', async function() {
        const prompt = promptInput.value.trim();
        const imageCount = parseInt(imageCountSelect.value);
        
        if (!prompt) {
            alert('Please enter a description for your image.');
            return;
        }

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
                    count: imageCount
                })
            });

            const data = await response.json();
            
            if (data.success) {
                showImages(imageCount);
                console.log(data.message);
            } else {
                alert('Failed to generate images. Please try again.');
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
});
