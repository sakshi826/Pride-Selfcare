FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
ARG VITE_NEON_DATABASE_URL
ENV VITE_NEON_DATABASE_URL=$VITE_NEON_DATABASE_URL
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy dist to subdirectory matches slug
COPY --from=builder /app/dist /usr/share/nginx/html/pride

RUN rm /etc/nginx/conf.d/default.conf
COPY vite-nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
