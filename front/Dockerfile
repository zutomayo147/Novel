FROM node:18-alpine

WORKDIR /front

# COPY yarn.lock package.json /front/

RUN yarn && yarn cache clean

CMD [ "yarn", "dev" ]