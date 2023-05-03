import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
const { PORT, ..._env } = createEnv({
    clientPrefix: "PUBLIC_",
    server: {
        NODE_ENV: z.string().default("development"),
        DATABASE_URL: z.string().url().optional(),
        PORT: z.string().transform(s => s ? parseInt(s) : undefined).optional(),
    },
    client: {},
    runtimeEnv: process.env,
});

export const env = {
    ..._env,
    PORT: PORT || (_env.NODE_ENV === "production" ? 3000 : 3001),
} 