const axios = require('axios');

module.exports.handler = async event => {
  console.log('Event: ', JSON.stringify(event, null, 2));
  
  const body = JSON.parse(event.userName);

  const config = {
    headers: {
      'x-api-key': 'YFrR9r5nSR2KkP5VMwhYwaQ6oV14bHjl1uZSytHo'
    }
  }

  const response = await axios.post('https://gollbqzbfc.execute-api.ap-southeast-1.amazonaws.com/prod/verifyWallet', {
    "publicAddress": event.userName
  }, config);

  try {
    const response = await axios.post('https://gollbqzbfc.execute-api.ap-southeast-1.amazonaws.com/prod/verifyWallet', {
    "publicAddress": event.userName
    }, config);
    event.response.autoConfirmUser = true;
    return event;
  } catch(err) {
    if (err.response) {
      if (err.response.status === 404) {
        throw new Error('[404] Invalid Wallet Account');
      } else {
        throw new Error('[500] Internal Server Error');
      }
    }
  }
};