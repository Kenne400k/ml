#!/bin/bash

while true; do
    npm start -nodaemon
    echo "Application crashed. Restarting..."
    sleep 1
done

