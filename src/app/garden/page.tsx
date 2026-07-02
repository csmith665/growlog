'use client';

import { useState } from 'react';
import { createGardenBed, GardenResult } from './actions';

export default function GardenPage() {
  const [result, setResult] = useState<GardenResult | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const res = await createGardenBed(formData);
    setResult(res);
    setPending(false);
  }

  return (
    <>
      <div className="hero">
        <h1>My Garden</h1>
        <p>Design garden beds and get plant recommendations</p>
      </div>

      <section className="section">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          <h3>Create a Garden Bed</h3>
          <p style={{ marginTop: '0.5rem', color: '#666' }}>
            Tell us about your space and we'll suggest plants that should thrive there.
          </p>

          <form action={handleSubmit}>
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Bed Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="e.g., Backyard Vegetable Bed"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Bed Type
              </label>
              <select
                name="type"
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
              >
                <option value="RAISED_BED">Raised Bed</option>
                <option value="IN_GROUND">In-Ground</option>
                <option value="CONTAINER">Container</option>
                <option value="VERTICAL">Vertical Garden</option>
                <option value="GREENHOUSE">Greenhouse</option>
              </select>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Dimensions
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <input name="width" type="number" required min="1" placeholder="Width (ft)" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }} />
                <input name="length" type="number" required min="1" placeholder="Length (ft)" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }} />
              </div>
              <input name="depth" type="number" step="0.1" min="0.5" placeholder="Depth (ft) - optional" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }} />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Sun Exposure
              </label>
              <select
                name="sunExposure"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
              >
                <option value="">Select sun exposure</option>
                <option value="FULL_SUN">Full Sun (6+ hours)</option>
                <option value="PARTIAL_SUN">Partial Sun (4-6 hours)</option>
                <option value="PARTIAL_SHADE">Partial Shade (2-4 hours)</option>
                <option value="FULL_SHADE">Full Shade (&lt;2 hours)</option>
              </select>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Soil Type
              </label>
              <select
                name="soilType"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
              >
                <option value="">Select soil type</option>
                <option value="LOAMY">Loamy</option>
                <option value="SANDY">Sandy</option>
                <option value="CLAY">Clay</option>
                <option value="PEATY">Peaty</option>
                <option value="CHALKY">Chalky</option>
                <option value="SILTY">Silty</option>
              </select>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                USDA Hardiness Zone
              </label>
              <input
                name="hardinessZone"
                type="number"
                min="1"
                max="13"
                placeholder="e.g., 7"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>

            <button type="submit" disabled={pending} className="btn" style={{ marginTop: '1.5rem', width: '100%' }}>
              {pending ? 'Planning...' : 'Get Recommendations'}
            </button>
          </form>
        </div>

        {result && (
          <>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3>{result.bed.name}</h3>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>
                {result.bed.width}' × {result.bed.length}' {result.bed.type.replace('_', ' ')}
                {result.bed.sunExposure && ` • ${result.bed.sunExposure.replace('_', ' ')}`}
                {result.bed.hardinessZone && ` • Zone ${result.bed.hardinessZone}`}
              </p>

              <h4 style={{ color: '#5a7c3a', margin: '1.5rem 0 0.75rem' }}>Growing Tips</h4>
              <ul style={{ paddingLeft: '1.5rem', color: '#666' }}>
                {result.tips.map((tip, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{tip}</li>
                ))}
              </ul>
            </div>

            <h3 style={{ color: '#5a7c3a', marginBottom: '1rem' }}>Recommended Plants</h3>
            <div className="grid">
              {result.suitablePlants.map((plant) => (
                <div key={plant.id} className="card">
                  <h4>{plant.name}</h4>
                  {plant.scientificName && (
                    <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#999' }}>{plant.scientificName}</p>
                  )}
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{plant.description?.slice(0, 100)}...</p>
                  <div style={{ marginTop: '0.75rem' }}>
                    <span className={`badge badge-${plant.careDifficulty.toLowerCase()}`}>{plant.careDifficulty}</span>
                    <span className="badge badge-sun">{plant.lightRequirement.replace('_', ' ')}</span>
                  </div>
                  {plant.isEdible && (
                    <span className="badge" style={{ background: '#fef3c7', color: '#92400e', marginTop: '0.5rem' }}>Edible</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
