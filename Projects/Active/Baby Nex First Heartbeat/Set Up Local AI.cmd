@echo off
setlocal DisableDelayedExpansion
if defined FDG_NEX_CONSOLE_READY goto nex_body
set "FDG_NEX_CONSOLE_READY=1"
"%ComSpec%" /d /v:off /k call "%~f0" %*
exit /b
:nex_body
set PYTHONUTF8=1
where ollama >nul 2>&1
if errorlevel 1 (
  echo Install Ollama for Windows from https://ollama.com/download/windows
  echo Or run: winget install --exact --id Ollama.Ollama
  echo Then start Ollama and run this file again.
  pause
  exit /b 1
)
echo Downloading qwen2.5:3b for local conversation. This uses about 2 GB of disk.
echo If your computer already has another model, cancel and use /models inside Nex.
ollama pull qwen2.5:3b
if errorlevel 1 (
  echo Model download failed. Existing Nex files were not changed.
  pause
  exit /b 1
)
echo Open Start Nex.cmd, then type: /model qwen2.5:3b
pause
