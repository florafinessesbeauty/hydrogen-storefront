document.addEventListener("DOMContentLoaded", function() {
    let infiniteScrollEnabled = true;
    let nextPageUrl = document.querySelector('link[rel="next"]').href;

    window.addEventListener("scroll", function() {
        if (infiniteScrollEnabled && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 500) {
            infiniteScrollEnabled = false;

            fetch(nextPageUrl)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newProducts = doc.querySelector(".collection-products");
                    document.querySelector(".collection-products").appendChild(newProducts);

                    const newNextPageUrl = doc.querySelector('link[rel="next"]');
                    if (newNextPageUrl) {
                        nextPageUrl = newNextPageUrl.href;
                        infiniteScrollEnabled = true;
                    }
                });
        }
    });
});
