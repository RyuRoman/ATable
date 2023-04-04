CURRENT_PATH=$PWD
SRC_PATH=$PWD/src

WEBSITE_PATH=$PWD/src/website-atable
API_PATH=$PWD/src/api-atable 
CUSTOMER_APP_PATH=$PWD/src/customer-app-atable
COOKER_APP_PATH=$PWD/src/cooker-app-atable
BACKOFFICE_PATH=$PWD/src/backoffice-atable

### First see PROGRAMS START section ###
function dockerstart
{
    echo -e "\e[33mStarting process\e[39m:"

    
    ### REMOVE DIRECTORY ###
    echo -e "\e[34m--->\e[39m Cleaning directories"
    sudo rm -rf $SRC_PATH
    mkdir $SRC_PATH
    cd $SRC_PATH


    ### CLONING REPOS ###
    echo -e "\e[34m--->\e[39m Cloning projects"
    git clone git@gitlab.com:le-crou/website-atable.git 
    git clone git@gitlab.com:le-crou/api-atable.git
    git clone git@gitlab.com:le-crou/customer-app-atable.git 
    git clone git@gitlab.com:le-crou/cooker-app-atable.git 
    git clone git@gitlab.com:le-crou/backoffice-atable.git 


    ### PULL USEFUL DISTANT BRANCHES ###
    echo -e "\e[34m--->\e[39m Pulling Staging and Development"
    cd $WEBSITE_PATH
    git checkout --track origin/Staging 
    git checkout Development
    cd $API_PATH
    git checkout --track origin/Staging 
    git checkout Development 
    cd $CUSTOMER_APP_PATH
    git checkout --track origin/Staging
    git checkout Development
    cd $COOKER_APP_PATH
    git checkout --track origin/Staging 
    git checkout Development 
    cd $BACKOFFICE_PATH
    git checkout --track origin/Staging 
    git checkout Development
    cd $CURRENT_PATH


    ### INIT ENV ###
    echo -e "\e[34m--->\e[39m Initialize .env files"
    cp $CURRENT_PATH/docker-config/.env $WEBSITE_PATH
    cp $CURRENT_PATH/docker-config/.env $API_PATH
    cp $CURRENT_PATH/docker-config/.env $BACKOFFICE_PATH


    ### DOCKER BUILD ###
    echo -e "\e[34m--->\e[39m Docker is building project"
    docker-compose build
    docker-compose up -d

    ### GET THE NPM AND COMPOSER PACKAGES ###
    echo -e "\e[34m--->\e[39m Install dependencies"
    docker exec -ti website-atable npm install
    docker exec -ti website-atable composer update
    docker exec -ti website-atable chown -R www-data:www-data /var/www/html/storage
    docker exec -ti api-atable npm install
    docker exec -ti api-atable composer update
    docker exec -ti api-atable chown -R www-data:www-data /var/www/html/storage
    docker exec -ti backoffice-atable npm install
    docker exec -ti backoffice-atable composer update
    docker exec -ti backoffice-atable chown -R www-data:www-data /var/www/html/storage
    

    ### IMPORTANT TO READ MESSAGE ###
    echo ""
    echo -e "\e[33mYOU MUST KNOW\e[39m:"
    echo -e "-> \e[34mYou are now on Development branch on all the projects to have the last update.\e[39m"
    echo -e "-> \e[34mWhen you begin a feature, you must \e[4mcreate a branch from uptodated Development\e[24m.\e[39m"
    echo -e "-> \e[34mWhen you are satisfied of you dev, you may merge with Staging and push it to see it online\e[39m"
    echo -e "-> \e[34mWhen you are satisfied of the online version, you may do a \"\e[4mPull Request\e[24m\" on GitLab.\e[39m"

    ### LAST THING TODO ###
    echo ""
    echo -e "\e[33mIMPORTANT\e[39m : Don't forget to write urls (VIRTUAL_HOST in docker-compose.yml) in your hosts file (Instructions : https://laravel.com/docs/5.8/homestead ---> Section \"Hostname Resolution\")."
}



##### PROGRAMS START #####
echo "Installation process started."
echo ""

echo -e "\e[33mBefore we go, check if\e[39m:"
echo -e "-> \e[34mThis term has \"\e[4mdocker\e[24m\", \"\e[4mgit\e[24m\" and linux basic commands\e[39m"
echo -e "-> \e[34mYou have uploaded your SSH key onto GitLab\e[39m"
read -r -p "All settled? [Y/n] " response
echo ""
case "$response" in
    [yY][eE][sS]|[yY])
	dockerstart;;
esac

echo ""
echo "Installation process ended."
