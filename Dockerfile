FROM node:25.7.0-alpine AS build
WORKDIR /app

COPY package*.json .

RUN npm ci

COPY --exclude=package*.json . ./

RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=8082
EXPOSE 8082
CMD ["node", "./dist/server/entry.mjs"]
