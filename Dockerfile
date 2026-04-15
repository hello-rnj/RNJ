FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm pkg delete "devDependencies.@tailwindcss/oxide-win32-x64-msvc" && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
