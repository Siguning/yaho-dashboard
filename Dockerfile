FROM node:24 AS base
WORKDIR /app

# Copy package files
# We don't have package-lock.json yet if using bun locally, so we copy package.json only
COPY package.json ./

# Install build dependencies for native modules (better-sqlite3)
RUN apt-get update && apt-get install -y python3 make g++

# Install dependencies using npm
# This will generate a package-lock.json inside the container
RUN npm install

# Copy source code
COPY . .

# Generate SvelteKit config (tsconfig.json)
RUN npx svelte-kit sync

# Build the application
# Set DATABASE_URL for build time (required by server-side code analysis)
RUN DATABASE_URL="file:local.db" NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Start the application
CMD ["node", "build/index.js"]
