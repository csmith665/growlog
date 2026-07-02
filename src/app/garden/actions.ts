'use server';

import { prisma } from '@/lib/db';
import { GardenBedType, GardenLightLevel, SoilType } from '@prisma/client';
import { z } from 'zod';

const bedSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.nativeEnum(GardenBedType),
  width: z.coerce.number().min(1).max(100),
  length: z.coerce.number().min(1).max(100),
  depth: z.coerce.number().min(0.5).max(4).optional(),
  sunExposure: z.nativeEnum(GardenLightLevel).optional(),
  soilType: z.nativeEnum(SoilType).optional(),
  hardinessZone: z.coerce.number().min(1).max(13).optional(),
});

export type GardenResult = Awaited<ReturnType<typeof createGardenBed>>;

export async function createGardenBed(formData: FormData) {
  const data = bedSchema.parse({
    name: formData.get('name'),
    type: formData.get('type'),
    width: formData.get('width'),
    length: formData.get('length'),
    depth: formData.get('depth') || undefined,
    sunExposure: formData.get('sunExposure') || undefined,
    soilType: formData.get('soilType') || undefined,
    hardinessZone: formData.get('hardinessZone') || undefined,
  });

  const bed = await prisma.gardenBed.create({
    data: {
      name: data.name,
      type: data.type,
      width: data.width,
      length: data.length,
      depth: data.depth,
      sunExposure: data.sunExposure,
      soilType: data.soilType,
      hardinessZone: data.hardinessZone,
    },
  });

  // Find suitable plants for this bed
  const plants = await prisma.gardenPlant.findMany({
    orderBy: { name: 'asc' },
  });

  const suitablePlants = plants.filter((plant) => {
    // Filter by sun exposure if provided
    if (data.sunExposure) {
      const sunRank = { FULL_SHADE: 1, PARTIAL_SHADE: 2, PARTIAL_SUN: 3, FULL_SUN: 4 };
      const plantSunRank = sunRank[plant.lightRequirement];
      const bedSunRank = sunRank[data.sunExposure];
      // Plant needs equal or less sun than bed provides
      if (plantSunRank > bedSunRank) return false;
    }

    // Filter by hardiness zone if provided
    if (data.hardinessZone && plant.hardinessZoneMin && plant.hardinessZoneMax) {
      if (data.hardinessZone < plant.hardinessZoneMin || data.hardinessZone > plant.hardinessZoneMax) {
        return false;
      }
    }

    // Container/hydroponic beds don't suit large trees/shrubs
    if ((data.type === 'CONTAINER' || data.type === 'HYDROPONIC') &&
        ['TREE', 'SHRUB'].includes(plant.category)) {
      return false;
    }

    return true;
  });

  return {
    bed,
    suitablePlants: suitablePlants.slice(0, 12),
    tips: generateTips(data),
  };
}

function generateTips(data: z.infer<typeof bedSchema>) {
  const tips: string[] = [];

  if (data.type === 'RAISED_BED') {
    tips.push('Raised beds warm up faster in spring and offer better drainage.');
    tips.push('Use a mix of topsoil and compost for best results.');
  }

  if (data.type === 'CONTAINER') {
    tips.push('Containers dry out quickly. Check soil moisture daily in hot weather.');
    tips.push('Ensure containers have drainage holes to prevent root rot.');
  }

  if (data.type === 'IN_GROUND') {
    tips.push('Amend native soil with compost before planting.');
    tips.push('Watch for poor drainage areas; consider raised beds if water pools.');
  }

  if (data.sunExposure === 'FULL_SUN') {
    tips.push('Full sun beds (6+ hours) are great for vegetables and most herbs.');
  }

  if (data.sunExposure === 'FULL_SHADE') {
    tips.push('Shade beds suit leafy greens, hostas, and ferns. Avoid fruiting vegetables.');
  }

  if (data.hardinessZone) {
    tips.push(`Your hardiness zone is ${data.hardinessZone}. Choose plants rated for your zone.`);
  }

  tips.push('Group plants with similar water needs together.');
  tips.push('Consider companion planting to improve growth and deter pests.');

  return tips;
}
