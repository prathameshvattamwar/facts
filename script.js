// Load saved bookmarks from localStorage
function loadSavedBookmarks() {
    const savedBookmarks = localStorage.getItem('knowledgeHubBookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
}

// Save bookmarks to localStorage
function saveBookmarks(bookmarks) {
    localStorage.setItem('knowledgeHubBookmarks', JSON.stringify(bookmarks));
}

// Bookmark functionality
function handleBookmark(button) {
    const factCard = button.closest('.fact-card');
    const factText = factCard.querySelector('.fact-text').textContent;
    const factCategory = factCard.dataset.category;
    const icon = button.querySelector('i');
    const textSpan = button.querySelector('span');
    
    // Get current bookmarks
    const bookmarks = loadSavedBookmarks();
    
    // Check if this fact is already bookmarked
    const isBookmarked = bookmarks.some(bookmark => bookmark.text === factText);
    
    if (isBookmarked) {
        // Remove from bookmarks
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.text !== factText);
        saveBookmarks(updatedBookmarks);
        
        // Update UI
        icon.classList.remove('fas');
        icon.classList.add('far');
        textSpan.textContent = 'Save';
        
        // Animate the icon
        gsap.from(icon, {
            scale: 0.5,
            duration: 0.3,
            ease: "back.out"
        });
    } else {
        // Add to bookmarks
        bookmarks.push({
            text: factText,
            category: factCategory,
            date: new Date().toISOString()
        });
        saveBookmarks(bookmarks);
        
        // Update UI
        icon.classList.remove('far');
        icon.classList.add('fas');
        textSpan.textContent = 'Saved';
        
        // Animate the icon
        gsap.from(icon, {
            scale: 1.5,
            duration: 0.3,
            ease: "back.out"
        });
    }
    
    // If bookmarks filter is currently active, refresh the view
    const bookmarksButton = document.querySelector('.bookmarks-button');
    if (bookmarksButton.classList.contains('active')) {
        showBookmarkedFacts();
    }
}

// Function to initialize bookmarks when page loads
function initializeBookmarks() {
    const bookmarks = loadSavedBookmarks();
    const factCards = document.querySelectorAll('.fact-card');
    
    factCards.forEach(card => {
        const factText = card.querySelector('.fact-text').textContent;
        const bookmarkButton = card.querySelector('.action-button');
        const icon = bookmarkButton.querySelector('i');
        
        // Check if this fact is bookmarked
        const isBookmarked = bookmarks.some(bookmark => bookmark.text === factText);
        
        if (isBookmarked) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            
            // Add a span for the text if it doesn't exist
            if (!bookmarkButton.querySelector('span')) {
                const textSpan = document.createElement('span');
                textSpan.textContent = 'Saved';
                bookmarkButton.appendChild(textSpan);
            } else {
                bookmarkButton.querySelector('span').textContent = 'Saved';
            }
        } else {
            // Add a span for the text if it doesn't exist
            if (!bookmarkButton.querySelector('span')) {
                const textSpan = document.createElement('span');
                textSpan.textContent = 'Save';
                bookmarkButton.appendChild(textSpan);
            } else {
                bookmarkButton.querySelector('span').textContent = 'Save';
            }
        }
    });
}

// Show only bookmarked facts
function showBookmarkedFacts() {
    const bookmarks = loadSavedBookmarks();
    const factCards = document.querySelectorAll('.fact-card');
    
    // Update filter buttons UI
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.bookmarks-button').classList.add('active');
    
    // Show/hide cards based on bookmark status
    factCards.forEach(card => {
        const factText = card.querySelector('.fact-text').textContent;
        const isBookmarked = bookmarks.some(bookmark => bookmark.text === factText);
        
        if (isBookmarked) {
            card.style.display = 'flex';
            gsap.to(card, { opacity: 1, duration: 0.3 });
        } else {
            gsap.to(card, { 
                opacity: 0, 
                duration: 0.3,
                onComplete: () => card.style.display = 'none'
            });
        }
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

document.addEventListener("DOMContentLoaded", () => {
    const factsList = document.getElementById("facts-list");
    const searchInput = document.getElementById("search-input");
    const filterButtons = document.querySelectorAll(".filter-button");
    
    // Make sure facts array exists and is loaded
    if (typeof facts === 'undefined' || !Array.isArray(facts) || facts.length === 0) {
        console.error('Facts array is not properly loaded!');
        factsList.innerHTML = '<p class="error">Unable to load facts. Please check your data file.</p>';
        return;
    }
    
    console.log(`Loading ${facts.length} facts...`);
    
    // Function to determine fact category based on keywords
    function determineCategory(fact) {
        const keywords = {
            space: ['galaxy', 'star', 'planet', 'moon', 'astronaut', 'space', 'universe', 'sun', 'mars', 'venus', 'pluto', 'light-year', 'jupiter', 'saturn', 'betelgeuse'],
            nature: ['animal', 'tree', 'water', 'earth', 'cloud', 'fish', 'plant', 'whale', 'octopus', 'banana', 'shark', 'bee', 'ant', 'cat', 'dog', 'pig', 'turtle', 'butterfly', 'cockroach', 'flea', 'bunny', 'strawberry'],
            science: ['energy', 'gravity', 'atom', 'DNA', 'cell', 'physics', 'temperature', 'freezes', 'lightning', 'neutron', 'heat', 'carbon', 'uranium', 'weight', 'gold', 'frozen', 'mph', 'speed', 'freezes'],
            human: ['body', 'brain', 'bone', 'blood', 'heart', 'human', 'mouth', 'skin', 'eye', 'sneeze', 'memory', 'stomach', 'spine', 'cells', 'nose', 'swallow', 'teeth']
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
        factCard.style.display = "flex"; // Ensure all cards are initially visible
        
        factCard.innerHTML = `
            <div class="fact-content">
                <span class="fact-category">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <p class="fact-text">${fact}</p>
            </div>
            <div class="fact-actions">
                <button class="action-button bookmark-button" onclick="handleBookmark(this)">
                    <i class="far fa-bookmark"></i>
                    <span>Save</span>
                </button>
                <button class="action-button share-button" onclick="handleShare(this)">
                    <i class="far fa-share-square"></i>
                    <span>Share</span>
                </button>
            </div>
        `;
        
        factsList.appendChild(factCard);

        // Add a small delay between animations to prevent performance issues
        const delay = Math.min(index * 0.03, 1.5); // Cap the delay at 1.5 seconds
        
        gsap.from(factCard, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            delay: delay,
            ease: "power1.out"
        });
    });

    // Initialize bookmark status for each card
    initializeBookmarks();

    // Search functionality
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const factCards = document.querySelectorAll(".fact-card");
        
        // Reset filter buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        document.querySelector('[data-category="all"]').classList.add("active");
        
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
        if (!button.classList.contains('bookmarks-button')) { // Skip the bookmarks button, it has its own handler
            button.addEventListener("click", () => {
                const selectedCategory = button.dataset.category;
                const factCards = document.querySelectorAll(".fact-card");
                
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                // Check if "All" is selected
                if (selectedCategory === 'all') {
                    // Show all cards
                    factCards.forEach(card => {
                        card.style.display = "flex";
                        gsap.to(card, { opacity: 1, duration: 0.3 });
                    });
                } else {
                    // Filter cards by category
                    factCards.forEach(card => {
                        const cardCategory = card.dataset.category;
                        if (cardCategory === selectedCategory) {
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
                }
            });
        }
    });
    
    // Clear search when clicking on a filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchInput.value = '';
        });
    });
});

function showAlert() {
    // Only show the alert once the facts are loaded
    setTimeout(() => {
        const factCards = document.querySelectorAll(".fact-card");
        if (factCards.length > 0) {
            console.log(`Successfully loaded ${factCards.length} fact cards.`);
        } else {
            console.error("Facts not loaded properly!");
            alert("There was an issue loading facts. Please check the console for details.");
        }
    }, 500);
}