# Gera os PDFs dos currículos (assets/docs/*.pdf) a partir dos HTMLs desta pasta, com o Edge em modo headless.
# Uso: powershell -NoProfile -ExecutionPolicy Bypass -File "assets/docs/fonte/gerar-pdfs.ps1"
$ErrorActionPreference = 'Stop'

$edge = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") |
  Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $edge) { throw 'Microsoft Edge não encontrado.' }

$docs = Split-Path -Parent $PSScriptRoot
$sources = 'curriculo-pedro-henrique-marcelino.html', 'resume-pedro-henrique-marcelino.html'

foreach ($name in $sources) {
  $html = Join-Path $PSScriptRoot $name
  $pdf = Join-Path $docs ([IO.Path]::ChangeExtension($name, '.pdf'))
  $url = 'file:///' + ($html -replace '\\', '/' -replace ' ', '%20')
  # perfil temporário próprio: o Edge headless não se mistura com um Edge já aberto
  $profileDir = Join-Path $env:TEMP ('edge-pdf-' + [guid]::NewGuid().ToString('N'))
  $stamp = (Get-Item -LiteralPath $pdf -ErrorAction SilentlyContinue).LastWriteTimeUtc

  Start-Process -FilePath $edge -ArgumentList @(
    '--headless', '--disable-gpu', '--no-pdf-header-footer', "--user-data-dir=`"$profileDir`"",
    "`"--print-to-pdf=$pdf`"", $url
  )

  # o Edge devolve o controle antes de terminar: espera o PDF novo aparecer e parar de crescer
  $deadline = (Get-Date).AddSeconds(60)
  do {
    Start-Sleep -Milliseconds 500
    $item = Get-Item -LiteralPath $pdf -ErrorAction SilentlyContinue
  } until (($item -and $item.LastWriteTimeUtc -ne $stamp -and $item.Length -gt 0) -or (Get-Date) -gt $deadline)
  Start-Sleep -Seconds 1

  Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" |
    Where-Object { $_.CommandLine -like "*$profileDir*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

  if (-not $item -or $item.LastWriteTimeUtc -eq $stamp) { throw "Não foi possível gerar $pdf" }
  '{0}  ({1:N0} KB)' -f $pdf, ($item.Length / 1KB)
}
