###########
# BUILDER #
###########

# pull official base image
FROM node:12.18.3-alpine3.9 as builder

# set work directory
WORKDIR /app

# install dependencies and avoid `node-gyp rebuild` errors
COPY package.json package-lock.json /app/
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

# copy our react project
COPY . /app/

# perform npm build
ARG API_SERVER
ENV REACT_APP_API_SERVER=${API_SERVER}
RUN REACT_APP_API_SERVER=${API_SERVER} \ 
  npm run build

#########
# FINAL #
#########

# pull official base image
FROM node:12.18.3-alpine3.9 

# set work directory
WORKDIR /app

# install serve - deployment static server suggested by official create-react-app
RUN npm install -g serve

# copy our build files from our builder stage
COPY --from=builder /app/build ./build