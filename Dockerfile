FROM node:18

WORKDIR /app

EXPOSE 3000

RUN npm install npm@latest -g

COPY package*.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

COPY . .

CMD [ "node", "App/server.js"]