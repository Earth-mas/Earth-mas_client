FROM node:16

WORKDIR /frontend/
COPY ./package.json /frontend/
COPY ./yarn.lock /frontend/
RUN yarn install

COPY . /frontend/
#RUN yarn build
CMD yarn start