// Auto-import all project images from the assets folder.
// This module exposes helpers to map a project title to the available screenshots.

const images = import.meta.glob('../assets/images/projects/*.webp', {
  eager: true,
  as: 'url',
});

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');

const imageEntries = Object.entries(images).map(([path, url]) => {
  const fileName = path.split('/').pop() ?? '';
  const name = fileName.replace(/\.webp$/i, '');
  return {
    url,
    name: name.toLowerCase(),
    normalized: normalize(name),
  };
});

export const getProjectImages = (projectTitle: string) => {
  const titleKey = normalize(projectTitle);
  const titleParts = titleKey.split('_').filter(Boolean);

  // Special mappings for projects with unique naming patterns
  const specialMappings: Record<string, string[]> = {
    'monitoring_pande_besi': ['pande_besi', 'mitra1'],
    'booking_gym_app': ['gym_booking','gym1', 'gym2'],
    'simple': ['simple', 'simple1', 'simple2', 'simple3', 'simple4'],
    'si_respan': ['sirespan', 'sirespan1', 'sirespan2', 'sirespan3'],
    'cctv_monitoring_system': ['cctvsek','cctv1', 'cctv2', 'cctv3']
  };

  // Check for exact title match first
  if (specialMappings[titleKey]) {
    // Preserve the order from specialMappings
    const matchedImages = specialMappings[titleKey]
      .map(specialName => {
        const normalizedSpecial = normalize(specialName);
        return imageEntries.find(entry => entry.normalized === normalizedSpecial)?.url;
      })
      .filter(url => url !== undefined);

    if (matchedImages.length > 0) {
      return matchedImages;
    }
  }

  // Check for special mappings with partial matching
  const specialKey = Object.keys(specialMappings).find(key =>
    titleParts.some(part => key.includes(part)) || titleParts.join('_').includes(key)
  );

  if (specialKey) {
    // Preserve the order from specialMappings
    const matchedImages = specialMappings[specialKey]
      .map(specialName => {
        const normalizedSpecial = normalize(specialName);
        return imageEntries.find(entry => entry.normalized.includes(normalizedSpecial))?.url;
      })
      .filter(url => url !== undefined);

    if (matchedImages.length > 0) {
      return matchedImages;
    }
  }

  // Fallback to the original ranking logic
  const ranked = imageEntries
    .map((entry) => {
      const matchCount = titleParts.reduce(
        (count, part) => count + (entry.normalized.includes(part) ? 1 : 0),
        0
      );
      return { entry, matchCount };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map((item) => item.entry.url);

  // If we don't find any matching image, fall back to returning all project screenshots.
  return ranked.length > 0 ? ranked : imageEntries.map((entry) => entry.url);
};
