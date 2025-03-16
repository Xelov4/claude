FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

ENV NODE_ENV=development
ENV DATABASE_URL="mysql://video_ia_user:Thunder23**@mariadb:3306/video_ia_db"
ENV NEXT_PUBLIC_APP_URL="http://localhost:3000"

EXPOSE 3000

CMD ["npm", "run", "dev"]