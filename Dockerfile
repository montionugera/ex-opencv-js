FROM pasit/opencv-nodejs-base
# RUN apk add --no-cache git

WORKDIR /usr/src/app
# ENV NODE_ENV production
COPY lib lib
COPY package.json .
COPY yarn.lock .
# COPY credential.json credential.json
COPY moleculer.config.js moleculer.config.js
# RUN yarn
COPY node_modules node_modules
COPY dist dist

EXPOSE 5000
CMD [ "yarn", "start"]

ARG commit_hash
ENV COMMIT_HASH=$commit_hash