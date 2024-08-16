import JSEncrypt from "jsencrypt";
import forge from "node-forge";
import { useEffect, useState } from "react";

const EncryptTest = () => {
  const [textInput, setTextInput] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [selectLibrary, setSelectLibrary] = useState("");

  const handleInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleJSEncrypt = () => {
    if (textInput.length !== 0) {
      // 사용할 공개 키
      const publicKey = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiNTJ74CyOVTTmdpJsKHh72VtdJuCwo0QG8jWsa5VoV83y6zteCcfMMjaKRrQAQWYmTUFsF3NtFVWUYV8JDJu8FUBcjnanZVEO9wRL8honMK60t5FW62GZ3gSmRK7FrW3gER226f/kCev9JfBaXEiUTNIi+gLXYieG/dr7d8z7u+IyjkxDQEPbvzGoH9fQI6bJLGTYnw64DX0so+4zTWcKXbncja5EEAfg7wcFTfdQQGAX+SufaW+m/kBoZ219+JQEUb3wnNYqghofAfi9o0l1tpi0yyHyhWRZbF+fuABiZ9vBgcYv3f6voEKc17VzD4RUdufW+Cm85FYJUOzZoP0iQIDAQAB
        -----END PUBLIC KEY-----`;

      //   // 사용할 라이브러리 인스턴스 생성(import)
      const encryptLibrary = new JSEncrypt();
      //   // 사용할 인스턴스의 공개키에 내가 사용할 공개키 설정
      encryptLibrary.setPublicKey(publicKey);
      //   // 실제로 암호화 하는 부분, encrypt 메소드 사용
      const encrypted = encryptLibrary.encrypt(textInput);

      setSelectLibrary("JSEncrypt 라이브러리 암호화 값 ");
      setEncryptedText(encrypted);
    } else {
      window.alert("메시지를 입력해주세요!");
    }
  };

  const handleForgeEncrypt = () => {
    if (textInput.length !== 0) {
      // 사용할 공개 키
      const publicKey = `-----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiNTJ74CyOVTTmdpJsKHh72VtdJuCwo0QG8jWsa5VoV83y6zteCcfMMjaKRrQAQWYmTUFsF3NtFVWUYV8JDJu8FUBcjnanZVEO9wRL8honMK60t5FW62GZ3gSmRK7FrW3gER226f/kCev9JfBaXEiUTNIi+gLXYieG/dr7d8z7u+IyjkxDQEPbvzGoH9fQI6bJLGTYnw64DX0so+4zTWcKXbncja5EEAfg7wcFTfdQQGAX+SufaW+m/kBoZ219+JQEUb3wnNYqghofAfi9o0l1tpi0yyHyhWRZbF+fuABiZ9vBgcYv3f6voEKc17VzD4RUdufW+Cm85FYJUOzZoP0iQIDAQAB
      -----END PUBLIC KEY-----`;

      // RSA 공개 키 생성
      const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
      // 텍스트 암호화
      const encrypted = publicKeyObj.encrypt(textInput, "RSA-OAEP", {
        md: forge.md.sha256.create(),
      });
      // Base64 인코딩
      const base64Encrypted = forge.util.encode64(encrypted);

      setSelectLibrary("forge 라이브러리 암호화 값");
      setEncryptedText(base64Encrypted);
    } else {
      window.alert("메시지를 입력해주세요!");
    }
  };

  return (
    <div>
      <h3>입력 값 암호화</h3>
      <div>
        <input
          style={{ marginRight: "10px" }}
          type="text"
          value={textInput}
          onChange={(e) => {
            handleInput(e);
          }}
        ></input>
        <button onClick={handleJSEncrypt}>JSEncrypt 암호화</button>
        <button onClick={handleForgeEncrypt}>forge 암호화</button>
      </div>
      <div
        style={{ width: "350px", wordWrap: "break-word", marginTop: "30px" }}
      >
        암호화 된 텍스트 ::
        <p>{selectLibrary ? selectLibrary : ""}</p>
        <p>{encryptedText}</p>
      </div>
    </div>
  );
};
export default EncryptTest;
