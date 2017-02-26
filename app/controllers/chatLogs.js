const questionStorage = require('../state/questionStorage');
const answerStorage = require('../state/answerStorage');
const messageStorage = require('../state/MessageStorage');
const masterQuestionList = questionStorage.getAll();
const _ = require('lodash');

exports.index = (req, res, next) => {
  const messages = messageStorage.getAll();

  const response = {};
  let caseNumber = 1000;

  Object.keys(messages).forEach((key) => {
    const questions = _.clone(masterQuestionList);
    for (i = 0; i < questions.length; i++) {
      questions[i].answer = answerStorage.getByQuestionNumber(key, i);
    }
    response[key] = {
      caseNumber,
      lastMessage: messages[key][messages[key].length - 1],
      timestamp: messages[key][messages[key].length - 1].timestamp,
      chatLogs: messages[key],
      questions,
    };
    caseNumber = caseNumber + 1;
  });

  res.json(response);
};
