#!/bin/bash

# Run npm as a daemon
npm run --silent dev > nodemon.log 2>&1 &

# Create a variable to read with jq the package.json file
version=$(cat package.json | jq -r '.version')

# Print a message
echo "-----------------------------------"
echo "PROJECT WORSHIP"
echo "Version: $version"
echo "-----------------------------------"

# Remains the terminal open without closing
echo "Type 'exit' to close the terminal"$'\n'

input=""

open http://localhost:5173 > /dev/null 2>&1 &

while [ "$input" != "exit" ]
do
    # Read user input
    read input

    if [ "$input" == "exit" ]
    then
        echo "Closing the terminal..."
        # Remove the nodemon.log file
        rm nodemon.log
        # Kill processes using ports 4440 and 5173
        kill -9 $(lsof -t -i:4440)
        kill -9 $(lsof -t -i:5173)
        exit
    fi
done
