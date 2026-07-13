// Auto-import all project images from the assets folder.
// This module exposes helpers to map a project title to the available screenshots.

const images = import.meta.glob('../assets/images/projects/*.webp', {
  eager: true,
  as: 'url',
});

const videos = import.meta.glob('../assets/video/*.{mp4,webm,ogg}', {
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

const videoEntries = Object.entries(videos).map(([path, url]) => {
  const fileName = path.split('/').pop() ?? '';
  const name = fileName.replace(/\.(mp4|webm|ogg)$/i, '');
  return {
    url,
    name: name.toLowerCase(),
    normalized: normalize(name),
  };
});

const findMatchingAsset = (
  titleKey: string,
  titleParts: string[],
  entries: Array<{ url: string; normalized: string }>,
  specialMappings: Record<string, string[]>,
) => {
  if (specialMappings[titleKey]) {
    const matchedAssets = specialMappings[titleKey]
      .map((specialName) => {
        const normalizedSpecial = normalize(specialName);
        return entries.find((entry) => entry.normalized === normalizedSpecial)?.url;
      })
      .filter((url): url is string => url !== undefined);

    if (matchedAssets.length > 0) {
      return matchedAssets;
    }
  }

  const specialKey = Object.keys(specialMappings).find(
    (key) => titleParts.some((part) => key.includes(part)) || titleParts.join('_').includes(key),
  );

  if (specialKey) {
    const matchedAssets = specialMappings[specialKey]
      .map((specialName) => {
        const normalizedSpecial = normalize(specialName);
        return entries.find((entry) => entry.normalized.includes(normalizedSpecial))?.url;
      })
      .filter((url): url is string => url !== undefined);

    if (matchedAssets.length > 0) {
      return matchedAssets;
    }
  }

  const ranked = entries
    .map((entry) => {
      const matchCount = titleParts.reduce(
        (count, part) => count + (entry.normalized.includes(part) ? 1 : 0),
        0,
      );
      return { entry, matchCount };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map((item) => item.entry.url);

  return ranked.length > 0 ? ranked : [];
};

export const getProjectImages = (projectTitle: string) => {
  const titleKey = normalize(projectTitle);
  const titleParts = titleKey.split('_').filter(Boolean);

  // Special mappings for projects with unique naming patterns
  const specialMappings: Record<string, string[]> = {
    'monitoring_pande_besi': ['pande_besi', 'mitra1'],
    'booking_gym_app': ['gym_booking', 'gym_app', 'gym1', 'gym2'],
    'simple': ['simple', 'simple1', 'simple2', 'simple3', 'simple4'],
    'si_respan': ['sirespan', 'sirespan1', 'sirespan2', 'sirespan3'],
    'cctv_monitoring_system': ['cctvsek', 'cctv1', 'cctv2', 'cctv3'],
    'manku': ['mankulogo','manku1', 'manku4', 'manku2', 'manku3','manku5'],
  };

  const videoUrls = findMatchingAsset(titleKey, titleParts, videoEntries, specialMappings);
  const imageUrls = findMatchingAsset(titleKey, titleParts, imageEntries, specialMappings);
  const mediaUrls = [...imageUrls, ...videoUrls];

  if (mediaUrls.length > 0) {
    return mediaUrls;
  }

  const ranked = imageEntries
    .map((entry) => {
      const matchCount = titleParts.reduce(
        (count, part) => count + (entry.normalized.includes(part) ? 1 : 0),
        0,
      );
      return { entry, matchCount };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map((item) => item.entry.url);

  // If we don't find any matching image, fall back to returning all project screenshots.
  return ranked.length > 0 ? ranked : imageEntries.map((entry) => entry.url);
};
