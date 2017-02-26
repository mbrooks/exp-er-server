
global.privateAnswers = {};

const AnswerStorage = {
  getAll() {
    return global.privateAnswers;
  },

  get(room) {
    return global.privateAnswers[room] || [];
  },

  getByQuestionNumber(room, questionNumber) {
    return global.privateAnswers[room][questionNumber] || '';
  },

  add(room, data) {
    if (!global.privateAnswers[room]) {
      global.privateAnswers[room] = [];
    }

    global.privateAnswers[room].push(data);
  },
};

module.exports = AnswerStorage;
