export const getApiKeyFromAuthorizationHeader = (authHeader: string) => {
  // Split the header to get the Credential part
  const credentialPart = authHeader.split("Credential=")[1];
  // Split the Credential part to isolate the API key
  const apiKey = credentialPart.split("/")[0];
  return apiKey;
};
