FROM node:14-alpine
WORKDIR /todo-app/
EXPOSE 3000
# ENV REACT_APP_API_HOST=localhost
# ENV REACT_APP_API_PORT=3001
COPY . .
ADD node_modules.tar.gz ./
CMD [ "npm", "start" ]
