FROM node:18.7.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm i
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]