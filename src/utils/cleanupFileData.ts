import { simulateDelay } from "./simulateDelay";

export const cleanupFileData = async (data: any[]): Promise<any[]> => {
  await simulateDelay(2000);

  const cleanedData = data.filter((row) => {
    return Object.values(row).some(
      (value) => value !== null && value !== undefined && value !== ""
    );
  });

  return cleanedData.map((row) => {
    const newRow: any = {};
    
    Object.entries(row).forEach(([key, value]) => {
      if (key.startsWith('__EMPTY')) return;
      
      const cleanKey = key
        .trim()
        .replace(/\s+/g, '_')
        .toLowerCase();
      
      if (typeof value === 'string') {
        const trimmed = value.trim();
        newRow[cleanKey] = trimmed === '' ? null : trimmed;
      } else if (value instanceof Date) {
        newRow[cleanKey] = value.toISOString();
      } else {
        newRow[cleanKey] = value;
      }
    });
    
    return newRow;
  }).filter(row => Object.keys(row).length > 0);
};