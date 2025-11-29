#!/bin/bash

echo "🚀 [Launcher] Starting Infinite Worker Loop..."

while true; do
    echo "🔄 [Worker] Starting python worker..."
    
    # Elindítjuk a workert
    python worker.py
    
    # Ha a python folyamat kilép (mert kész, vagy mert meghalt), ide jutunk
    EXIT_CODE=$?
    echo "⚠️ [Worker] Stopped/Crashed with exit code: $EXIT_CODE. Restarting in 2 seconds..."
    
    # Várunk kicsit, hogy ne pörgesse szét a CPU-t hiba esetén
    sleep 2
done