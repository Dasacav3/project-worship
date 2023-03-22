FROM node:14.21-bullseye

WORKDIR /app

COPY . .

RUN bash -c ./execute.sh

EXPOSE 4440

EXPOSE 5173

CMD ["npm", "run", "dev"]
