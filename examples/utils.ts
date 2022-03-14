export const DEFAULT_RPC = "https://polygon-rpc.com";

export const getPrivateKey = () => {
  if (!process.env.PRIVATE_KEY) throw new Error("No PRIVATE_KEY set in env");

  return process.env.PRIVATE_KEY;
};
