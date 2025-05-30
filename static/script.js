
document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('promptInput');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const loadingText = document.querySelector('.loading-text');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    const generatedImage = document.getElementById('generatedImage');
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

    generateBtn.addEventListener('click', async function() {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            alert('Please enter a description for your image.');
            return;
        }

        // Show loading state
        generateBtn.disabled = true;
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'block';
        loadingText.style.display = 'block';
        
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt })
            });

            const data = await response.json();
            
            if (data.success) {
                // Hide placeholder content
                placeholderContent.style.display = 'none';
                
                // Show generated image (placeholder for now)
                generatedImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSIjMWExYTFhIi8+Cjx0ZXh0IHg9IjI1NiIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZjE0OTMiIGZvbnQtd2VpZ2h0PSI2MDAiPkdlbmVyYXRlZCBJbWFnZTwvdGV4dD4KPHRZCSD0IjI1NiIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiPlByb21wdDogJHtwcm9tcHQuc3Vic3RyaW5nKDAsIDMwKX0uLi48L3RleHQ+CjxyZWN0IHg9IjEwNiIgeT0iMzAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjgwIiByeD0iMTAiIGZpbGw9IiMyYTJhMmEiLz4KPHRZCSD0IjI1NiIgeT0iMzMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNjY2NjY2MiPlByZXZpZXcgLSBSZWFsIGltYWdlIHdvdWxkPC90ZXh0Pgo8dGVYdCB4PSIyNTYiIHk9IjM1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjEyIiBmaWxsPSIjY2NjY2NjIj5hcHBlYXIgaGVyZSB3aXRoIEFJPC90ZXh0Pgo8dGVYdCB4PSIyNTYiIHk9IjM3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjEyIiBmaWxsPSIjY2NjY2NjIj5pbWFnZSBnZW5lcmF0aW9uPC90ZXh0Pgo8L3N2Zz4=';
                generatedImage.style.display = 'block';
                
                console.log(data.message);
            } else {
                alert('Failed to generate image. Please try again.');
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
