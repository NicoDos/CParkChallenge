FROM node:9-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm i --production

EXPOSE 8080

ENV NODE_ENV production

CMD ["node", "index.js"]
