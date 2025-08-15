@echo off
echo ========================================
echo    WhatsApp Backend - Inicializador
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js de https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ERRO: Falha ao instalar dependencias!
        pause
        exit /b 1
    )
    echo Dependencias instaladas com sucesso!
) else (
    echo Dependencias ja estao instaladas.
)

echo.
echo Iniciando servidor WhatsApp Backend...
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

npm start

echo.
echo Servidor parado.
pause
