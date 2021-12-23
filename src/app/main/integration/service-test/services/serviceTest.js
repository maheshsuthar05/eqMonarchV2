import {apiTesting} from 'app/config/api'
import axios from 'axios'

export const apiServices = {
    async getAllServices(payload,bodyValue) {
        const {contentType, operationsId} = payload;
        const serviceBodyValue=bodyValue?bodyValue:{};
        let method="POST";
        let testUrl = apiTesting.api + '/';
        let config = {
            headers:{
               'contentType':contentType,
               'operation_id':operationsId,
            }
        };
        try {
            return await axios({method, url: testUrl, data: serviceBodyValue,headers:config.headers})
        } catch (err) {
            return err.response
        }
    }

}
