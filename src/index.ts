import app from "./app";
import { activitiesToCronRegistry } from "./activities/registry";

const port = process.env.PORT || 5001;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
  const a = activitiesToCronRegistry;
});
