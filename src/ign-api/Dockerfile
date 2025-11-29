FROM python:3.9-slim

# Git és alapvető eszközök telepítése (szükséges lehet a függőségekhez)
RUN apt-get update && apt-get install -y cron git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1. Függőségek telepítése (ImageGoNord NÉLKÜL - azt vedd ki a txt-ből!)
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 2. A SPECIÁLIS TELEPÍTÉS (Ez a lényeg!)
# Közvetlenül a v0.1.6 ZIP-et töltjük le és telepítjük
RUN pip install --no-cache-dir https://github.com/Schroedinger-Hat/ImageGoNord-pip/archive/refs/tags/v0.1.6.zip

# Gunicorn telepítése (ha nem lenne benne a requirements-ben, de benne van)
RUN pip install gunicorn

COPY . .
RUN chmod +x /app/run-worker.sh

COPY crontab /etc/cron.d/my-cron-job
RUN chmod 0644 /etc/cron.d/my-cron-job
RUN crontab /etc/cron.d/my-cron-job
RUN touch /var/log/cron.log

EXPOSE 8000

# Worker beállítás: 1 munkás, nagy timeout (stabilitás)
CMD gunicorn --workers 1 --timeout 600 -b 0.0.0.0:8000 wsgi:app