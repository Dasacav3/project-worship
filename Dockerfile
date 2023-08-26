FROM node:18.17.1-bookworm-slim

WORKDIR /app

COPY . .

RUN apt update && apt install jq -y

RUN bash -c ./configure.sh

EXPOSE 4440

EXPOSE 5173

CMD ["bash", "-c", "./run.sh"]
