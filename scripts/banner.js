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
});
