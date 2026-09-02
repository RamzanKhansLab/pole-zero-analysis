@echo off
cd /d "%~dp0"
echo Starting Universal Filter Designer...
echo.
echo Open http://localhost:3000 in your browser
echo.
node node_modules/vite/bin/vite.js --port 3000 --host 127.0.0.1
