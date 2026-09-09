[CmdletBinding()]
param(
    [string]$RepositoryRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$OutputDirectory = "docs/audits/2026-08-29-pre-github-baseline",
    [switch]$PassThruOnly
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath $RepositoryRoot).Path
$auditOutputPath = if ([IO.Path]::IsPathRooted($OutputDirectory)) { $OutputDirectory } else { Join-Path $root $OutputDirectory }
if (-not $PassThruOnly) { [IO.Directory]::CreateDirectory($auditOutputPath) | Out-Null }

function Relative([string]$path) {
    [IO.Path]::GetRelativePath($root, $path).Replace('\', '/')
}

$files = [Collections.Generic.List[IO.FileInfo]]::new()
$directories = [Collections.Generic.List[IO.DirectoryInfo]]::new()
$pending = [Collections.Generic.Stack[IO.DirectoryInfo]]::new()
$pending.Push((Get-Item -LiteralPath $root))
while ($pending.Count -gt 0) {
    foreach ($item in (Get-ChildItem -LiteralPath $pending.Pop().FullName -Force)) {
        if ($item.PSIsContainer) {
            # Prune before entering nested repositories, dependencies or plugin trees.
            if ($item.Name -in @('.git', 'node_modules') -or
                ($item.Parent.Name -eq '.obsidian' -and $item.Name -in @('plugins', 'themes')) -or
                ($item.Attributes -band [IO.FileAttributes]::ReparsePoint)) { continue }
            $directories.Add($item)
            $pending.Push($item)
        } else { $files.Add($item) }
    }
}
$markdown = @($files | Where-Object Extension -eq '.md')

$inventory = foreach ($group in ($files | Group-Object { (Relative $_.FullName -split '/')[0] } | Sort-Object Name)) {
    [pscustomobject]@{
        top_level = $group.Name
        files = $group.Count
        markdown = @($group.Group | Where-Object Extension -eq '.md').Count
        other = @($group.Group | Where-Object Extension -ne '.md').Count
        bytes = ($group.Group | Measure-Object Length -Sum).Sum
    }
}
if (-not $PassThruOnly) { $inventory | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'repository-inventory.csv') -NoTypeInformation -Encoding utf8 }

$duplicateNames = $files | Group-Object Name | Where-Object Count -gt 1 | ForEach-Object {
    [pscustomobject]@{ name=$_.Name; count=$_.Count; paths=(($_.Group | ForEach-Object { Relative $_.FullName }) -join ' | ') }
}
if (-not $PassThruOnly) { $duplicateNames | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'duplicate-filenames.csv') -NoTypeInformation -Encoding utf8 }

$ids = foreach ($file in $markdown) {
    $text = [string](Get-Content -LiteralPath $file.FullName -Raw)
    foreach ($match in [regex]::Matches($text, '(?im)^\s*(?:[-*]\s*)?\*{0,2}Document ID\*{0,2}\s*:\s*`?([^`\r\n]+)')) {
        [pscustomobject]@{ id=$match.Groups[1].Value.Trim(); path=Relative $file.FullName }
    }
}
if (-not $PassThruOnly) { $ids | Sort-Object id,path | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'id-registry.csv') -NoTypeInformation -Encoding utf8 }
$duplicateIds = @($ids | Group-Object id | Where-Object Count -gt 1 | ForEach-Object {
    [pscustomobject]@{ id=$_.Name; count=$_.Count; paths=(($_.Group.path) -join ' | ') }
})
if (-not $PassThruOnly) { $duplicateIds | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'duplicate-ids.csv') -NoTypeInformation -Encoding utf8 }

$required = @('Document ID','Version','Status','Owner','Approver','Related Documents')
$metadata = foreach ($file in $markdown) {
    $text = [string](Get-Content -LiteralPath $file.FullName -Raw)
    $present = @($required | Where-Object { $text -match "(?im)^\s*(?:[-*]\s*)?\*{0,2}$([regex]::Escape($_))\*{0,2}\s*:" })
    [pscustomobject]@{ path=Relative $file.FullName; required_present=$present.Count; required_total=$required.Count; missing=(($required | Where-Object { $_ -notin $present }) -join ' | ') }
}
if (-not $PassThruOnly) { $metadata | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'metadata-coverage.csv') -NoTypeInformation -Encoding utf8 }

$byPath = @{}
$byName = @{}
foreach ($file in $files) {
    $rel = Relative $file.FullName
    $byPath[$rel] = $rel
    if (-not $byName.ContainsKey($file.Name)) { $byName[$file.Name] = [Collections.Generic.List[string]]::new() }
    $byName[$file.Name].Add($rel)
}

function Without-FencedCode([string]$text) {
    $fenceCharacter = $null
    $fenceLength = 0
    foreach ($line in ($text -split '\r?\n')) {
        $fence = [regex]::Match($line, '^ {0,3}(`{3,}|~{3,})(.*)$')
        if ($null -eq $fenceCharacter) {
            if ($fence.Success -and -not ($fence.Groups[1].Value[0] -eq '`' -and $fence.Groups[2].Value.Contains('`'))) {
                $fenceCharacter = $fence.Groups[1].Value[0]
                $fenceLength = $fence.Groups[1].Length
                ''
            } else { $line }
        } else {
            if ($fence.Success -and $fence.Groups[1].Value[0] -eq $fenceCharacter -and
                $fence.Groups[1].Length -ge $fenceLength -and -not $fence.Groups[2].Value.Trim()) {
                $fenceCharacter = $null
            }
            ''
        }
    }
}

function Wiki-Matches([string]$target, [IO.FileInfo]$sourceFile) {
    # A dot may belong to a note name. Only an actual .md suffix is an extension here.
    $candidates = @($target)
    if (-not $target.EndsWith('.md', [StringComparison]::OrdinalIgnoreCase)) { $candidates += "$target.md" }
    $sourceDirectory = Relative $sourceFile.DirectoryName
    if ($target.Contains('/')) {
        $bases = if ($target -match '^\.\.?/') { @($sourceFile.DirectoryName) } else { @($root, $sourceFile.DirectoryName) }
        foreach ($base in $bases) {
            foreach ($candidate in $candidates) {
                try { $rel = Relative ([IO.Path]::GetFullPath((Join-Path $base $candidate))) } catch { continue }
                if ($byPath.ContainsKey($rel)) { return $byPath[$rel] }
            }
        }
        return
    }
    # Obsidian can resolve a same-folder note despite duplicate basenames elsewhere.
    foreach ($candidate in $candidates) {
        $local = if ($sourceDirectory -eq '.') { $candidate } else { "$sourceDirectory/$candidate" }
        if ($byPath.ContainsKey($local)) { return $byPath[$local] }
    }
    foreach ($candidate in $candidates) {
        if ($byName.ContainsKey($candidate)) { return $byName[$candidate] | Sort-Object }
    }
}
$wikiLinks = [Collections.Generic.List[object]]::new()
$markdownLinks = [Collections.Generic.List[object]]::new()
foreach ($file in $markdown) {
    $text = (Without-FencedCode ([string](Get-Content -LiteralPath $file.FullName -Raw))) -join "`n"
    $source = Relative $file.FullName
    foreach ($match in [regex]::Matches($text, '!??\[\[([^\]]+)\]\]')) {
        $raw = $match.Groups[1].Value
        $target = (($raw -split '\\?\|',2)[0] -split '#',2)[0].Trim().Replace('\','/')
        if (-not $target) { continue }
        $matches = @(Wiki-Matches $target $file)
        $status = if ($matches.Count -eq 0) {'BROKEN'} elseif ($matches.Count -gt 1) {'AMBIGUOUS'} else {'OK'}
        $wikiLinks.Add([pscustomobject]@{ source=$source; target=$target; status=$status; matches=(($matches | ForEach-Object { if ($_ -is [IO.FileInfo]) { Relative $_.FullName } else { $_ } }) -join ' | ') })
    }
    # Balancing groups retain parentheses inside a destination; angle brackets allow spaces.
    $markdownPattern = '(?<!\!)\[[^\]\r\n]*\]\(\s*(?<destination><[^>\r\n]+>|(?:\\.|[^\s()\\]|\((?<paren>)|\)(?<-paren>))+)(?(paren)(?!))(?:\s+(?:"[^"]*"|''[^'']*''))?\s*\)'
    foreach ($match in [regex]::Matches($text, $markdownPattern)) {
        $raw = $match.Groups['destination'].Value.Trim().Trim('<','>')
        if ($raw -match '^(https?|mailto|obsidian|data|tel|ftp):' -or $raw.StartsWith('#')) { continue }
        $pathPart = [uri]::UnescapeDataString(($raw -split '#',2)[0]) -replace '\\([() ])', '$1'
        $pathPart = $pathPart.Replace('\','/')
        $resolved = [IO.Path]::GetFullPath((Join-Path $file.DirectoryName $pathPart))
        $status = if (Test-Path -LiteralPath $resolved) {'OK'} else {'BROKEN'}
        $markdownLinks.Add([pscustomobject]@{ source=$source; target=$raw; status=$status; resolved=(Relative $resolved) })
    }
}
if (-not $PassThruOnly) {
    $wikiLinks | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'wiki-links.csv') -NoTypeInformation -Encoding utf8
    $markdownLinks | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'markdown-links.csv') -NoTypeInformation -Encoding utf8
}

$inbound = @{}
foreach ($link in $wikiLinks | Where-Object status -eq 'OK') {
    foreach ($match in ($link.matches -split ' \| ')) { $inbound[$match.ToLowerInvariant()] = 1 + ($inbound[$match.ToLowerInvariant()] ?? 0) }
}
$orphans = foreach ($file in $markdown) {
    $rel = Relative $file.FullName
    if (-not $inbound.ContainsKey($rel.ToLowerInvariant())) { [pscustomobject]@{ path=$rel } }
}
if (-not $PassThruOnly) { $orphans | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'markdown-without-wiki-inlinks.csv') -NoTypeInformation -Encoding utf8 }

$emptyDirs = $directories | Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force -ErrorAction SilentlyContinue) } | ForEach-Object { [pscustomobject]@{ path=Relative $_.FullName } }
if (-not $PassThruOnly) { $emptyDirs | Export-Csv -LiteralPath (Join-Path $auditOutputPath 'empty-directories.csv') -NoTypeInformation -Encoding utf8 }

$statusLines = @(git -C $root status --porcelain=v1 -uall)
$gitState = [ordered]@{
    generated_at = (Get-Date).ToString('o')
    branch = (git -C $root branch --show-current)
    local_head = (git -C $root rev-parse HEAD)
    remote_head = (git -C $root rev-parse origin/main)
    ahead_behind = (git -C $root rev-list --left-right --count HEAD...origin/main)
    staged = @($statusLines | Where-Object { $_[0] -notin @(' ','?') }).Count
    modified = @($statusLines | Where-Object { $_.Substring(0,2) -match 'M' }).Count
    deleted = @($statusLines | Where-Object { $_.Substring(0,2) -match 'D' }).Count
    untracked = @($statusLines | Where-Object { $_.StartsWith('??') }).Count
}
$summary = [ordered]@{
    generated_at = (Get-Date).ToString('o')
    directories = $directories.Count
    files = $files.Count
    markdown = $markdown.Count
    non_markdown = @($files | Where-Object Extension -ne '.md').Count
    duplicate_filenames = @($duplicateNames).Count
    documents_with_id = @($ids | Select-Object -ExpandProperty path -Unique).Count
    duplicate_ids = $duplicateIds.Count
    complete_required_metadata = @($metadata | Where-Object required_present -eq $required.Count).Count
    wiki_links = $wikiLinks.Count
    broken_wiki_links = @($wikiLinks | Where-Object status -eq 'BROKEN').Count
    ambiguous_wiki_links = @($wikiLinks | Where-Object status -eq 'AMBIGUOUS').Count
    markdown_links = $markdownLinks.Count
    broken_markdown_links = @($markdownLinks | Where-Object status -eq 'BROKEN').Count
    markdown_without_wiki_inlinks = @($orphans).Count
    empty_directories = @($emptyDirs).Count
    git = $gitState
}
if (-not $PassThruOnly) { $summary | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $auditOutputPath 'audit-summary.json') -Encoding utf8 }
$summary | ConvertTo-Json -Depth 5
if ($PassThruOnly) {
    'DUPLICATE_IDS'
    $duplicateIds | ConvertTo-Csv -NoTypeInformation
    'BROKEN_WIKI_LINKS'
    $wikiLinks | Where-Object status -eq 'BROKEN' | Select-Object -First 100 | ConvertTo-Csv -NoTypeInformation
    'AMBIGUOUS_WIKI_LINKS'
    $wikiLinks | Where-Object status -eq 'AMBIGUOUS' | Select-Object -First 100 | ConvertTo-Csv -NoTypeInformation
    'BROKEN_MARKDOWN_LINKS'
    $markdownLinks | Where-Object status -eq 'BROKEN' | Select-Object -First 100 | ConvertTo-Csv -NoTypeInformation
}
