const required = ['JWT_SECRET', 'MONGO_URI'] as const

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

export const env = {
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  mongoUri: process.env.MONGO_URI as string,
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:3000',
  port: Number(process.env.PORT) || 5000,
}
