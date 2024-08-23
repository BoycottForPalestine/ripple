import app from "./app";
// import { lambdasToCronRegistry } from "./lambdas/registry";
import { registry } from "./lambdas/registry";

const port = process.env.PORT || 5001;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
  registry.initializelambdas();
});
