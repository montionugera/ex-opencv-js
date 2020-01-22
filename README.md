## Description

Opencv with node js 

`docker build -f Dockerfile -t $DOCKER_USERNAME/ex-opencv-nodejs .`


## Running the container
docker pull $DOCKER_USERNAME/ex-opencv-nodejs:latest
docker run --rm -p 5000:5000 $DOCKER_USERNAME/ex-opencv-nodejs:latest
` $ docker run --rm -p 5000:5000 --env-file ./secret/.env \
 -v $(pwd)/secret/credential.json:/usr/src/app/credential.json \
 $DOCKER_USERNAME/ex-opencv-nodejs 
 `# ex-opencv-js
## Pushing the 
`git add . && git commit -m "update ci config" && git push`
## Pushing the container
` $ docker push $DOCKER_USERNAME/opencv-nodejs-base `
docker push pasit/opencv-nodejs-base:node10-opencv4.1.0-contrib
## Test 

URL : `localhost:5000/ocr/process` ( POST )
Param : `image:file`


## Scripts to build opencv4nodejs on ubuntu 16.04. (Repository)

Usage:

./build.sh <OpenCV version> <with contrib?> <node major version>
Build OpenCV 3.4.1 with contrib and node version 9.x:

./build-base-img.sh 3.4.1 y 10