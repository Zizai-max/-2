@echo off
cd /d "%~dp0"
start "" /min "%~dp0node-runtime.exe" "%~dp0node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 3000 --strictPort
ping 127.0.0.1 -n 4 >nul
start "" "http://127.0.0.1:3000/"
exit /b 0
