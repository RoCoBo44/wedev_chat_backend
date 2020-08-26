FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

COPY ./src/config/config-docker.json ./src/config/config.json

#ENTRYPOINT ["./entrypoint.sh"]

RUN npm install

#EXPOSE 3001

#ENTRYPOINT ["bash", "./wait-for-postgres.sh" ]

CMD [ "npm", "run", "dev:with-migrations" ]
#CMD [ "npm", "run", "dev" ]