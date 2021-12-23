import axios from "axios";
import { forgerock } from 'app/config/api';
export default axios.create({
    headers: {
        "Content-type": "application/json",
        'Accept-API-Version': forgerock.headers.acceptAPIVersion
    }
});