FROM node:18

# Navigate to directory
WORKDIR /Swipe4Paws

# Install dependancies
RUN npm install dotenv
RUN npm install -g typescript
RUN npm install @types/dotenv --save-dev
COPY package*.json ./
RUN npm install

# 4. Copy code
COPY backend ./backend

# 5. Compile
RUN npm run build:backend

# wait for the database to be ready

# 6. Application port
EXPOSE 3000

# 7. Start the server
CMD ["npm", "run", "start:backend"]