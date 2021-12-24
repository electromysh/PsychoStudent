import { QUESTIONS } from '../mock/questions.mock'

class QuestionsData {

    getQuestions() {
        // Mock data
        return Promise.resolve(QUESTIONS);
    }
}

export const questionsData = new QuestionsData();