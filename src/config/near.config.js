const networkId = process.env.NETWORK;

export const getNearConfig = () => {
  let config;
  switch (networkId) {
    case 'production':
    case 'mainnet':
      config = {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
      };
      break;
    case 'development':
    case 'testnet':
      config = {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
      };
      break;
    default:
      config = {
        networkId: 'unknown',
        nodeUrl: 'unknown',
      };
  }
  return config;
}
