FROM node:18-alpine

# USER me

WORKDIR /front

# COPY yarn.lock package.json /front/

RUN yarn && yarn cache clean
# RUN yarn install --production && yarn cache clean

CMD [ "yarn", "dev" ]