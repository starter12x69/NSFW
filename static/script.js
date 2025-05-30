
document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('promptInput');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    const generatedImage = document.getElementById('generatedImage');
    const placeholderContent = document.querySelector('.placeholder-content');

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
                generatedImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjI1NiIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjY2NjYiPkdlbmVyYXRlZCBJbWFnZTwvdGV4dD4KPHRZCST0iMjU2IiB5PSIyNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSI+UHJvbXB0OiAke3Byb21wdC5zdWJzdHJpbmcoMCwgMzApfS4uLjwvdGV4dD4KPC9zdmc+';
                generatedImage.style.display = 'block';
                imagePlaceholder.style.border = 'none';
                imagePlaceholder.style.background = 'transparent';
                
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
        }
    });

    // Allow Enter key to trigger generation
    promptInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            generateBtn.click();
        }
    });
});
