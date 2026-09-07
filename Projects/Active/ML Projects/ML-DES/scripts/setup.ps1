# PowerShell setup script for Windows
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
Write-Host "Setup complete. Activate the venv with: .\venv\Scripts\Activate.ps1"
