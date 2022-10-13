import { api } from "../utils/api";

export let loading = false;
export let error = false;
export let successUpdate = false;

export const getAllQuestions = async () => {
    successUpdate = false;
    const url = `/questions/all`;
    const questions = await api.get(url);
        
    return questions.data;
}

export const getQuestionId = async(id) => {
    successUpdate = false;
    const url = `/questions/${id}`;
    const question = await api.get(url);

    return question.data;
}

export const createAnswer = async (id, text) => {
    successUpdate = false;
    loading = true
    const url = `/answers/${id}`;

    const datas = await api.post(url, text);

    loading = false;

    return datas.data;

}

export const getQuentionsUser = async () => {
    const url = `/questions`;
    const res = await api.get(url);

    return res.data;

}

export const createQuestion = async (question) => {
    successUpdate = false;
    error = false;
    const url = `/questions`;

    loading = true;

    const res = await api.post(url, question)
        .then(resp => resp.data)
        .catch(err => err.response.data);

    if(res.error){
        error = res.error;
        return res;
    }

    loading = false;
    return res;

}

export const deleteQuestion = async (id) => {
    successUpdate = false;
    const url = `/questions/${id}`;

    const res = await api.delete(url);

    return res;
}

export const editQuestion = async(id, newQuestion) => {
    loading = true;
    successUpdate = false;

    const url = `/questions/${id}`;
    
    const res = await api.put(url, newQuestion)
        .then(res => res.data)
        .catch(err => err.response.data);

    if(!res.error){
        successUpdate = res.success;
    }
    loading = false;
    return res;
}