import forge from "node-forge";

interface KeyProps {
  key: string;
  iv: string;
}

interface AesEncryptProps extends KeyProps {
  messageData: string;
}

interface AesDecryptProps extends KeyProps {
  encryptedMessageData: string;
}

export const aesEncrypt = ({
  messageData,
  key,
  iv,
}: AesEncryptProps): string => {
  const cipher = forge.cipher.createCipher("AES-CBC", key);

  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(messageData, "utf8"));
  cipher.finish();
  // return encrypted data
  return cipher.output.toHex();
};

export const aesDecrypt = ({
  key,
  iv,
  encryptedMessageData,
}: AesDecryptProps): string => {
  const decipher = forge.cipher.createDecipher("AES-CBC", key);

  decipher.start({ iv: forge.util.createBuffer(forge.util.hexToBytes(iv)) });
  decipher.update(
    forge.util.createBuffer(forge.util.hexToBytes(encryptedMessageData)),
  );
  decipher.finish();
  // return decrypted data
  return decipher.output.toString();
};
