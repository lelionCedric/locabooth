# Build Stage
FROM node:23-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Production Stage
FROM nginx:latest as prod

COPY --from=build /app/nginx.conf /etc/nginx/conf.d

# Copy the build output from the dist folder into the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]