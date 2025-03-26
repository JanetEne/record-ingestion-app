import { simulateDelay } from "./simulateDelay"

export const cleanupFileData = async (data: any[]): Promise<any[]> => {
  await simulateDelay(2000)

  const cleanedData = data.filter((row) => {
    return Object.values(row).some((value) => value !== null && value !== undefined && value !== "")
  })

  return cleanedData.map((row) => {
    const newRow: any = {}
    Object.entries(row).forEach(([key, value]) => {
      if (typeof value === "string") {
        newRow[key] = value.trim()
      } else {
        newRow[key] = value
      }
    })
    return newRow
  })
}