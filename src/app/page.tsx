import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div className="hero">
        <h1>Growlog</h1>
        <p>Plan gardens, track plant growth, and manage care schedules</p>
      </div>

      <section className="section">
        <h2>Get Started</h2>
        <div className="grid">
          <div className="card">
            <h3>Plant Database</h3>
            <p>Browse vegetables, herbs, flowers, and more. Filter by light needs, water requirements, and hardiness zones.</p>
            <Link href="/database" className="btn" style={{ marginTop: '1rem' }}>
              Browse Plants
            </Link>
          </div>

          <div className="card">
            <h3>My Garden</h3>
            <p>Design garden beds and plan plant layouts. Track what's planted where.</p>
            <Link href="/garden" className="btn" style={{ marginTop: '1rem' }}>
              Design Garden
            </Link>
          </div>

          <div className="card">
            <h3>Plant Tracking</h3>
            <p>Log planting dates, germination, growth stages, and harvests. Monitor plant health over time.</p>
            <Link href="/tracking" className="btn" style={{ marginTop: '1rem' }}>
              Track Plants
            </Link>
          </div>

          <div className="card">
            <h3>Care Reminders</h3>
            <p>Get reminders for watering, fertilizing, pruning, and pest control based on plant needs.</p>
            <Link href="/tracking" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              View Schedule
            </Link>
          </div>

          <div className="card">
            <h3>Companion Planting</h3>
            <p>Learn which plants grow well together and which to avoid. Improve yields naturally.</p>
            <Link href="/guides" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              Learn More
            </Link>
          </div>

          <div className="card">
            <h3>Growing Guides</h3>
            <p>Step-by-step guides for planting, care, and harvesting. Tips for every skill level.</p>
            <Link href="/guides" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              Read Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
