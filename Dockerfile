# 1. Node Image
FROM node:20-alpine

# 2. App Folder
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Dependencies install kora
RUN npm install

# 5. [IMPORTANT] tsx tool-ti global vabe install kora
RUN npm install -g tsx

# 6. Project files copy kora
COPY . .

# 7. Port expose
EXPOSE 5000

# 8. Start command (tsx diye server chalu hobe)
CMD ["tsx", "src/server.ts"]
