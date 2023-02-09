import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/';

export const singleFileUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'singleFile', data, options);
    } catch (error) {
        throw error;
    }
}
export const getSingleFiles = async () => {
    try {
        const { data } = await axios.get(apiUrl + 'getSingleFiles');
        return data;
    } catch (error) {
        throw error;
    }
}

export const multipleFilesUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'multipleFiles', data, options);
    } catch (error) {
        throw error;
    }
}

export const getMultipleFiles = async () => {
    try {
        const { data } = await axios.get(apiUrl + 'getMultipleFiles');
        return data;
    } catch (error) {
        throw error;
    }
}

export const getAllForms = async () => {
    try {
        const { data } = await axios.get(apiUrl + 'getAllForms');
        return data;
    } catch (error) {
        throw error;
    }
}

export const createForm = async (form) => {
    let options = {
        method: 'post',
        url: apiUrl + "createForm",
        headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
        data: form
    }
    await axios(options);
}

// export const createForm = async () => {
//     try{
//         const {data} = await axios.get(apiUrl + 'createForm');
//         return data;
//     }catch(error){
//         throw error;
//     }
// }
// export const updateForm=(id, user)=>
//   axios.put(apiUrl+'updateForm', user);

// export const updateForm = async () => {
//     try {
//         const { data } = await axios.get(apiUrl + 'updateForm');
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }
// export const deleteForm = async () => {
//     try {
//         const { data } = await axios.get(apiUrl + 'deleteForm');
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }