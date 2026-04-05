document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('registerButton');
  const authButton = document.getElementById('authButton');
  const optionsText = document.getElementById('optionsText');

  // Helper function to convert a Base64 string to an ArrayBuffer
  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Convert relevant options properties if they are Base64 strings
  function convertOptions(options) {
    // Convert challenge if it's a string
    if (typeof options.challenge === 'string') {
      options.challenge = base64ToArrayBuffer(options.challenge);
    }
    if (options.allowCredentials) {
      options.allowCredentials = options.allowCredentials.map(cred => ({
        ...cred,
        id: base64ToArrayBuffer(cred.id)
      }));
    }
    // Optionally convert user.id if it's a string (depending on your use-case)
    if (options.user && typeof options.user.id === 'string') {
      options.user.id = base64ToArrayBuffer(options.user.id);
    }
    return options;
  }

  function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  // Handle WebAuthn registration
  registerButton.addEventListener('click', async () => {
    let options;
    try {
      options = JSON.parse(optionsText.value);
    } catch (error) {
      alert('Invalid JSON in text field');
      return;
    }

    // Convert challenge (and user id if necessary)
    options = convertOptions(options);

    try {
      const credential = await navigator.credentials.create({ publicKey: options });
      console.log('Credential created:', credential);
      alert('Credential created successfully');
    } catch (err) {
      console.error('Error during credential creation:', err);
      alert('Error during credential creation: ' + err);
    }
  });



  // Handle WebAuthn authentication
  authButton.addEventListener('click', async () => {
    let options;
    try {
      options = JSON.parse(optionsText.value);
    } catch (error) {
      alert('Invalid JSON in text field');
      return;
    }

    // Convert challenge if necessary for authentication options as well
    options = convertOptions(options);

    try {
      const assertion = await navigator.credentials.get({ publicKey: options });
      console.log('Assertion obtained:', assertion);

      const credentialId = assertion.id;
      const authenticatorData = arrayBufferToBase64(assertion.response.authenticatorData);
      const clientDataJSON = new TextDecoder().decode(assertion.response.clientDataJSON);
      const signature = arrayBufferToBase64(assertion.response.signature);

      alert(
        `Assertion obtained successfully!\n\n` +
        `Credential ID: ${credentialId}\n\n` +
        `Authenticator Data: ${authenticatorData}\n\n` +
        `Client Data JSON: ${clientDataJSON}\n\n` +
        `Signature: ${signature}`
      );
    } catch (err) {
      console.error('Error during credential assertion:', err);
      alert('Error during credential assertion: ' + err);
    }
  });
});
