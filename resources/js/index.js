const rssFeeds = [
    { id: 'carouselTopic1Inner', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/technology.rss' },
    { id: 'carouselTopic2Inner', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/science.rss' },
    { id: 'carouselTopic3Inner', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/design.rss' }
];

rssFeeds.forEach(feed => {
    fetch(feed.url)
        .then(response => response.json())
        .then(data => {
            let carouselInner = document.getElementById(feed.id);
            data.items.forEach((item, index) => {
                let isActive = index === 0 ? 'active' : '';
                let carouselItem = `
                    <div class="carousel-item ${isActive}">
                        <img src="${item.enclosure.link}" class="d-block w-100" alt="${item.title}">
                        <div class="carousel-caption">
                            <h5>${item.title}</h5>
                            <p>${item.description}</p>
                            <a href="${item.link}" target="_blank" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                `;
                carouselInner.innerHTML += carouselItem;
            });
        })
        .catch(error => console.error('Error fetching RSS feed:', error));
});
