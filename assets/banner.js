document.addEventListener('DOMContentLoaded', function() {
    // Banner functionality
    const banner = document.getElementById('discount-banner');
    const scrollBox = document.createElement('div');
    scrollBox.classList.add('scroll-box');
    scrollBox.innerHTML = '<p>Use code SAVE20 for 20% off!</p>';
    document.body.appendChild(scrollBox);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            banner.style.display = 'none';
            scrollBox.style.display = 'block';
        } else {
            banner.style.display = 'block';
            scrollBox.style.display = 'none';
        }
    });

    // Apply dynamic theme colors based on industry/niche
    const industry = 'health-beauty'; // Replace with actual logic to determine industry
    document.body.classList.add(industry);

    // Age Verifier functionality
    const ageVerifier = document.getElementById('age-verifier');
    const ageYes = document.getElementById('age-yes');
    const ageNo = document.getElementById('age-no');

    ageYes.addEventListener('click', function() {
        ageVerifier.style.display = 'none';
    });

    ageNo.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });

    // Back-to-Top Button functionality
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Before/After Image Slider functionality
    const sliderHandle = document.querySelector('.slider-handle');
    const beforeImage = document.querySelector('.before-image');
    const afterImage = document.querySelector('.after-image');
    const sliderContainer = document.querySelector('.before-after-slider');

    let isDragging = false;

    sliderHandle.addEventListener('mousedown', function() {
        isDragging = true;
        document.body.classList.add('no-select');
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.body.classList.remove('no-select');
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        const rect = sliderContainer.getBoundingClientRect();
        let xPos = event.clientX - rect.left;

        if (xPos < 0) xPos = 0;
        if (xPos > rect.width) xPos = rect.width;

        sliderHandle.style.left = `${xPos}px`;
        afterImage.style.clip = `rect(0, ${xPos}px, 100%, 0)`;
    });
});
