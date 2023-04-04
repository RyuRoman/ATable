const URI = 'http://api-local.atable.io/api';

export default {
    async fetchRegister() {
        try {
                let response = await fetch(URI + '/register');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}