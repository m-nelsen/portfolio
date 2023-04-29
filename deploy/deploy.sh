#! /usr/bin/bash

prod_path="/home/ubuntu/prod/"
dev_path="/home/ubuntu/dev/"

prod_branch="master"
dev_branch="dev"

prod_pm2_name="portfolio_prod_env"
dev_pm2_name="portfolio_dev_env"

git_project_link="https://github.com/m-nelsen/portfolio.git"

#Check for existence of parameter
if [ $# = 0 ]; then
        echo "Must include arguments 'prod' or 'dev'"
        exit 1
fi

deploy() {
        path=$1
        branch=$2
        pm2_name=$3

        cd $path

        #If project doesn't exist, clone project into current directory
        if [ ! -f "package.json" ]; then
                git clone "$git_project_link" .
        fi

        git pull origin "$branch"
        npm install && npm run build

        #Restart process if it exists, otherwise start a new process
        if [ -n "$(pm2 pid "$pm2_name")" ]; then
                pm2 restart "$pm2_name"
        else
                pm2 start npm --name "$pm2_name" -- start
        fi

}

#Move current directory based on parameter
case "$1" in
        "prod") deploy $prod_path $prod_branch $prod_pm2_name
        ;;
        "dev") deploy $dev_path $dev_branch $dev_pm2_name
        ;;
        *)
        echo "Invalid argument. Use 'prod' or 'dev'"
        exit 1
        ;;
esac