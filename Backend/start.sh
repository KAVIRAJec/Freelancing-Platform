#!/bin/bash

# Set the port from Render's PORT environment variable (defaults to 8080)
export ASPNETCORE_URLS="http://+:${PORT:-8080}"

# Start the application (migrations will run automatically)
echo "Starting application..."
exec dotnet Freelance-Project.dll
