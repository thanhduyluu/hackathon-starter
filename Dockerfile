FROM node:20-slim as BASE

WORKDIR /starter
ENV NODE_ENV development

COPY package*.json /starter/

RUN if [ "$NODE_ENV" = "production" ]; then \
    npm install --omit=dev; \
    else \
    npm install; \
    fi \

COPY . /starter/


FROM base as linter

WORKDIR /starter

RUN npm run lint

FROM node:20-alpine as PRODUCTION

WORKDIR /starter

COPY --from=linter /starter/ ./

CMD ["pm2-runtime","app.js"]

EXPOSE 8080
