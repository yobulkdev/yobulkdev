FROM node:16.17.0-bullseye-slim as BUILD_IMAGE
WORKDIR /app
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install --frozen-lockfile
COPY . .
# build
RUN yarn build

FROM node:16.17.0-bullseye-slim
WORKDIR /app
# copy from build image

COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/lib/seeder.js ./lib/seeder.js
EXPOSE 5050
CMD ["yarn", "start"]

#docker run --rm -it -p 5050:5050/tcp  --env="OPENAI_SECRET_KEY=zyudofadsfkj" yobulkdev:latest