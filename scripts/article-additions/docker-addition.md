## Docker vs Virtual Machine — Detailed Comparison

जब भी Docker सीखना शुरू करते हो, यह सवाल ज़रूर आता है — "Bhai VM se alag kya hai isko?" चलो एकदम clearly समझते हैं।

| Feature | Docker (Container) | Virtual Machine |
|---|---|---|
| **Boot Time** | 1–3 seconds | 30–60 seconds |
| **Memory Usage** | 50–200 MB | 512 MB – 2 GB+ |
| **OS** | Host OS share करता है | पूरा OS अलग होता है |
| **Isolation** | Process-level | Hardware-level (strong) |
| **Portability** | बहुत high | कम portable |
| **Performance** | Near-native | 5–15% overhead |
| **Use Case** | Microservices, CI/CD, dev env | Legacy apps, full OS isolation |
| **Startup Cost** | कम | ज़्यादा |

### कब क्या Use करें?

- **Docker:** Modern web apps, APIs, development environments, cloud deployments
- **VM:** Windows पर Linux चलानी हो, banking software जिसे hard isolation चाहिए

---

## Image Size कम करो — Multi-stage Builds

Docker image बड़ी होने से deployment slow होती है, storage waste होती है, और pull time बढ़ता है। **Multi-stage builds** इसका सबसे smart solution है।

### बिना Multi-stage के (Bad Practice)

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

यह image आसानी से **900 MB+** हो जाती है — node_modules, build tools, सब कुछ अंदर।

### Multi-stage Build (Recommended)

```dockerfile
# Stage 1 — Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2 — Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Result क्या मिलता है?

| Approach | Image Size |
|---|---|
| Normal Build | ~900 MB |
| Alpine Base | ~350 MB |
| Multi-stage + Alpine | **~120 MB** |

Final image में सिर्फ वही जाता है जो runtime पर चाहिए — build tools, dev dependencies — सब छूट जाते हैं।

---

## Docker Desktop Windows पर Setup — Step by Step

### Prerequisites

1. **WSL2 Enable करो** — यह सबसे पहला step है

```powershell
# PowerShell को Admin में चलाओ
wsl --install
wsl --set-default-version 2
```

Restart लो machine को।

2. **Docker Desktop Download करो**
   - [docker.com/products/docker-desktop](https://docker.com/products/docker-desktop) पर जाओ
   - Windows installer download करो

3. **Install करते समय** — "Use WSL 2 instead of Hyper-V" option select रहने दो ✅

4. **Verify करो** — Installation के बाद terminal में:

```bash
docker --version
docker run hello-world
```

अगर `Hello from Docker!` message आए — setup complete! 🎉

### Common WSL2 Issue

अगर `WSL 2 installation is incomplete` error आए, तो:

```powershell
# Kernel update package install करो
# Microsoft की official link से: aka.ms/wsl2kernel
wsl --update
```

---

## Common Docker Errors और Fixes

### Error 1: Port Already in Use

```
Error: bind: address already in use 0.0.0.0:3000
```

**Fix:**
```bash
# कौन सा process port use कर रहा है देखो
netstat -ano | findstr :3000     # Windows
lsof -i :3000                    # Linux/Mac

# उस container को stop करो
docker ps
docker stop <container_id>
```

---

### Error 2: Permission Denied

```
Got permission denied while trying to connect to Docker daemon
```

**Fix (Linux):**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

Windows पर यह error आए तो Docker Desktop को **Admin** से run करो।

---

### Error 3: Image Not Found

```
Unable to find image 'myapp:latest' locally
```

**Fix:**
```bash
# Image list check करो
docker images

# DockerHub से pull करो
docker pull nginx:latest

# खुद build किया है तो correct tag लगाओ
docker build -t myapp:latest .
```

---

### Error 4: Container Exits Immediately

**Fix:** Background में चलाओ और logs देखो:

```bash
docker run -d --name mycontainer myapp
docker logs mycontainer
```

> **Pro Tip:** `docker logs -f <container_name>` से real-time logs देख सकते हो — debugging बहुत आसान हो जाती है।

इन errors को एक बार समझ लो — Docker journey 80% smooth हो जाएगी।
