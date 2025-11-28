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
version: '3.8'

services:
  # 1. FRONTEND
  ign-frontend:
    image: megvadulthangya/ign-frontend:latest
    container_name: ign-frontend
    ports:
      - "8085:80" # Access at http://localhost:8085
    depends_on:
      - ign-api
    # Disable auto-update to keep stability
    labels:
      - "com.centurylinklabs.watchtower.enable=false"
    restart: unless-stopped

  # 2. BACKEND (API)
  ign-api:
    image: megvadulthangya/ign-api:latest
    container_name: ign-api
    environment:
      - REDISTOGO_URL=redis://ign-redis:6379/0 
    depends_on:
      - ign-redis
    labels:
      - "com.centurylinklabs.watchtower.enable=false"
    restart: unless-stopped

  # 3. DATABASE
  ign-redis:
    image: valkey/valkey:alpine
    container_name: ign-redis
    restart: unless-stopped

networks:
  default:
    driver: bridge
