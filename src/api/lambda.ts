import express from "express";
import {
  Lambda,
  getLambdaById,
  getLambdas,
  updateCronExpression,
} from "../model/lambdas";
import { registry } from "../lambdas/registry";
import { EventSearchOptions, getEventsBySourceName } from "../model/events";
import { asyncMiddleware } from "../middlewares/async";
import { BadRequestError, NotFoundError } from "../common/errors";
import { RippleErrorMessage } from "../common/errors/ripple-error";

const router = express.Router();

type LambdaResponse = Lambda[];

// TODO: filter by orgId
router.get<{}, LambdaResponse>(
  "/",
  asyncMiddleware(async (req, res) => {
    try {
      const lambdas = await getLambdas();
      res.json(lambdas);
    } catch (e) {
      console.error(e);
    }
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;

    try {
      const lambda = await getLambdaById(id);
      res.json(lambda);
    } catch (e) {
      console.error(e);
    }
  })
);

router.get(
  "/:id/event",
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const lambda = await getLambdaById(id);
    const organizationId = req.organizationId;

    // const { filters, sortBy, page } = req.query;

    const options: EventSearchOptions = {};

    if (req.query.filters) {
      // Validation is handled in middleware so this casting should be safe
      options.filters = req.query.filters as Record<string, string>;
    }

    if (req.query.sortBy) {
      // Validation is handled in middleware so this casting should be safe
      options.sortBy = req.query.sortBy as string;
    }

    if (req.query.page) {
      // Validation is handled in middleware so this casting should be safe
      options.page = parseInt(req.query.page as string);
    }

    if (req.query.sortOrder) {
      // Validation is handled in middleware so this casting should be safe
      options.sortOrder = req.query.sortOrder as "asc" | "desc";
    }

    console.log(options);

    if (!lambda) {
      // TODO: fix using error pattern from seaport
      throw NotFoundError(RippleErrorMessage.LAMBDA_NOT_FOUND);
    }

    if (lambda?.organizationId !== organizationId) {
      throw BadRequestError(RippleErrorMessage.LAMBDA_ORG_ID_MISMATCH);
    }

    const sourceName = lambda.sourceName;

    try {
      const { events, totalEventsCount } = await getEventsBySourceName(
        organizationId,
        sourceName,
        options
      );
      res.json({
        events,
        totalEventsCount,
      });
    } catch (e) {
      console.error(e);
    }
  })
);

// router.patch(
//   "/:id",
//   asyncMiddleware(async (req, res) => {
//     const { id } = req.params;
//     const { cronPattern } = req.body;
//     const organizationId = req.organizationId;

//     try {
//       if (!id || !cronPattern) {
//         res.sendStatus(400);
//       }

//       registry.updateCronExpression(organizationId, id, cronPattern);

//       res.sendStatus(200);
//     } catch (e) {
//       console.error(e);
//       res.sendStatus(500);
//     }
//   })
// );

export default router;
