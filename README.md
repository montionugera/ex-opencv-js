## Description

Opencv with node js 

`docker build -f Dockerfile -t $DOCKER_USERNAME/ex-opencv-nodejs .`


## Running the container
docker pull $DOCKER_USERNAME/ex-opencv-nodejs:latest
docker run --rm -p 5000:5000 $DOCKER_USERNAME/ex-opencv-nodejs:latest
` $ docker run --rm -p 80:80 $DOCKER_USERNAME/ex-opencv-nodejs `# ex-opencv-js


## Test 


URL : `localhost:5000/ocr/process` ( POST )
Param : `image:file`
