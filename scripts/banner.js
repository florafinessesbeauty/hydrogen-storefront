document.addEventListener('DOMContentLoaded', function() {
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
});
