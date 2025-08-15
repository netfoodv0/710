@echo off
title WhatsApp Backend Server - Auto Start
echo ========================================
echo    WhatsApp Backend Server - Auto Start
echo ========================================
echo.
echo Este script mantem o servidor rodando automaticamente
echo Se o servidor cair, ele sera reiniciado automaticamente
echo.
echo Pressione Ctrl+C para parar
echo.
cd /d "%~dp0"
node auto-start.js
pause
