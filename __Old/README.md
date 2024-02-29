GIT
==============================
git status

git add .

git commit -m "text"

git push -u origin koa <- namn på branchen


DOCKER
==============================

docker build -t namn:tag .

docker build -t iss:1 . (. = allt i dir)

docker run -d(etached) -p(ort) 3000:3000 namn:tag

docker run -d -p 3000:3000 iss:1 

Login Docker Hub

docker login -u undefined0x@protonmail.com

       password:*******


Tag and Push

Tag: docker tag local-image:tag dockerhub-username/repository-name:tag

Exempel Tag: docker tag iss:1 bugzapper/koa-koa:1

Push: docker push dockerhub-username/repository-name:tag

Exempel Push: docker push bugzapper/koa-koa:1

Pull:

docker pull bugzapper/koa-koa:1



