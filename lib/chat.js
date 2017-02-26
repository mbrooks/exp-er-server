const socketIo = require('socket.io');
const log = require('./log');
const uuid = require('uuid');
const answerStorage = require('../app/state/AnswerStorage');
const questionStorage = require('../app/state/QuestionStorage');
const messageStorage = require('../app/state/MessageStorage');

module.exports = {
  start(server) {
    const questions = questionStorage.getAll();

    // Socket.io server listens to our app
    const io = socketIo.listen(server);
    log.info('Starting chat!');

    // Emit welcome message on connection
    io.on('connection', (socket) => {
      socket.on('client', log.info);
      socket.on('room', (room) => {
        log.info('joining room:', room);
        socket.join(room);

        log.info('sending public service announcment to '+ room);
        socket.emit(room, {
          id: uuid.v4(),
          message: "Thank you for using emergency services. We're sorry you are having an emergency",
          timestamp: new Date().toISOString(),
        });

        let answers = answerStorage.get(room);
        if (answers.length === 0) {
          socket.emit(room, {
            id: uuid.v4(),
            message: questions[answers.length].question,
            timestamp: new Date().toISOString(),
          });
        }

        socket.on(room, (message) => {
          answers = answerStorage.get(room);
          if (answers.length < 3) {
            let isValid = false;

            if (questions[answers.length].inputType === 'boolean') {
              if (message.message === 'yes') {
                console.log('it is valid');
                isValid = true;
              }

              if (message.message === 'no') {
                isValid = true;
              }
            }

            if (questions[answers.length].inputType === 'number') {
              if (!isNaN(message.message)) {
                isValid = true;
              }
            }

            if (questions[answers.length].inputType === 'string') {
              isValid = true;
            }

            if (isValid) {
              answerStorage.add(room, message.message);
              answers = answerStorage.get(room);
              socket.emit(room, {
                id: uuid.v4(),
                message: questions[answers.length].question,
                timestamp: new Date().toISOString(),
              });
            } else {
              socket.emit(room, {
                id: uuid.v4(),
                message: 'Invalid input, please try again!',
                timestamp: new Date().toISOString(),
              });
            }
          }

          log.info({ room, message });
          socket.to(room).emit(room, message);
          messageStorage.add(room, message);
        });
      });
    });
  },
};
