echo '\033[41;36m -------------Reincarnation 升级程序------------- \033[0m'
echo '\\n'
echo '\033[42;30m Step1: 拉取代码 \033[0m'
git pull
echo '\033[41;36m 拉取完成 \033[0m'
echo '\\n'
echo '\033[42;30m Step2: 重启服务 \033[0m'
pm2 restart 1
echo '\033[41;36m -------------Reincarnation 升级完成------------- \033[0m'
