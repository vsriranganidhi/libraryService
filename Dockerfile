# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Only install production dependencies (ignores devDependencies like TypeScript)
RUN npm install --only=production
# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]