/*
  Action Manager for Global Application Actions

  For example, "open-sidebar", "load-file"
*/

let LOG_ALL_ACTIONS = false;

if (LOG_ALL_ACTIONS) {
  console.info(
    `
    The action manager is currently set to log all messages.

    To disable this setting, set LOG_ALL_ACTIONS to false in actionmanager.js
    `
  );
}


const EventEmitter = require('events');

class ActionManager extends EventEmitter {
  constructor() {
    super();
    this.on('newListener', (event)=>{
      if (LOG_ALL_ACTIONS) {
        console.log('ActionManager : New Listener : ' + event);
      }
    });
  }
}

const actionManager = new ActionManager();

if (LOG_ALL_ACTIONS) {
  let oldEmit = actionManager.emit;
  actionManager.emit = function(event) {
    console.log('ActionManager : Action : ' + event);
    oldEmit.apply(actionManager, arguments);
  };
}
module.exports = actionManager;
