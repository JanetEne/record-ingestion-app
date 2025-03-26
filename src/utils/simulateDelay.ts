export const simulateDelay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
