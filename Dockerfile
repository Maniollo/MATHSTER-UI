FROM node:16.16.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm i
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]