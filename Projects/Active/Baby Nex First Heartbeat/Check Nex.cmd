@echo off
setlocal DisableDelayedExpansion
set PYTHONUTF8=1
py -3 -B "%LOCALAPPDATA%\FDG\Nex\start_nex.py" --doctor
echo.
echo Conversation readiness requires a running Ollama model selected inside Nex.
echo Report: %LOCALAPPDATA%\FDG\Nex\readiness.json
pause
