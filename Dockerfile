FROM node:21-alpine3.18

COPY package-lock.json /app/
COPY package.json /app/
COPY src /app/

WORKDIR /app 


RUN npm install
RUN npm install -S koa
RUN npm install axios
RUN npm install koa-views ejs

CMD ["node", "app.js"]