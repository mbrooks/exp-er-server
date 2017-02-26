
const privateQuestions = [
  {
    question: 'Are you in need of immediate rescue? yes or no',
    inputType: 'boolean',
  },
  {
    question: 'How many people are with you? enter a valid number',
    inputType: 'number',
  },
  {
    question: 'Does you or someone in your group need immediate medical attention? yes or no',
    inputType: 'boolean',
  },
  {
    question: 'Please message any additional information',
    inputType: 'string',
  }
];

const QuestionStorage = {
  getAll() {
    return privateQuestions;
  },
};

module.exports = QuestionStorage;
