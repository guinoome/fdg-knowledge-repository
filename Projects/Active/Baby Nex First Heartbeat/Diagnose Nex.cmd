@echo off
setlocal DisableDelayedExpansion
if defined FDG_NEX_CONSOLE_READY goto nex_body
set "FDG_NEX_CONSOLE_READY=1"
"%ComSpec%" /d /v:off /k call "%~f0" %*
exit /b
:nex_body
set PYTHONUTF8=1
echo Nex startup diagnostics
echo.
echo Checking the Python launcher:
where py
py -3 --version
if errorlevel 1 goto no_python
py -3 -B "%~dp0diagnose.py"
goto finished
:no_python
echo.
echo Python could not run through the Windows Python launcher.
echo Install Python 3.10 or later from https://www.python.org/downloads/windows/
echo Include the Python launcher, then run Install Nex.cmd again.
:finished
echo.
echo Keep this window open and send a screenshot of the output above.
echo Type exit when you want to close it.
