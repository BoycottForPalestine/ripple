import app from "./app";
import { fetchersToCronRegistry } from "./fetchers/registry";

const port = process.env.PORT || 5001;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
  const a = fetchersToCronRegistry;
});
