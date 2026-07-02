export default function TrackingPage() {
  return (
    <>
      <div className="hero">
        <h1>Plant Tracking</h1>
        <p>Monitor growth stages, health, and care activities</p>
      </div>

      <section className="section">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Plants Being Tracked</h3>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Start tracking your plants to monitor their growth, health, and care schedule over time.
          </p>
          <button className="btn" style={{ marginTop: '1.5rem' }}>
            Add Plant to Track
          </button>
        </div>
      </section>

      <section className="section">
        <h2>What You Can Track</h2>
        <div className="grid">
          <div className="card">
            <h3>Growth Stages</h3>
            <p>Log planting, germination, transplanting, flowering, fruiting, and harvest dates. Track days to maturity.</p>
          </div>

          <div className="card">
            <h3>Care Activities</h3>
            <p>Record watering, fertilizing, pruning, weeding, pest control, and soil amendments. Build a care history.</p>
          </div>

          <div className="card">
            <h3>Health Status</h3>
            <p>Monitor plant health: healthy, stressed, pest damage, disease, or nutrient deficiency. Catch problems early.</p>
          </div>

          <div className="card">
            <h3>Yield Tracking</h3>
            <p>Record harvest amounts and quality. Compare yields year over year. Identify your most productive varieties.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Care Reminders</h2>
        <div className="grid">
          <div className="card">
            <h3>Watering Schedule</h3>
            <p>Get reminders based on plant water needs, weather conditions, and soil type. Adjust for seasonal changes.</p>
          </div>

          <div className="card">
            <h3>Fertilizing</h3>
            <p>Track fertilizer applications and get reminders for next feeding. Follow plant-specific nutrient requirements.</p>
          </div>

          <div className="card">
            <h3>Pruning</h3>
            <p>Know when to prune for optimal growth and flowering. Track pruning activities and plant response.</p>
          </div>

          <div className="card">
            <h3>Pest Monitoring</h3>
            <p>Regular inspection reminders. Log pest sightings and treatments. Track effectiveness of control methods.</p>
          </div>
        </div>
      </section>
    </>
  );
}
