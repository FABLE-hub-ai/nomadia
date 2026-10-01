const places = [
  {
    id: 1,
    name: 'Issyk-Kul',
    category: 'Lake',
    price: 180,
    rating: 4.8,
    region: 'Northern Kyrgyzstan',
    description: 'A large alpine lake surrounded by mountain villages, beach resorts, and peaceful scenic roads.',
    bestFor: ['Relaxation', 'Family trip', 'Wellness'],
    image: 'images/places/issyk-kul.jpg'
  },
  {
    id: 2,
    name: 'Song-Köl',
    category: 'Highlands',
    price: 210,
    rating: 5.0,
    region: 'Central Kyrgyzstan',
    description: 'A breathtaking highland lake where you can camp, meet nomads, and enjoy sunrise hikes.',
    bestFor: ['Adventure', 'Camping', 'Photography'],
    image: 'images/places/song-kol.jpg'
  },
  {
    id: 3,
    name: 'Ala-Archa',
    category: 'Nature',
    price: 160,
    rating: 4.7,
    region: 'Near Bishkek',
    description: 'A dramatic mountain valley with scenic trails, waterfalls, and crisp alpine air.',
    bestFor: ['Hiking', 'Day trip', 'Nature'],
    image: 'images/places/issyk-kul.jpg'
  },
  {
    id: 4,
    name: 'Karakol',
    category: 'Culture',
    price: 220,
    rating: 4.9,
    region: 'Eastern Kyrgyzstan',
    description: 'A historic town known for its markets, Soviet heritage, and access to mountain routes.',
    bestFor: ['Culture', 'Food', 'Museums'],
    image: 'images/places/song-kol.jpg'
  },
  {
    id: 5,
    name: 'Jeti-Oguz',
    category: 'Scenic',
    price: 190,
    rating: 4.8,
    region: 'Northern mountains',
    description: 'An iconic red-rock valley with epic views, horse riding, and stay-in-camp experiences.',
    bestFor: ['Road trip', 'Scenic drive', 'Horse riding'],
    image: 'images/places/issyk-kul.jpg'
  },
  {
    id: 6,
    name: 'Lake Oruk',
    category: 'Remote',
    price: 260,
    rating: 4.9,
    region: 'Southwest Kyrgyzstan',
    description: 'A remote retreat for travelers seeking peace, rugged nature, and star-filled skies.',
    bestFor: ['Remote escape', 'Wild camping', 'Off-grid'],
    image: 'images/places/song-kol.jpg'
  }
];

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const placesGrid = document.getElementById('placesGrid');
const resultsSummary = document.getElementById('resultsSummary');

function renderPlaces() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const category = categoryFilter ? categoryFilter.value : 'all';
  const maxPrice = priceFilter ? Number(priceFilter.value || 9999) : 9999;

  const filtered = places.filter((place) => {
    const matchesSearch = !query || [
      place.name,
      place.category,
      place.region,
      place.description,
      ...place.bestFor
    ].join(' ').toLowerCase().includes(query);

    const matchesCategory = category === 'all' || place.category === category;
    const matchesPrice = place.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (resultsSummary) {
    resultsSummary.textContent = `Showing ${filtered.length} place${filtered.length === 1 ? '' : 's'}`;
  }

  if (!placesGrid) return;

  if (!filtered.length) {
    placesGrid.innerHTML = `
      <div class="place-card compact" style="grid-column: 1 / -1; padding: 32px; text-align: center;">
        <h3 style="margin:0 0 8px;">No matching destinations</h3>
        <p style="margin:0; color: var(--text-secondary);">Try another keyword or reset the filters.</p>
      </div>
    `;
    return;
  }

  placesGrid.innerHTML = filtered
    .map((place) => `
      <article class="place-card compact">
        <img src="${place.image}" alt="${place.name}" />
        <div class="card-content">
          <div class="place-meta">
            <span class="tag">${place.category}</span>
            <span class="rating">★ ${place.rating}</span>
          </div>
          <h3>${place.name}</h3>
          <p>${place.region}</p>
          <p>${place.description}</p>
          <div class="place-details">
            ${place.bestFor.map((item) => `<span class="pill">${item}</span>`).join('')}
          </div>
          <div class="meta-row" style="margin-top: 18px;">
            <span class="price">From $${place.price}</span>
            <a href="place.html" class="text-link">View details</a>
          </div>
        </div>
      </article>
    `)
    .join('');
}

if (searchInput) searchInput.addEventListener('input', renderPlaces);
if (categoryFilter) categoryFilter.addEventListener('change', renderPlaces);
if (priceFilter) priceFilter.addEventListener('change', renderPlaces);

renderPlaces();
