'use server';

import { prisma } from '@/lib/db';
import { GardenBedType, GardenLightLevel, SoilType, Difficulty } from '@prisma/client';
import { z } from 'zod';

const planSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.nativeEnum(GardenBedType),
  width: z.coerce.number().min(1).max(100),
  length: z.coerce.number().min(1).max(100),
  depth: z.coerce.number().min(0.5).max(4).optional(),
  sunExposure: z.nativeEnum(GardenLightLevel),
  soilType: z.nativeEnum(SoilType).optional(),
  hardinessZone: z.coerce.number().min(1).max(13),
  experience: z.nativeEnum(Difficulty),
});

export type GardenPlanResult = Awaited<ReturnType<typeof planGarden>>;

export async function planGarden(formData: FormData) {
  const data = planSchema.parse({
    name: formData.get('name'),
    type: formData.get('type'),
    width: formData.get('width'),
    length: formData.get('length'),
    depth: formData.get('depth') || undefined,
    sunExposure: formData.get('sunExposure'),
    soilType: formData.get('soilType') || undefined,
    hardinessZone: formData.get('hardinessZone'),
    experience: formData.get('experience'),
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

  const plants = await prisma.gardenPlant.findMany({
    orderBy: { name: 'asc' },
  });

  const sunRank = { FULL_SHADE: 1, PARTIAL_SHADE: 2, PARTIAL_SUN: 3, FULL_SUN: 4 };
  const difficultyRank = { BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3 };

  const suitablePlants = plants.filter((plant) => {
    // Sun requirement must be <= bed sun exposure
    if (sunRank[plant.lightRequirement] > sunRank[data.sunExposure]) return false;

    // Hardiness zone check
    if (data.hardinessZone < (plant.hardinessZoneMin ?? 1) || data.hardinessZone > (plant.hardinessZoneMax ?? 13)) {
      return false;
    }

    // Difficulty check — suggest plants at or below user level
    if (difficultyRank[plant.careDifficulty] > difficultyRank[data.experience] + 1) {
      return false;
    }

    // Soil type check if both specified
    if (data.soilType && plant.soilType.length > 0 && !plant.soilType.includes(data.soilType)) {
      return false;
    }

    // Container/hydroponic restrictions
    if ((data.type === 'CONTAINER' || data.type === 'HYDROPONIC') && ['TREE', 'SHRUB'].includes(plant.category)) {
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

function generateTips(data: z.infer<typeof planSchema>) {
  const tips: string[] = [];
  const area = data.width * data.length;

  if (data.type === 'RAISED_BED') {
    tips.push('Raised beds warm faster in spring and drain better. Fill with quality soil/compost mix.');
  }
  if (data.type === 'CONTAINER') {
    tips.push('Containers dry out quickly — check moisture daily in hot weather. Ensure drainage holes.');
  }
  if (data.type === 'IN_GROUND') {
    tips.push('Amend native soil with compost before planting. Avoid areas where water pools.');
  }
  if (data.sunExposure === 'FULL_SUN') {
    tips.push('Full sun (6+ hours) is ideal for vegetables, herbs, and most fruits.');
  }
  if (data.sunExposure === 'FULL_SHADE') {
    tips.push('Full shade limits options to leafy greens, hostas, and ferns. Avoid fruiting vegetables.');
  }
  if (area < 20) {
    tips.push('Small space? Use vertical growing, containers, and compact varieties to maximize yield.');
  }

  tips.push('Group plants with similar water needs together.');
  tips.push('Use companion planting to improve growth and naturally deter pests.');
  tips.push('Rotate plant families each year to prevent soil depletion and disease buildup.');

  return tips;
}
