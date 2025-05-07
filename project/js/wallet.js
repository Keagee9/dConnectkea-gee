// Wallet connection functionality
document.addEventListener('DOMContentLoaded', function() {
    setupWalletFunctionality();
});

// Wallet functionality
function setupWalletFunctionality() {
    // This would be where you'd integrate with actual wallet providers
    // For this demo, we'll simulate the functionality
    
    // Sample wallet data for demonstration
    const walletData = {
        connected: false,
        address: '',
        chain: '',
        balance: 0,
        tokens: [],
        nfts: []
    };
    
    // Wallet options click handlers
    const walletOptions = document.querySelectorAll('.wallet-option');
    walletOptions.forEach(option => {
        option.addEventListener('click', function() {
            const walletType = this.dataset.wallet;
            connectWallet(walletType);
        });
    });
    
    // Simulate connecting to a wallet
    function connectWallet(walletType) {
        // Show loading overlay
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
            loadingOverlay.querySelector('p').textContent = `Connecting to ${formatWalletName(walletType)}...`;
            
            // Simulate connection delay
            setTimeout(() => {
                // For demonstration purposes
                if (walletType === 'more') {
                    loadingOverlay.style.display = 'none';
                    
                    // Show more wallets dialog (simplified for demo)
                    showNotification('More wallet options will be available soon!', 'info');
                    return;
                }
                
                // Update wallet data
                walletData.connected = true;
                walletData.address = generateRandomAddress();
                walletData.chain = getRandomChain();
                walletData.balance = (Math.random() * 10).toFixed(4);
                
                // Update UI
                updateWalletUI();
                
                // Hide loading overlay
                loadingOverlay.style.display = 'none';
                
                // Show success notification
                showNotification(`Connected to ${formatWalletName(walletType)} successfully!`, 'success');
                
                // Close any open modal
                const validationModal = document.getElementById('validationModal');
                if (validationModal) {
                    validationModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }, 1500);
        }
    }
    
    // Update UI after wallet connection
    function updateWalletUI() {
        const connectButton = document.getElementById('connectWalletBtn');
        if (connectButton) {
            if (walletData.connected) {
                // Truncate address for display
                const shortenedAddress = `${walletData.address.substring(0, 6)}...${walletData.address.substring(walletData.address.length - 4)}`;
                
                // Update button text
                connectButton.innerHTML = `
                    <span class="network-badge network-badge-${walletData.chain.toLowerCase()}">
                        ${walletData.chain}
                    </span>
                    ${shortenedAddress}
                `;
                
                connectButton.classList.remove('btn-outline');
                connectButton.classList.add('btn-primary');
            } else {
                connectButton.textContent = 'Connect Wallet';
                connectButton.classList.add('btn-outline');
                connectButton.classList.remove('btn-primary');
            }
        }
    }
    
    // Helper functions
    function formatWalletName(walletType) {
        switch (walletType) {
            case 'metamask':
                return 'MetaMask';
            case 'trustwallet':
                return 'Trust Wallet';
            case 'coinbase':
                return 'Coinbase Wallet';
            case 'walletconnect':
                return 'WalletConnect';
            case 'binance':
                return 'Binance Wallet';
            case 'more':
                return 'More Options';
            default:
                return walletType;
        }
    }
    
    function generateRandomAddress() {
        const chars = '0123456789abcdef';
        let result = '0x';
        for (let i = 0; i < 40; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    function getRandomChain() {
        const chains = ['Ethereum', 'BSC', 'Polygon', 'Avalanche'];
        return chains[Math.floor(Math.random() * chains.length)];
    }
}