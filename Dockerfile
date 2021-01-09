FROM node:14.15.4-buster

WORKDIR /barobot

COPY . .

RUN npm install
RUN mkdir -p ./database/users

ENTRYPOINT node bot.js