FROM node:14-alpine
WORKDIR /todo-app/
EXPOSE 3001
#depois disso tudo é com app(./ ou .)
# COPY package*.json ./ não precisou pois pegou o node_modules
# RUN npm install
COPY . .
ADD node_modules.tar.gz ./
CMD [ "npm", "start" ]
