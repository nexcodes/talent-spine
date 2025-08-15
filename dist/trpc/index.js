import { initTRPC } from '@trpc/server';
import { z } from 'zod';
const t = initTRPC.create();
// Public router example
export const appRouter = t.router({
    hello: t.procedure
        .input(z.object({ name: z.string().optional() }))
        .query(({ input }) => {
        return { greeting: `Hello ${input?.name ?? 'world'}!` };
    }),
});
