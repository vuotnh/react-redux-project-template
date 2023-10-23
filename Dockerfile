FROM node:18.18-alpine

WORKDIR /app

COPY package.json .

# defind arg in docker-compose file
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
            then npm install; \
            else npm install --only=production; \
            fi
# RUN npm install

COPY . ./

# expose port
EXPOSE 3000

# compile typescript to /build
RUN npm run build
