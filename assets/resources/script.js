document.getElementById('live-btn').addEventListener('click', () => {
    window.location.href = 'https://www.yupptv.com/channels/nepal1-tv/live';
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out!');
});

async function loadProgrammes() {
    const response = await fetch('./assets/airing/epg.json');
    const programmes = await response.json();
    const programmesList = document.getElementById('programmes-list');
    const tabsContainer = document.getElementById('tabs-container');

    const categories = ['All', ...new Set(programmes.map(p => p.category))];

    tabsContainer.innerHTML = categories.map(category => `
        <button class="tab-button" data-category="${category}">${category}</button>
    `).join('');

    tabsContainer.querySelector('.tab-button[data-category="All"]').classList.add('active');

    function renderProgrammes(category) {
        const filteredPrograms = category === 'All'
            ? programmes
            : programmes.filter(p => p.category === category);

        programmesList.innerHTML = filteredPrograms.map(p => `
            <div class="programme">
                <img src="${p.banner}" alt="${p.name}" />
                <h3>${p.name}</h3>
                <h4>${p.category}</h4>
                <p>${p.description}</p>
            </div>
        `).join('');
    }

    tabsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab-button')) {
            tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            renderProgrammes(event.target.getAttribute('data-category'));
        }
    });

    renderProgrammes('All');
}

document.addEventListener('DOMContentLoaded', loadProgrammes);

document.querySelectorAll('#about p').forEach(p => {
    p.innerHTML = p.textContent.split(' ').map(word => `<span>${word}</span>`).join(' ');
});
