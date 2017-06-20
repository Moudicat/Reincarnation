echo '-------------Reincarnation 升级程序-------------'
echo '\n'
echo 'Step1: 拉取代码'
git pull
echo '拉取完成'
echo '\n'
echo 'Step2: 重启服务'
pm2 restart 1
echo '-------------Reincarnation 升级完成-------------'
