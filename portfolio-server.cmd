@echo off
cd /d "%~dp0"
"%~dp0node-runtime.exe" "%~dp0node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 3000 --strictPort
