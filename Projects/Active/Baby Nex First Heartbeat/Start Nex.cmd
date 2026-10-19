@echo off
setlocal DisableDelayedExpansion
if defined FDG_NEX_CONSOLE_READY goto nex_body
set "FDG_NEX_CONSOLE_READY=1"
"%ComSpec%" /d /v:off /k call "%~f0" %*
exit /b
:nex_body
set PYTHONUTF8=1
if not exist "%LOCALAPPDATA%\FDG\Nex\config.json" (
  echo Run Install Nex.cmd first.
  pause
  exit /b 1
)
py -3 -B "%LOCALAPPDATA%\FDG\Nex\start_nex.py"
if errorlevel 1 pause
