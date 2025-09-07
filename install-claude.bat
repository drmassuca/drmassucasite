@echo off
echo ===============================================
echo 🚀 MIGRACAO GEMINI PARA CLAUDE - INSTALACAO
echo ===============================================
echo.

echo 📦 Instalando dependencias do backend...
cd backend
if exist package.json (
    npm install
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Backend dependencies instaladas com sucesso!
    ) else (
        echo ❌ Erro ao instalar dependencias do backend
        pause
        exit /b 1
    )
) else (
    echo ❌ package.json nao encontrado na pasta backend
    pause
    exit /b 1
)

echo.
echo 📦 Verificando dependencias do frontend...
cd ..
npm install
if %ERRORLEVEL% EQU 0 (
    echo ✅ Frontend dependencies verificadas!
) else (
    echo ❌ Erro ao verificar dependencias do frontend
    pause
    exit /b 1
)

echo.
echo ===============================================
echo ✅ INSTALACAO CONCLUIDA COM SUCESSO!
echo ===============================================
echo.
echo 🎯 PROXIMOS PASSOS:
echo.
echo 1. Abra 2 terminais:
echo.
echo    Terminal 1 (Backend):
echo    cd backend
echo    npm run dev
echo.
echo    Terminal 2 (Frontend):  
echo    npm run dev
echo.
echo 2. Acesse: http://localhost:3000
echo.
echo ===============================================
pause