// Live button redirection
document.getElementById('live-btn').addEventListener('click', function() {
    window.location.href = 'https://www.yupptv.com/channels/nepal1-tv/live';
});

// Contact form submission (basic functionality)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out!');
});



// Function to fetch and display programmes
async function loadProgrammes() {
    try {
        const response = await fetch('./assets/airing/epg.json'); // Replace with the correct path
        const programmes = await response.json();
        const programmesList = document.getElementById('programmes-list');
        const tabsContainer = document.getElementById('tabs-container');

        // Get unique categories
        const categories = Array.from(new Set(programmes.map(programme => programme.category)));
        categories.unshift('All'); // Add 'All' category to the beginning

        // Function to render tabs
        function renderTabs() {
            tabsContainer.innerHTML = ''; // Clear previous tabs
            
            categories.forEach(category => {
                const tabButton = document.createElement('button');
                tabButton.className = 'tab-button';
                tabButton.setAttribute('data-category', category);
                tabButton.textContent = category;
                tabsContainer.appendChild(tabButton);
            });

            // Set default active tab
            tabsContainer.querySelector('.tab-button[data-category="All"]').classList.add('active');
        }

        // Function to render programmes
        function renderProgrammes(category) {
            programmesList.innerHTML = ''; // Clear previous content

            const filteredPrograms = category === 'All'
                ? programmes
                : programmes.filter(programme => programme.category === category);

            filteredPrograms.forEach(programme => {
                const programmeElement = document.createElement('div');
                programmeElement.className = 'programme';

                programmeElement.innerHTML = `
                    <img src="${programme.banner}" alt="${programme.name}" />
                    <h3>${programme.name}</h3>
                    <h4> ${programme.category}</h4>
                    <p>${programme.description}</p>
                `;

                programmesList.appendChild(programmeElement);
            });
        }

        // Handle tab click events
        function setupTabEvents() {
            tabsContainer.addEventListener('click', (event) => {
                if (event.target.classList.contains('tab-button')) {
                    tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active')); // Remove active class from all tabs
                    event.target.classList.add('active'); // Add active class to the clicked tab

                    const category = event.target.getAttribute('data-category');
                    renderProgrammes(category); // Render programmes based on selected category
                }
            });
        }

        // Initialize tabs and programmes
        renderTabs();
        setupTabEvents();
        renderProgrammes('All'); // Show all programmes by default
    } catch (error) {
        console.error('Error loading programmes:', error);
    }
}

// Load programmes on page load
document.addEventListener('DOMContentLoaded', loadProgrammes);

document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('#about p');
    
    paragraphs.forEach(p => {
        const words = p.textContent.split(' ').map(word => `<span>${word}</span>`).join(' ');
        p.innerHTML = words;
    });
});
