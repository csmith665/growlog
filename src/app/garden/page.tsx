export default function GardenPage() {
  return (
    <>
      <div className="hero">
        <h1>My Garden</h1>
        <p>Design garden beds and plan plant layouts</p>
      </div>

      <section className="section">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Garden Beds Yet</h3>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Create your first garden bed to start planning your plant layout.
            Track what's planted where and manage care schedules.
          </p>
          <button className="btn" style={{ marginTop: '1.5rem' }}>
            Create Garden Bed
          </button>
        </div>
      </section>

      <section className="section">
        <h2>Garden Bed Types</h2>
        <div className="grid">
          <div className="card">
            <h3>Raised Beds</h3>
            <p>Controlled soil conditions, better drainage, and easier access. Ideal for vegetables and herbs.</p>
          </div>

          <div className="card">
            <h3>In-Ground</h3>
            <p>Traditional garden beds. Requires soil amendment and preparation. Best for large plantings.</p>
          </div>

          <div className="card">
            <h3>Containers</h3>
            <p>Perfect for small spaces, patios, and controlling invasive plants like mint. Requires more frequent watering.</p>
          </div>

          <div className="card">
            <h3>Vertical Gardens</h3>
            <p>Maximize space with wall-mounted or trellis systems. Great for herbs, strawberries, and climbing plants.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Planning Tips</h2>
        <div className="grid">
          <div className="card">
            <h3>Companion Planting</h3>
            <p>Plant compatible species together to improve growth, repel pests, and enhance flavor. Avoid planting incompatible species near each other.</p>
          </div>

          <div className="card">
            <h3>Succession Planting</h3>
            <p>Stagger planting dates for continuous harvest. Plant fast-growing crops every 2-3 weeks throughout the season.</p>
          </div>

          <div className="card">
            <h3>Crop Rotation</h3>
            <p>Rotate plant families each year to prevent soil depletion and reduce pest/disease buildup. Follow heavy feeders with light feeders.</p>
          </div>

          <div className="card">
            <h3>Sun Mapping</h3>
            <p>Track sun exposure throughout the day. Place sun-loving plants in full sun areas (6+ hours) and shade-tolerant plants in partial shade.</p>
          </div>
        </div>
      </section>
    </>
  );
}
