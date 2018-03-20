#!/bin/bash
echo "正在拉取"
git pull

echo "提交"
git status
git add .
DATE=$(date +%Y%m%d)
git commit -m "zx update@"$DATE""
git push
