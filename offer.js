document.addEventListener('DOMContentLoaded', () => {
    const offers = [
        {
            title: 'Buy One Get One Free',
            description: 'Get a free coffee with any sandwich purchase.',
            store: 'Coffee Corner'
        },
        {
            title: '50% Off All Shoes',
            description: 'Half-price sale on all shoes in the store.',
            store: 'Shoe Haven'
        },
        {
            title: 'Free Popcorn',
            description: 'Free popcorn with any movie ticket purchase.',
            store: 'Movie Max'
        }
    ];

    const offersSection = document.getElementById('offers');

    offers.forEach(offer => {
        const offerElement = document.createElement('div');
        offerElement.classList.add('offer');

        const titleElement = document.createElement('h2');
        titleElement.textContent = offer.title;
        offerElement.appendChild(titleElement);

        const storeElement = document.createElement('p');
        storeElement.textContent = `At ${offer.store}`;
        offerElement.appendChild(storeElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = offer.description;
        offerElement.appendChild(descriptionElement);

        offersSection.appendChild(offerElement);
    });
});