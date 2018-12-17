export async function partitionAsync(inputData, progressCallback, size = 20, interval = 100) {
  return new Promise(resolve => {
    const input = [...inputData];

    const part = input.splice(0, size);
    progressCallback(part);

    const id = setInterval(() => {
      const part = input.splice(0, size);
      progressCallback(part);
      if (!input.length) {
        clearInterval(id);
        resolve();
      }
    }, interval);
  });
}

