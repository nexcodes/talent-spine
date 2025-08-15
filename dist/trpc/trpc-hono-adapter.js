import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
export const trpcHonoHandler = (opts) => {
    return async (c) => {
        return fetchRequestHandler({
            endpoint: opts.endpoint,
            req: c.req.raw, // Raw Fetch API request
            router: opts.router,
            createContext: opts.createContext ?? (() => ({})),
        });
    };
};
