export const getResponsiveValue = (
  width: number,
  small: number,
  medium: number,
  large: number,
): number => {
  if (width < 375) return small;
  if (width < 768) return medium;
  return large;
};
 // Normalises the backend Mixed "text" field into a string[] for rendering.
// Handles: undefined → [], plain string → [string], string[] → string[]
export const normaliseVisaText = (text?: string | string[]): string[] => {
  if (!text) return [];
  if (typeof text === "string") return [text];
  return text;
};