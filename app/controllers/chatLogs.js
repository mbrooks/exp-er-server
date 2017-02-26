const questionStorage = require('../state/questionStorage');
const answerStorage = require('../state/answerStorage');
const messageStorage = require('../state/MessageStorage');
const masterQuestionList = questionStorage.getAll();
const _ = require('lodash');

function calculatePriority(answers) {
  let result = 'code 1';

  console.log(answers);
  if (answers[0] && answers[0].toLowerCase() === 'yes') {
    result = 'code 3';
  }

  if (answers[1] && !isNaN(answers[1])) {
    if (answers[1] > 30) {
      result = 'code 3';
    }

    if (answers[1] > 5) {
      result = 'code 2';
    }
  }

  if (answers[2] && answers[2].toLowerCase() === 'yes') {
    result = 'code 3';
  }

  return result;
}

exports.index = (req, res, next) => {
  const messages = messageStorage.getAll();

  const responses = [];
  let caseNumber = 1000;

  Object.keys(messages).forEach((key) => {
    const questions = _.clone(masterQuestionList);
    const answers = answerStorage.get(key);

    // figure out things
    const priority = calculatePriority(answers);
    for (i = 0; i < questions.length; i++) {
      questions[i].answer = answers[i];
    }
    // find coordinates
    let latitude;
    let longitude;
    const coordinates = messages[key].find((message) => {
      return message.latitude && message.longitude;
    });
    if (coordinates) {
      latitude = coordinates.latitude;
      longitude = coordinates.longitude;
    }
    const response = {
      id: key,
      caseNumber,
      lastMessage: messages[key][messages[key].length - 1].message,
      latitude,
      longitude,
      timestamp: messages[key][messages[key].length - 1].timestamp,
      priority,
      chatLogs: messages[key],
      questions,
    };
    responses.push(response);
    caseNumber = caseNumber + 1;
  });

  res.json(responses);
};
