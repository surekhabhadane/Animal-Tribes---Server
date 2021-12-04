import * as axios from 'axios';
import history from './history';

const APICalling =
    async (
        method,
        url,
        data = null,
        authToken = null,
        contentType = `application/json`
    ) => {

        let configuration = null;
        let headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': contentType
        };
        let timeout = 60000;

        let apiResponse = ({
            status: false,
            message: null,
            data: []
        });

        switch (method) {
            case 'GET':
                configuration = {
                    method: 'get',
                    url: url,
                    timeout: timeout,
                    headers: headers,
                }
                break;
            case 'POST':
                configuration = {
                    method: 'post',
                    url: url,
                    timeout: timeout,
                    headers: headers,
                    data: data
                }
                break;
            case 'DELETE':
                configuration = {
                    method: 'delete',
                    url: url,
                    timeout: timeout,
                    headers: headers,
                }
                break;
            case 'PUT':
                configuration = {
                    method: 'put',
                    url: url,
                    timeout: timeout,
                    headers: headers,
                    data: data
                }
                break;
            default:
                break;
        }

        await axios(configuration).then((response) => {
            // console.log('========= api success : response =========',
            //     response);
            (response.data.status) ?
                apiResponse = ({ status: response.data.status, message: null, data: response.data.data })
                :
                apiResponse = ({ status: response.data.status, message: response.data.error, data: [] });
        }).catch((error) => {
            // console.log('========= api error : response =========',
            //     error, error.response);
            switch (error.response.status) {
                case 401:
                      // If user is unauthorized then clear storage and redirect to login
                      localStorage.clear();
                      history.push('/');
                      window.location.reload(true);
                      apiResponse = ({ status: false, message: 'Unauthorized', data: [] })
                      break;
                default:
                    (error.response) ?
                        apiResponse = ({ status: false, message: error.response.data.error, data: [] })
                        :
                        apiResponse = ({ status: false, message: 'Somthing went wrong', data: [] });
                    break;
            }
        });
        return apiResponse;
    }

const utilise = {
    APICalling: APICalling,
}

export default utilise;