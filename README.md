# ⚠️ DEVELOPMENT / UNSTABLE BRANCH

**🚧 WARNING: DO NOT USE THIS BRANCH FOR PRODUCTION! 🚧**

This `main` branch contains the legacy/development code which has known critical issues:
* ❌ **AI Stability Issues:** The AI generation frequently crashes with `Timeout` or `Memory Error` on standard hardware.
* ❌ **Memory Leaks:** The worker process does not handle resources correctly.
* ❌ **UI Bugs:** Contains unoptimized UI elements and broken links.

> **NOTE:** The Docker configuration in this branch is **NOT** uploaded to Docker Hub and is not maintained.

---

## ✅ WHERE IS THE GOOD VERSION?

Please switch to the **[v0.1.6-stable](../../tree/v0.1.6-stable)** branch!

The `v0.1.6-stable` branch contains:
* ✅ **Fixed AI:** Stable generation with optimized resource usage (Workers=1).
* ✅ **Clean UI:** No ads, no tracking, fixed Dark Mode & Mobile Menu.
* ✅ **Docker Hub Integration:** Ready-to-use images (`megvadulthangya/ign-frontend:latest`).

[👉 CLICK HERE TO GO TO THE STABLE VERSION](../../tree/v0.1.6-stable)
