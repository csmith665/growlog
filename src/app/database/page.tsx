import { prisma } from '@/lib/db';
import { Difficulty, GardenPlantCategory, GardenLightLevel, WaterNeeds } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function DatabasePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const difficulty = typeof searchParams.difficulty === 'string' ? searchParams.difficulty : undefined;
  const light = typeof searchParams.light === 'string' ? searchParams.light : undefined;
  const water = typeof searchParams.water === 'string' ? searchParams.water : undefined;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const edible = typeof searchParams.edible === 'string' ? searchParams.edible : undefined;

  const plants = await prisma.gardenPlant.findMany({
    where: {
      AND: [
        category ? { category: category as GardenPlantCategory } : {},
        difficulty ? { careDifficulty: difficulty as Difficulty } : {},
        light ? { lightRequirement: light as GardenLightLevel } : {},
        water ? { waterNeeds: water as WaterNeeds } : {},
        edible === 'true' ? { isEdible: true } : {},
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { scientificName: { contains: search, mode: 'insensitive' } },
                { tags: { has: search.toLowerCase() } },
              ],
            }
          : {},
      ],
    },
    orderBy: { name: 'asc' },
  });

  return (
    <>
      <div className="hero">
        <h1>Plant Database</h1>
        <p>Verified growing information for vegetables, herbs, flowers, and more</p>
      </div>

      <section className="section">
        <form className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>Search</label>
              <input name="search" defaultValue={search} placeholder="Name or tag..." style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>Category</label>
              <select name="category" defaultValue={category} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="">All</option>
                {Object.values(GardenPlantCategory).map((c) => (
                  <option key={c} value={c}>{c.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>Difficulty</label>
              <select name="difficulty" defaultValue={difficulty} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="">All</option>
                {Object.values(Difficulty).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>Light</label>
              <select name="light" defaultValue={light} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="">All</option>
                {Object.values(GardenLightLevel).map((l) => (
                  <option key={l} value={l}>{l.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>Water</label>
              <select name="water" defaultValue={water} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="">All</option>
                {Object.values(WaterNeeds).map((w) => (
                  <option key={w} value={w}>{w.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="edible" name="edible" value="true" defaultChecked={edible === 'true'} />
              <label htmlFor="edible" style={{ fontWeight: 600 }}>Edible only</label>
            </div>
            <div>
              <button type="submit" className="btn">Filter</button>
              <a href="/database" className="btn btn-secondary" style={{ marginLeft: '0.5rem' }}>Clear</a>
            </div>
          </div>
        </form>

        <p style={{ marginBottom: '1rem', color: '#666' }}>{plants.length} plant(s) found</p>

        <div className="grid">
          {plants.map((plant) => (
            <div key={plant.id} className="card">
              {plant.imageUrl && (
                <img src={plant.imageUrl} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem' }} />
              )}
              <h3>{plant.name}</h3>
              {plant.scientificName && <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#999' }}>{plant.scientificName}</p>}
              <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>{plant.description}</p>
              <div style={{ marginTop: '0.75rem' }}>
                <span className={`badge badge-${plant.careDifficulty.toLowerCase()}`}>{plant.careDifficulty}</span>
                <span className="badge badge-sun">{plant.lightRequirement.replace('_', ' ')}</span>
                <span className="badge badge-water">{plant.waterNeeds.replace('_', ' ')} Water</span>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                {plant.hardinessZoneMin && plant.hardinessZoneMax && <p><strong>Zones:</strong> {plant.hardinessZoneMin}-{plant.hardinessZoneMax}</p>}
                {plant.daysToHarvest && <p><strong>Harvest:</strong> {plant.daysToHarvest} days</p>}
                {plant.spacingInches && <p><strong>Spacing:</strong> {plant.spacingInches}"</p>}
              </div>
              {plant.plantingGuide && (
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '6px', fontSize: '0.85rem' }}>
                  <strong>Planting:</strong> {plant.plantingGuide}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
