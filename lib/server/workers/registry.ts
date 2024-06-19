let counter = 0;
export const worker = (data: any) => {
  console.log("Worker", counter++, data);
  return counter;
};
