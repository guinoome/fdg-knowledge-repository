@echo off
setlocal DisableDelayedExpansion
set PYTHONUTF8=1
py -3 -c "import sys; assert sys.version_info.major == 3 and sys.version_info.minor in range(10,100)" >nul 2>&1
if errorlevel 1 (
  echo Python 3.10 or later with the Python launcher is needed.
  echo Install Python from https://www.python.org/downloads/windows/ then run this file again.
  echo If using winget: winget install --exact --id Python.Python.3.12
  pause
  exit /b 1
)
py -3 -B "%~dp0install.py"
pause
