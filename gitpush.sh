#!/bin/bash
echo -e "\033[32m 正在拉取... \033[0m"
git pull

echo -e "\033[32m 正在提交... \033[0m"
git status
git add .
DATE=$(date +%Y%m%d)
git commit -m "zx update@"$DATE""
git push
