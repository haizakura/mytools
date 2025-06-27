FROM node:lts-alpine
EXPOSE 3010
WORKDIR /home/app
COPY . /home/app
RUN corepack enable pnpm
RUN pnpm install
CMD [ "pnpm", "start" ]
