FROM oven/bun:1 AS base
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
# Ensure DATABASE_URL is set at runtime or build time if needed. 
# For SQLite file persistence in the container, we rely on the copied local.db or a volume.
# If local.db is copied, it will be used.

# Start the application
CMD ["bun", "build/index.js"]
