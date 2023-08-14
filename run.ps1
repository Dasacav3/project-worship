# Create a executable file to run the program

# Run npm as a daemon

Start-Process npm -ArgumentList "--silent", "run", "dev" -RedirectStandardOutput "nodemon.log" -RedirectStandardError "nodemon.log"

# Create a variable to read version from package.json

$version = (Get-Content package.json | ConvertFrom-Json).version

# Print a message multi-line

Write-Host "
-----------------------------------
PROJECT WORSHIP
Version: $version
-----------------------------------
"

# Remains the terminal open without close

Write-Host "Type 'exit' to close the terminal console"

# Read the user input

$read = Read-Host

# If the user type 'exit' the terminal will close

if ($read -eq "exit") {
    $portsToStop = @("4440", "5173")

    foreach ($port in $portsToStop) {
        $owningProcesses = Get-NetTCPConnection -LocalPort $port | Select-Object -ExpandProperty OwningProcess

        foreach ($processId in $owningProcesses) {
            Stop-Process -Id $processId -Force
        }
    }

    # Delete the log file
    Remove-Item nodemon.log

    # Exit the script
    exit
}
