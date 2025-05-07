// Tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
});

function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // Remove active class from all tab buttons
                tabBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all tab content
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.opacity = '0';
                    content.style.display = 'none';
                });
                
                // Show target tab content
                const targetContent = document.getElementById(`${targetTab}-content`);
                if (targetContent) {
                    targetContent.style.display = 'flex';
                    
                    // Add subtle animation
                    setTimeout(() => {
                        targetContent.style.opacity = '1';
                        targetContent.style.transition = 'opacity 0.3s ease-out';
                        targetContent.classList.add('active');
                    }, 10);
                }
            });
        });
    }
}