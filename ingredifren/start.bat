@echo off
echo Starting IngrediFren Web Application...
echo.
echo Available options:
echo 1. Python HTTP Server (Port 8000)
echo 2. PHP Development Server (Port 8000) 
echo 3. Node.js Serve (Port 3000)
echo 4. Open in browser only
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo Starting Python HTTP Server on http://localhost:8000
    echo Press Ctrl+C to stop the server
    python -m http.server 8000
    goto end
)

if "%choice%"=="2" (
    echo Starting PHP Development Server on http://localhost:8000
    echo Press Ctrl+C to stop the server
    php -S localhost:8000
    goto end
)

if "%choice%"=="3" (
    echo Installing and starting Node.js serve...
    npx serve . -p 3000
    goto end
)

if "%choice%"=="4" (
    echo Opening IngrediFren in default browser...
    start index.html
    goto end
)

echo Invalid choice. Opening in browser...
start index.html

:end
echo.
echo Thank you for using IngrediFren!
pause