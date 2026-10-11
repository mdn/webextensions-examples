document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('registerButton');
  const authButton = document.getElementById('authButton');
  const optionsText = document.getElementById('optionsText');

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
    options.challenge = Uint8Array.fromBase64(options.challenge);
    options.user.id = Uint8Array.fromBase64(options.user.id);

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
    options.challenge = Uint8Array.fromBase64(options.challenge);
    if (Array.isArray(options?.allowCredentials)) {
      for (const ac of options.allowCredentials) {
        ac.id = Uint8Array.fromBase64(ac.id);
      }
    }

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
