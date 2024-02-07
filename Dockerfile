FROM node:20.10-alpine

# Create app directory
WORKDIR /app

COPY . .
RUN npm install

RUN npx prisma generate


EXPOSE 3333
CMD [ "npm", "run", "start" ]