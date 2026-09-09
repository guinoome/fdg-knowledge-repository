[CmdletBinding()]
param(
    [string]$AuditScriptPath = (Join-Path $PSScriptRoot 'Invoke-FDGRepositoryAudit.ps1'),
    [string]$FixtureParent = [IO.Path]::GetTempPath()
)

# Generates only an isolated fixture and retains it for inspection; never changes a real vault.
$ErrorActionPreference = 'Stop'
$auditScript = (Resolve-Path -LiteralPath $AuditScriptPath).Path
$fixtureBase = Join-Path $FixtureParent ('fdg-audit-fixture-' + [guid]::NewGuid().ToString('N'))
$repo = Join-Path $fixtureBase 'repository'
$output = Join-Path $fixtureBase 'output'
[IO.Directory]::CreateDirectory($repo) | Out-Null

$fixtures = [ordered]@{
    'Board.md' = '# Board'
    'System.md' = '# System'
    'Release.v1.md' = '# Release.v1'
    'Plan(v1).md' = '# Plan(v1)'
    'Plan (review).md' = '# Plan (review)'
    'Other/Shared.md' = '# Other shared note'
    'Other/Global.md' = '# Other global note'
    'Local/Shared.md' = '# Local shared note'
    'Local/Global.md' = '# Local global note'
    'Local/child/Leaf.md' = '# Leaf'
    'Local/Source.md' = @'
[[Board]]
[[System]]
[[Board.md]]
| Link |
| --- |
| [[System\|Table alias]] |
[[../Board]]
[[./child/Leaf]]
[[child/Leaf]]
[[Local/child/Leaf]]
[[Shared]]
[[Release.v1]]
[[Plan(v1)]]
[[Missing note]]
[dot](../Release.v1.md)
[parenthesis](../Plan(v1).md)
[escaped](../Plan\(v1\).md)
[space](<../Plan (review).md>)
[title](../Board.md "Board title")
[absent](../absent.md)
```markdown
[[fenced missing]]
[fenced](../fenced-absent.md)
```
~~~markdown
[[tilde fenced missing]]
~~~
````markdown
```
[[long fence missing]]
```
````
'@
    'Observer/Source.md' = '[[Global]]'
    'Nested/node_modules/ignored.md' = '[[Dependency missing]]'
    'Nested/.git/ignored.md' = '[[Git missing]]'
    'Nested/.obsidian/plugins/plugin/ignored.md' = '[[Plugin missing]]'
    'Nested/.obsidian/themes/ignored.md' = '[[Theme missing]]'
}
foreach ($entry in $fixtures.GetEnumerator()) {
    $path = Join-Path $repo $entry.Key
    [IO.Directory]::CreateDirectory((Split-Path -Parent $path)) | Out-Null
    [IO.File]::WriteAllText($path, $entry.Value, [Text.UTF8Encoding]::new($false))
}

# Local fixture history makes the existing Git summary interface testable without a network.
git -C $repo init --quiet --initial-branch=main
if ($LASTEXITCODE -ne 0) { throw 'Fixture git init failed.' }
git -C $repo -c user.name=FDGAuditFixture -c user.email=fixture@example.invalid -c commit.gpgsign=false -c core.hooksPath=NUL commit --quiet --allow-empty -m 'Fixture baseline'
if ($LASTEXITCODE -ne 0) { throw 'Fixture git commit failed.' }
git -C $repo update-ref refs/remotes/origin/main HEAD
if ($LASTEXITCODE -ne 0) { throw 'Fixture git remote reference failed.' }

$result = & $auditScript -RepositoryRoot $repo -OutputDirectory $output
$summary = ($result -join "`n") | ConvertFrom-Json
$wiki = @(Import-Csv -LiteralPath (Join-Path $output 'wiki-links.csv'))
$markdown = @(Import-Csv -LiteralPath (Join-Path $output 'markdown-links.csv'))
$checks = 0
function Assert-Equal($Actual, $Expected, [string]$Label) {
    if ($Actual -cne $Expected) { throw "$Label expected [$Expected], got [$Actual]. Fixture: $fixtureBase" }
    $script:checks++
}
function Assert-Wiki([string]$Source, [string]$Target, [string]$Status, [string]$Matches, [int]$Count = 1) {
    $links = @($wiki | Where-Object { $_.source -eq $Source -and $_.target -eq $Target })
    Assert-Equal $links.Count $Count "Wiki row $Source -> $Target"
    foreach ($link in $links) {
        Assert-Equal $link.status $Status "Wiki status $Target"
        Assert-Equal $link.matches $Matches "Wiki resolution $Target"
    }
}
Assert-Wiki 'Local/Source.md' 'Board' 'OK' 'Board.md'
Assert-Wiki 'Local/Source.md' 'System' 'OK' 'System.md' 2
Assert-Wiki 'Local/Source.md' 'Board.md' 'OK' 'Board.md'
Assert-Equal @($wiki | Where-Object { $_.target -eq 'System' }).Count 2 'Escaped table alias resolves same note'
Assert-Wiki 'Local/Source.md' '../Board' 'OK' 'Board.md'
Assert-Wiki 'Local/Source.md' './child/Leaf' 'OK' 'Local/child/Leaf.md'
Assert-Wiki 'Local/Source.md' 'child/Leaf' 'OK' 'Local/child/Leaf.md'
Assert-Wiki 'Local/Source.md' 'Local/child/Leaf' 'OK' 'Local/child/Leaf.md'
Assert-Wiki 'Local/Source.md' 'Shared' 'OK' 'Local/Shared.md'
Assert-Wiki 'Local/Source.md' 'Release.v1' 'OK' 'Release.v1.md'
Assert-Wiki 'Local/Source.md' 'Plan(v1)' 'OK' 'Plan(v1).md'
Assert-Wiki 'Local/Source.md' 'Missing note' 'BROKEN' ''
Assert-Wiki 'Observer/Source.md' 'Global' 'AMBIGUOUS' 'Local/Global.md | Other/Global.md'
Assert-Equal $summary.markdown 12 'Nested dependency, Git, plugin and theme directories pruned'
Assert-Equal $summary.wiki_links 13 'Fenced wiki examples excluded'
Assert-Equal $summary.broken_wiki_links 1 'Only actual missing wiki target is broken'
Assert-Equal $summary.ambiguous_wiki_links 1 'Only global duplicate is ambiguous'
Assert-Equal $summary.markdown_links 6 'Markdown links and fenced exclusion'
Assert-Equal $summary.broken_markdown_links 1 'Only actual missing Markdown target is broken'
Assert-Equal @($markdown | Where-Object status -eq 'OK').Count 5 'Dotted, parentheses, angle brackets, escaped path and title destinations'
Assert-Equal ($markdown | Where-Object status -eq 'BROKEN').target '../absent.md' 'Actual missing Markdown destination'
$passOutput = Join-Path $fixtureBase 'must-not-be-created'
$pass = @(& $auditScript -RepositoryRoot $repo -OutputDirectory $passOutput -PassThruOnly)
Assert-Equal (Test-Path -LiteralPath $passOutput) $false 'PassThruOnly does not create output directory'
foreach ($marker in @('DUPLICATE_IDS', 'BROKEN_WIKI_LINKS', 'AMBIGUOUS_WIKI_LINKS', 'BROKEN_MARKDOWN_LINKS')) {
    Assert-Equal ($marker -in $pass) $true "PassThruOnly marker $marker"
}
[pscustomobject]@{ result='PASS'; assertions=$checks; fixture=$fixtureBase; audit_script=$auditScript } | ConvertTo-Json
