import axios from 'axios';

const COMPANY_API_BASE_URL = "http://localhost:8080/api/v1/company";

class CompanyService {

    getCompanyDetails(){
        let companyId=1;
        return axios.get(COMPANY_API_BASE_URL + '/' + companyId);
    }

}

export default new CompanyService()