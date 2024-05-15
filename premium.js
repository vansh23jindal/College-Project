document.addEventListener('DOMContentLoaded', () => {
    const premiumButton = document.getElementById('premium-button');
    const gateway = document.getElementById('gateway');
    const features = document.getElementById('features');
    const packageButtons = document.querySelectorAll('#gateway button');
    const silverFeatures = document.getElementById('silver-features');
   
    const buyButton = document.createElement('button');

    premiumButton.addEventListener('click', () => {
        gateway.style.display = 'block';
    });

    packageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageName = button.textContent;
            const packagePrice = button.getAttribute('data-price');
            alert(`You have selected the ${packageName} package for ${packagePrice}rs.`);
            gateway.style.display = 'none';
            features.style.display = 'block';

            if (packageName === 'Silver Package') {
                silverFeatures.style.display = 'block';
                goldFeatures.style.display = 'none';
                diamondFeatures.style.display = 'none';
            } else if (packageName === 'Gold Package') {
                silverFeatures.style.display = 'none';
                goldFeatures.style.display = 'block';
                diamondFeatures.style.display = 'none';
            } else if (packageName === 'Diamond Package') {
                silverFeatures.style.display = 'none';
                goldFeatures.style.display = 'none';
                diamondFeatures.style.display = 'block';
            }

            // Create and add the "Buy Now" button
            buyButton.textContent = 'Buy Now';
            buyButton.addEventListener('click', () => {
                openCheckoutPage();
            });
            features.appendChild(buyButton);
        });
    });

    function openCheckoutPage() {
        // Open the checkout page in a new tab or window
        window.open('checkout.html', '_blank');
    }
});