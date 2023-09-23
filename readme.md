name: Build and Deploy

on:
  pull_request:
    types: [ closed ]

jobs:
  merge_job:
      if: github.event.pull_request.merged == true
      runs-on: ubuntu-latest
      steps:
        
name: Checkout code
        uses: actions/checkout@v2

name: Setup Node.js
uses: actions/setup-node@v2
with:
  node-version: '18'

name: Install dependencies
run: npm install

name: Build application
run: npm run build

name: Upload files to server
uses: appleboy/scp-action@v0.1.4
with:
  host: ${{ secrets.SERVER_IP }}
  username: ${{ secrets.ULTRA_USER }}
  password: ${{ secrets.ULTRA_PASSWORD }}
  key: ${{ secrets.PASS }}
  port: 22
  source: "dist/"
  target: "/var/www/autotest"
  passphrase: "EpicalAlitan"

name: Finish
run: echo "Deployment completed!"


close_job:
  if: github.event.pull_request.merged == false
  runs-on: ubuntu-latest
  steps:
run: |
    echo "El PR se cerro sin haber hecho merge"