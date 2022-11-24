FROM node:16.17.0-bullseye-slim

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

#RUN yarn run build

EXPOSE 3000
CMD [ "yarn", "run", "dev" ]