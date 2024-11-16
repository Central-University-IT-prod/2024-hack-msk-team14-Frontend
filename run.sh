name='frontend'

if [[ $(docker ps -a -f "name=$name" --format '{{.Names}}') == $name ]]
then
        docker start frontend
else
        docker run -p 4000:3000 --name frontend -d prod-hack.gitlab.yandexcloud.net:5050/prod-team-14/frontend
fi