# --- Stage 1: Builder ---
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Generate Drizzle artifacts (if you have a 'generate' script)
# RUN npm run db:generate

# Build the SvelteKit app
RUN npm run build

# Prune dev dependencies to save space
RUN npm prune --production

# --- Stage 2: Runner ---
FROM node:24-alpine

WORKDIR /app

# Create a directory for the SQLite database volume
RUN mkdir -p /app/data

# Copy built artifacts from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy Drizzle config and migrations if you run migrations at runtime
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./

# Expose SvelteKit's default port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
# Point the DB to the volume directory created above
ENV DATABASE_URL="file:/app/data/sqlite.db"

# Start the server
# Note: You might want a wrapper script here to run 'drizzle-kit migrate' before starting
CMD ["node", "build"]