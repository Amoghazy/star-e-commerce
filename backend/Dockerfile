FROM node:20.16.0-bookworm-slim

WORKDIR /app

COPY package*.json .
RUN ls -l
RUN npm i

COPY . .
RUN npm i -g nodemon
ENTRYPOINT [ "npm" , "run" , "dev" ]
