FROM node:14.15

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

###  Install dependencies
RUN npm install --silent

# Copy local files to working directory
COPY . .

EXPOSE 8080

CMD ["npm", "run", "nodemon"]