export default function GuidesPage() {
  const guides = [
    {
      title: 'Starting Your First Vegetable Garden',
      description: 'Complete beginner guide covering site selection, soil preparation, plant selection, and basic care.',
      difficulty: 'Beginner',
      readTime: '15 min',
    },
    {
      title: 'Understanding Hardiness Zones',
      description: 'Learn how to use USDA hardiness zones to select plants that will thrive in your climate.',
      difficulty: 'Beginner',
      readTime: '8 min',
    },
    {
      title: 'Companion Planting Guide',
      description: 'Which plants grow well together and which to avoid. Natural pest control and improved yields.',
      difficulty: 'Intermediate',
      readTime: '12 min',
    },
    {
      title: 'Soil Testing and Amendment',
      description: 'How to test your soil pH and nutrients. Amend soil for optimal plant growth.',
      difficulty: 'Intermediate',
      readTime: '10 min',
    },
    {
      title: 'Watering Techniques',
      description: 'Deep watering vs. frequent shallow watering. Drip irrigation, soaker hoses, and hand watering.',
      difficulty: 'Beginner',
      readTime: '8 min',
    },
    {
      title: 'Organic Pest Control',
      description: 'Identify common garden pests and use natural methods to control them without harmful chemicals.',
      difficulty: 'Intermediate',
      readTime: '15 min',
    },
    {
      title: 'Seed Starting Indoors',
      description: 'Start seeds indoors 6-8 weeks before last frost. Save money and get a head start on the season.',
      difficulty: 'Intermediate',
      readTime: '12 min',
    },
    {
      title: 'Composting Basics',
      description: 'Turn kitchen scraps and yard waste into rich soil amendment. Balance greens and browns.',
      difficulty: 'Beginner',
      readTime: '10 min',
    },
  ];

  return (
    <>
      <div className="hero">
        <h1>Growing Guides</h1>
        <p>Step-by-step guides for every skill level</p>
      </div>

      <section className="section">
        <div className="grid">
          {guides.map((guide, index) => (
            <div key={index} className="card">
              <h3>{guide.title}</h3>
              <p style={{ marginTop: '0.5rem' }}>{guide.description}</p>
              
              <div style={{ marginTop: '1rem' }}>
                <span className={`badge badge-${guide.difficulty.toLowerCase()}`}>
                  {guide.difficulty}
                </span>
                <span className="badge" style={{ background: '#f0f0f0', color: '#666' }}>
                  {guide.readTime} read
                </span>
              </div>

              <button className="btn" style={{ marginTop: '1rem', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                Read Guide
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
