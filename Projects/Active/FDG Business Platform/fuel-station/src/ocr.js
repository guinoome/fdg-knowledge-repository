// Ambiguous images must never silently select a meter value.
export function totalizerCandidates(blocks, opening) {
  return [...new Set(blocks.flatMap((block) => String(block.rawValue || "").match(/\d[\d,]*(?:\.\d+)?/g) || [])
    .map((value) => Number(value.replaceAll(",", "")))
    .filter((value) => Number.isFinite(value) && value >= opening))];
}
