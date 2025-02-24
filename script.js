document.addEventListener("DOMContentLoaded", () => {
    const factsList = document.getElementById("facts-list");
    const searchInput = document.getElementById("search-input");
    const filterButtons = document.querySelectorAll(".filter-button");
    
    // Function to determine fact category based on keywords
    function determineCategory(fact) {
        const keywords = {
            space: ['galaxy', 'star', 'planet', 'moon', 'astronaut', 'space', 'universe'],
            nature: ['animal', 'tree', 'water', 'earth', 'cloud', 'fish', 'plant'],
            science: ['energy', 'gravity', 'atom', 'DNA', 'cell', 'physics'],
            human: ['body', 'brain', 'bone', 'blood', 'heart', 'human']
        };

        const lowercaseFact = fact.toLowerCase();
        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => lowercaseFact.includes(word))) {
                return category;
            }
        }
        return 'science'; // Default category
    }

    // Create and display fact cards
    facts.forEach((fact, index) => {
        const category = determineCategory(fact);
        const factCard = document.createElement("div");
        factCard.classList.add("fact-card");
        factCard.dataset.category = category;
        
        factCard.innerHTML = `
            <div class="fact-content">
                <span class="fact-category">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <p class="fact-text">${fact}</p>
            </div>
            <div class="fact-actions">
                <button class="action-button" onclick="handleBookmark(this)">
                    <i class="far fa-bookmark"></i>
                    Save
                </button>
                <button class="action-button" onclick="handleShare(this)">
                    <i class="far fa-share-square"></i>
                    Share
                </button>
            </div>
        `;
        
        factsList.appendChild(factCard);

        gsap.from(factCard, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: index * 0.1
        });
    });

    // Search functionality
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const factCards = document.querySelectorAll(".fact-card");
        
        factCards.forEach(card => {
            const text = card.querySelector(".fact-text").textContent.toLowerCase();
            const matches = text.includes(searchTerm);
            
            if (matches) {
                card.style.display = "flex";
                gsap.to(card, { opacity: 1, duration: 0.3 });
            } else {
                gsap.to(card, { 
                    opacity: 0, 
                    duration: 0.3,
                    onComplete: () => card.style.display = "none"
                });
            }
        });
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.category;
            const factCards = document.querySelectorAll(".fact-card");
            
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            factCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const shouldShow = selectedCategory === 'all' || cardCategory === selectedCategory;
                
                if (shouldShow) {
                    card.style.display = "flex";
                    gsap.to(card, { opacity: 1, duration: 0.3 });
                } else {
                    gsap.to(card, { 
                        opacity: 0, 
                        duration: 0.3,
                        onComplete: () => card.style.display = "none"
                    });
                }
            });
        });
    });
});

// Bookmark functionality
function handleBookmark(button) {
    const icon = button.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    
    gsap.from(icon, {
        scale: 1.5,
        duration: 0.3,
        ease: "back.out"
    });
}

// Share functionality
function handleShare(button) {
    const factText = button.closest('.fact-card').querySelector('.fact-text').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: 'Interesting Fact',
            text: factText,
            url: window.location.href
        });
    } else {
        // Fallback copy to clipboard
        navigator.clipboard.writeText(factText).then(() => {
            const icon = button.querySelector('i');
            icon.className = 'fas fa-check';
            setTimeout(() => {
                icon.className = 'far fa-share-square';
            }, 2000);
        });
    }
}