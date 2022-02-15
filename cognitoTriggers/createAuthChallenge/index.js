module.exports.handler = async event => {
    console.log('Event: ', JSON.stringify(event, null, 2));
  
    try {
      const { request = {} } = event;
      const { userNotFound } = request;
      if (userNotFound) {
        throw new Error('[404] User Not Found');
      }
  
      const nonce = Math.floor(Math.random() * 1000000).toString();
      const message = `I am signing my one-time nonce: ${nonce}`;
  
      event.response.publicChallengeParameters = { message };
      event.response.privateChallengeParameters = { message };
  
      return event;
    } catch (err) {
      throw err;
    }
};