import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function DatabasePage() {
  const plants = await prisma.gardenPlant.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <>
      <div className="hero">
        <h1>Plant Database</h1>
        <p>Browse plants with accurate growing information and care requirements</p>
      </div>

      <section className="section">
        <div className="grid">
          {plants.map((plant) => (
            <div key={plant.id} className="card">
              <h3>{plant.name}</h3>
              {plant.scientificName && (
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#999' }}>
                  {plant.scientificName}
                </p>
              )}
              <p style={{ marginTop: '0.5rem' }}>{plant.description}</p>
              
              <div style={{ marginTop: '1rem' }}>
                <span className={`badge badge-${plant.careDifficulty.toLowerCase()}`}>
                  {plant.careDifficulty}
                </span>
                <span className="badge badge-sun">
                  {plant.lightRequirement.replace('_', ' ')}
                </span>
                <span className="badge badge-water">
                  {plant.waterNeeds} Water
                </span>
              </div>

              <div style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                {plant.hardinessZoneMin && plant.hardinessZoneMax && (
                  <p><strong>Zones:</strong> {plant.hardinessZoneMin}-{plant.hardinessZoneMax}</p>
                )}
                {plant.matureHeight && (
                  <p><strong>Size:</strong> {plant.matureHeight}" H × {plant.matureSpread}" W</p>
                )}
                {plant.daysToHarvest && plant.isEdible && (
                  <p><strong>Harvest:</strong> {plant.daysToHarvest} days</p>
                )}
              </div>

              {plant.isPerennial && (
                <span className="badge" style={{ background: '#d1fae5', color: '#065f46', marginTop: '0.5rem' }}>
                  Perennial
                </span>
              )}

              {plant.isEdible && (
                <span className="badge" style={{ background: '#fef3c7', color: '#92400e', marginTop: '0.5rem' }}>
                  Edible
                </span>
              )}

              {plant.companionPlants.length > 0 && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  <strong>Companions:</strong> {plant.companionPlants.slice(0, 3).join(', ')}
                </div>
              )}

              <div style={{ marginTop: '0.75rem' }}>
                {plant.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="badge" style={{ background: '#f0f0f0', color: '#666' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
