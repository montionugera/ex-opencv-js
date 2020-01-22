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
## Test 

URL : `localhost:5000/ocr/process` ( POST )
Param : `image:file`
