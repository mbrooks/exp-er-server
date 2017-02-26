global.privateMessages = {};

const MessageStorage = {
  getAll() {
    return global.privateMessages;
  },

  get(room) {
    return global.privateMessages[room] || [];
  },

  add(room, data) {
    if (!global.privateMessages[room]) {
      global.privateMessages[room] = [];
    }

    global.privateMessages[room].push(data);
  },
};

module.exports = MessageStorage;
