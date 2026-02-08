@echo off
echo Starting Survey App...

:: Start Backend
start "Survey App Backend" cmd /k "cd server && npm start"

:: Start Frontend
start "Survey App Frontend" cmd /k "cd client && npm run dev"

echo Servers started!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:3001
pause
