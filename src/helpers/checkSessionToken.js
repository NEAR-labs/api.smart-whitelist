export const checkSessionToken = (account, delay = 1800) =>
  Date.now() <= account.sessionTokenTimestamp.getTime() + delay * 1000; // 30 min delay
