FROM node:18

# Navigate to directory
WORKDIR /backend

# Install dependancies
COPY package*.json ./
RUN npm install

# 4. Copy code
COPY . .

# 5. Compile
RUN npm run build

# 6. Application port
EXPOSE 3000

# 7. Start the server
CMD ["npm", "run", "start"]