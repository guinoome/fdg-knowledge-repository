param(
    [string]$Ref = "53cddc42e39346fb8c6d5d612281a3b1add14e66"
)

$ErrorActionPreference = "Stop"
$Upstream = "https://github.com/chaseai-yt/claudex-loop.git"
$RequiredSkills = @("claudex-loop", "claudex-route", "codex-build", "codex-review")

function Require-Command([string]$Name) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required command not found: $Name"
    }
}

Write-Host "FDG Claudex Loop bootstrap"
Write-Host "Pinned upstream ref: $Ref"

Require-Command "git"

$pythonCmd = $null
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonCmd = "py"
} else {
    throw "Python 3.10+ is required for the full Claudex Loop."
}

if ($pythonCmd -eq "py") {
    & py -3 -c "import sys; raise SystemExit(0 if sys.version_info >= (3,10) else 1)"
} else {
    & python -c "import sys; raise SystemExit(0 if sys.version_info >= (3,10) else 1)"
}
if ($LASTEXITCODE -ne 0) { throw "Python 3.10+ is required." }

$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("fdg-claudex-" + [guid]::NewGuid().ToString("N"))
try {
    New-Item -ItemType Directory -Force $tempRoot | Out-Null
    & git -C $tempRoot init -q
    & git -C $tempRoot remote add origin $Upstream
    & git -C $tempRoot fetch -q --depth 1 origin $Ref
    if ($LASTEXITCODE -ne 0) { throw "Unable to fetch pinned Claudex Loop ref $Ref" }
    & git -C $tempRoot checkout -q --detach FETCH_HEAD
    if ($LASTEXITCODE -ne 0) { throw "Unable to check out pinned Claudex Loop ref $Ref" }

    $resolved = (& git -C $tempRoot rev-parse HEAD).Trim()
    if ($resolved -ne $Ref) {
        throw "Fetched commit $resolved does not match pinned commit $Ref"
    }

    $source = Join-Path $tempRoot "skills"
    $destinations = @(
        (Join-Path $env:USERPROFILE ".agents\skills"),
        (Join-Path $env:USERPROFILE ".claude\skills")
    )

    foreach ($dest in $destinations) {
        New-Item -ItemType Directory -Force $dest | Out-Null
        foreach ($skill in $RequiredSkills) {
            $srcSkill = Join-Path $source $skill
            if (-not (Test-Path $srcSkill)) { throw "Missing upstream skill: $skill" }
            $destSkill = Join-Path $dest $skill
            if (Test-Path $destSkill) { Remove-Item -Recurse -Force $destSkill }
            Copy-Item -Recurse -Force $srcSkill $dest
        }
        Write-Host "Installed skills into $dest"
    }
}
finally {
    if (Test-Path $tempRoot) {
        Remove-Item -Recurse -Force $tempRoot
    }
}

Write-Host ""
Write-Host "Verification:"
if (Get-Command codex -ErrorAction SilentlyContinue) {
    & codex --version
    & codex login status
} else {
    Write-Warning "Codex CLI is not installed. Skills are staged, but the full loop cannot run until Codex is installed and authenticated."
}
if (Get-Command claude -ErrorAction SilentlyContinue) {
    & claude --version
    & claude auth status
} else {
    Write-Warning "Claude Code CLI is not installed. Skills are staged, but the full loop cannot run until Claude Code is installed and authenticated."
}

Write-Host ""
Write-Host "Bootstrap complete. Open a new Codex or Claude Code session so the skills are discovered."
