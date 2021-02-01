# Build React client
FROM node:14.15

WORKDIR /usr/src/app

COPY package*.json ./

###  Install dependencies
RUN npm install --silent

# Copy local files to working directory
COPY . .

EXPOSE 3000

CMD ["npm","start"]