import forge, { pki } from "node-forge";

interface KeyProps {
  key: string;
}

interface AesEncryptProps extends KeyProps {
  messageData: string;
}

interface AesDecryptProps extends KeyProps {
  encryptedMessageData: string;
  iv: string;
}

interface RsaEncryptProps {
  publicKey: string;
  message: string;
}

interface RsaDecryptProps {
  encryptedMsg: string;
  privateKey: string;
}

export const aesEncrypt = ({ messageData, key }: AesEncryptProps) => {
  let iv = forge.random.getBytesSync(16);
  const cipher = forge.cipher.createCipher("AES-CBC", key);

  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(messageData, "utf8"));
  cipher.finish();

  const encryptedMessage = cipher.output.toHex();
  iv = forge.util.bytesToHex(iv);

  // return encrypted message and iv
  return { encryptedMessage, iv };
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

export const rsaEncrypt = ({ publicKey, message }: RsaEncryptProps) => {
  // convert a PEM-formatted public key to a Forge public key
  const pck = pki.publicKeyFromPem(publicKey);
  // find the max chunk length according to public key
  const maxLength = pck.n.bitLength() / 8 - 11;
  const messageLength = message.length;
  const encryptedChunks = [];

  // If the message is longer than the maximum length, divide it into chunks and encrypt
  if (messageLength > maxLength) {
    for (let i = 0; i < messageLength; i += maxLength) {
      const chunk = message.slice(i, i + maxLength);
      encryptedChunks.push(pck.encrypt(chunk));
    }
  } else {
    encryptedChunks.push(pck.encrypt(message));
  }

  const encryptedMessage = forge.util.encode64(
    JSON.stringify({ encryptedChunks }),
  );

  return encryptedMessage;
};

export const rsaDecrypt = ({ privateKey, encryptedMsg }: RsaDecryptProps) => {
  // convert a PEM-formatted private key to a Forge private key
  const ptk = pki.privateKeyFromPem(privateKey);

  // get the encryped chuncks
  const encryptedChunks = JSON.parse(
    forge.util.decode64(encryptedMsg),
  ).encryptedChunks;

  // decrypt and merge the chunks
  const decryptedMessage = encryptedChunks
    .map((encryptedChunk: string) => ptk.decrypt(encryptedChunk))
    .join("");

  return decryptedMessage;
};
