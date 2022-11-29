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

ENV MONGODB_URI=mongodb://host.docker.internal:27017/yobulk
ENV DATABASE_NAME=yobulk

COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
EXPOSE 3000
CMD ["yarn", "start"]