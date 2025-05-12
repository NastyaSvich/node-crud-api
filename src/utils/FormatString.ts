/**
 * Получение id из url.
 */
export const getUserId = (url: string): string | undefined => {
  const parts = url.split('/').filter(Boolean);
  const hasId = parts.length === 3;
  return hasId ? parts[2] : undefined;
};
