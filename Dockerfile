# === STAGE 1: Build Stage ===
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
# Install all dependencies including devDependencies for compilation
RUN npm install

COPY . .
# Compile TypeScript to JavaScript (generates the 'dist' or 'build' folder)
RUN npm run build 


# === STAGE 2: Production Stage ===
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
# Install production-only dependencies (ignores devDependencies)
RUN npm install --only=production

# Copy only the compiled JavaScript files from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 5000

# Run the fast, native JavaScript file instead of TypeScript
CMD ["node", "dist/server.js"]
