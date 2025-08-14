import type { AnyRouter } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { Context } from 'hono';

export const trpcHonoHandler = <TRouter extends AnyRouter>(opts: {
  router: TRouter;
  endpoint: string;
  createContext?: () => any;
}) => {
  return async (c: Context) => {
    return fetchRequestHandler({
      endpoint: opts.endpoint,
      req: c.req.raw, // Raw Fetch API request
      router: opts.router,
      createContext: opts.createContext ?? (() => ({})),
    });
  };
};
