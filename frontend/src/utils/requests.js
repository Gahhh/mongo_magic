import backend_url from "../config/api";

const apiRequest = async ({ method = undefined, url, body = undefined }) => {
    const requestOptions = {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    };
    try {
        console.log((requestOptions));
        const response = await fetch(`${backend_url}${url}`, requestOptions);
        return response;
    } catch (error) {
        return error;
    }
}

export default apiRequest;

export const userLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = "/login";
}

export const getProfile = (url = '/users/profile') => {
    const res = apiRequest({ url: url });
    return res;
}

export const updateProfile = (body) => {
    const res = apiRequest({ method: 'PATCH', url: '/users/update_profile', body: body });
    return res;
}

export const getQuestionList = (url = '/question/list') => {
    const res = apiRequest({ url: url });
    return res;
}

export const postAnswers = (body) => {
    return apiRequest({ method: 'POST', url: '/question/answer', body: body });
}

export const australianPostCode = async (postCode) => {
    const request = {
        method: 'GET',
    };
    try {
        // console.log(`https://secure.geonames.org/postalCodeSearch?postalcode=${postCode}&username=jinl9667&country=AU`);
        const response = await fetch(`https://secure.geonames.org/postalCodeSearchJSON?postalcode=${postCode}&username=jinl9667&country=AU`, request);
        return response;
    } catch (error) {
        setTimeout(() => {
            return (postCode) => australianPostCode(postCode);
        }, 1000)
    }
}

export const saveQuestion = (body, url = '/question/save') => {
    const res = apiRequest({ method: 'POST', url: url, body: body });
    return res;
}

export const getSavedQuestion = (url = '/question/load') => {
    return apiRequest({ url: url });
}

export const getResult = (resultId) => {
    return apiRequest({ url: `/question/result?id=${resultId}` });
}


export const loginRequest = (body) => {
    const res = apiRequest({ method: 'POST', url: '/users/login', body: body });
    return res;
}

export const sendSupportQuestion = (body) => {
    return apiRequest({ method: 'POST', url: '/support/question', body: body });
}


export const regisRequest = (body) => {
    const res = apiRequest({ method: 'POST', url: '/users/register', body: body });
    return res;
}

export const getSupportQuestions = () => {
    const res = apiRequest({ method: 'GET', url: '/support/list'});
    return res;
}

export const rankingRequest = () => {
  const res = apiRequest({ method: 'GET', url: '/ranking/list', });
  return res;
}

export const solveSupportQuestion = (body) => {
    const res = apiRequest({method: 'POST', url: '/support/solve', body: body});
    return res;
}