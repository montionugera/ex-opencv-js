FROM pasit/opencv-nodejs-base:node10-opencv4.1.0-contrib
# RUN apk add --no-cache git
# RUN apt-get update
WORKDIR /usr/src/app
# ENV NODE_ENV production
COPY . .
WORKDIR /usr/src/app/lib

RUN yarn
RUN yarn run build

WORKDIR /usr/src/app
RUN yarn install
RUN yarn run build

EXPOSE 5000
CMD [ "yarn", "start"]
