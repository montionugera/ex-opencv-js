FROM justadudewhohacks/opencv-nodejs
# RUN apk add --no-cache git
# RUN apt-get update
RUN apt-get update && apt-get install -y git \
    && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install -y nodejs
RUN npm install -g yarn