@echo off
REM =============================================================================
REM Script de Build e Deploy - Dr. Massuca Site
REM =============================================================================

echo.
echo ========================================
echo   BUILD E DEPLOY - DR. MASSUCA
echo ========================================
echo.

REM Verificar se estamos na pasta correta
if not exist "package.json" (
    echo [ERRO] package.json nao encontrado!
    echo Execute este script na raiz do projeto.
    pause
    exit /b 1
)

REM Verificar se .env existe
if not exist ".env" (
    echo [AVISO] Arquivo .env nao encontrado!
    echo Certifique-se de que a API key esta configurada.
    pause
)

echo [1/6] Limpando build anterior...
if exist "dist" (
    rmdir /s /q dist
    echo       Build anterior removido
) else (
    echo       Nenhum build anterior encontrado
)

echo.
echo [2/6] Instalando dependencias (se necessario)...
call npm install --silent
if errorlevel 1 (
    echo [ERRO] Falha ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo [3/6] Executando build de producao...
call npm run build
if errorlevel 1 (
    echo [ERRO] Falha no build!
    pause
    exit /b 1
)

echo.
echo [4/5] Verificando arquivos gerados...
if exist "dist\index.html" (
    echo       index.html ..................... OK
) else (
    echo [ERRO] index.html nao foi gerado!
    pause
    exit /b 1
)

if exist "dist\assets" (
    echo       pasta assets/ ................. OK
) else (
    echo [ERRO] pasta assets/ nao foi gerada!
    pause
    exit /b 1
)

echo.
echo [5/5] Calculando tamanho do build...
for /f "tokens=3" %%a in ('dir /s "dist" ^| find "File(s)"') do set size=%%a
echo       Tamanho total: %size% bytes

echo.
echo ========================================
echo   BUILD CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Proximos passos:
echo.
echo 1. Teste localmente:
echo    npm run preview
echo.
echo 2. Acesse a Hostinger:
echo    https://hpanel.hostinger.com
echo.
echo 3. Va em "Gerenciador de Arquivos"
echo.
echo 4. Navegue ate: public_html/
echo.
echo 5. Delete arquivos antigos (faca backup antes!)
echo.
echo 6. Upload de TODOS os arquivos da pasta 'dist'
echo.
echo 7. Verifique: https://drmassuca.com.br
echo.
echo ========================================

echo.
echo Deseja abrir a pasta 'dist' agora? (S/N)
set /p choice=

if /i "%choice%"=="S" (
    start explorer "dist"
)

echo.
echo Deseja testar o build localmente agora? (S/N)
set /p choice2=

if /i "%choice2%"=="S" (
    echo.
    echo Iniciando preview local...
    echo Acesse: http://localhost:4173
    echo Pressione Ctrl+C para parar
    echo.
    call npm run preview
)

echo.
pause
