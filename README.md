# ImageGoNord - Self-Hosted & Cleaned Edition

![ImageGoNord Logo](src/ign-frontend/src/assets/logo-64.png)

This is a modified, privacy-focused, and resource-optimized fork of the original ImageGoNord project. It is designed specifically for **self-hosting** on personal servers, NAS devices, or VPS instances (even with lower specs).

> **Note:** This version removes all tracking, ads, and external dependencies to ensure a strictly local and private experience.

## ✨ Key Features & Improvements

* **🚀 Stability First:** Backend configured with `workers=1` and increased timeouts (`300s`) to prevent OOM (Out of Memory) crashes on AI tasks, making it stable on older CPUs (e.g., i3) or limited RAM.
* **🧹 Privacy & Clean UI:** * Removed Google Analytics, Facebook/Twitter pixels, and "Product Hunt" banners.
    * Removed "Donate" popups and broken external links.
    * Fixed Mobile Menu and Dark Mode toggles.
* **💾 Better UX:** * Added a **"New Image"** button to restart the process easily.
    * Fixed download links to include timestamps (no more overwriting filenames).
    * Improved Palette selection logic on the "ImageGoWild" page.
* **🐳 Docker Ready:** Pre-built images available on Docker Hub. No compilation needed.

---

## 🛠️ Quick Start (Recommended)

You don't need to clone the code or build anything. Just use **Docker Compose**.

1.  Create a file named `docker-compose.yml`.
2.  Paste the following configuration:

```yaml
services:
  # 1. FRONTEND (Weboldal)
  ign-frontend:
    image: megvadulthangya/ign-frontend:latest
    container_name: ign-frontend-custom
    ports:
      - "8085:80" # Access at http://localhost:8085
    depends_on:
      - ign-api-custom
    labels:
      - "com.centurylinklabs.watchtower.enable=false"
    restart: unless-stopped

  # 2. API (Webszerver - Csak a kéréseket fogadja)
  ign-api-custom:
    image: megvadulthangya/ign-api:latest
    container_name: ign-api-custom
    environment:
      - REDISTOGO_URL=redis://ign-redis-custom:6379/0 
    depends_on:
      - ign-redis-custom
    labels:
      - "com.centurylinklabs.watchtower.enable=false"
    restart: unless-stopped

  # 3. WORKER (Háttérmunkás - Ez végzi az AI számítást!)
  ign-worker-custom:
    image: megvadulthangya/ign-api:latest  # Ugyanazt a képet használja, mint az API
    container_name: ign-worker-custom
    # FONTOS: Felülírjuk az indító parancsot a workerre
    command: /app/run-worker.sh 
    environment:
      - REDISTOGO_URL=redis://ign-redis-custom:6379/0 
    depends_on:
      - ign-redis-custom
    labels:
      - "com.centurylinklabs.watchtower.enable=false"
    # Újraindítási politika stabilitáshoz
    deploy:
      restart_policy:
        condition: on-failure
        delay: 5s
    restart: unless-stopped 

  # 4. ADATBÁZIS
  ign-redis-custom:
    image: valkey/valkey:alpine
    container_name: ign-redis-custom
    restart: unless-stopped

networks:
  default:
    driver: bridge
````

3.  Run the stack:
    ```bash
    docker-compose up -d
    ```
4.  Open **http://localhost:8085** in your browser.

-----

## 🏗️ Building from Source

If you want to modify the code and build it yourself:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/megvadulthangya/ImageGoNord-Web.git](https://github.com/megvadulthangya/ImageGoNord-Web.git)
    cd ImageGoNord-Web
    ```

2.  **Build and Run:**

    ```bash
    docker-compose up -d --build
    ```

## 📂 Project Structure

  * `src/ign-frontend`: Vue.js frontend (Nginx).
  * `src/ign-api`: Python Flask API (Gunicorn + RQ).
  * `docker-compose.yml`: Main configuration file.

## 🔗 Credits

Based on the original work of [ImageGoNord](https://github.com/Schroedinger-Hat/ImageGoNord-Web).
All original licenses apply.

```
