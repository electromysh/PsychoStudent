import { QUESTIONS_JSON_STRING } from './questionsJSONString';

let questionsObject = {};
try {
    questionsObject = JSON.parse(QUESTIONS_JSON_STRING);
} catch (err) {
    console.error('Can not parse JSON ((((');
}

let questionsArray = Object.values(questionsObject);
questionsArray = questionsArray.map(q => {
    return {
        ...q,
        Answers: Object.values(q.Answers)
    };
});

export const QUESTIONS = questionsArray;
