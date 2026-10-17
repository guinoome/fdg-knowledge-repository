@echo off
setlocal DisableDelayedExpansion
set PYTHONUTF8=1
if not exist "%LOCALAPPDATA%\FDG\Nex\config.json" (
  echo Run Install Nex.cmd first.
  pause
  exit /b 1
)
py -3 -B "%LOCALAPPDATA%\FDG\Nex\start_nex.py"
if errorlevel 1 pause
