FROM node:12.6.0-alpine
RUN apk add --no-cache git

WORKDIR /usr/src/app/ocr
ENV NODE_ENV production
COPY . .
# COPY package.json .
# COPY yarn.lock .
# COPY node_modules/lib /usr/src/lib
# COPY moleculer.config.js moleculer.config.js
# COPY dist dist

# RUN yarn install --production --no-cache

CMD yarn start

EXPOSE 5000

ARG commit_hash
ENV COMMIT_HASH=$commit_hash