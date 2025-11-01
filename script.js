const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const loading = document.getElementById('loading');

async function fetchQuote() {
  try {
    loading.classList.add('active');
    newQuoteBtn.disabled = true;
    
    const response = await fetch('https://api.quotable.io/random');
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
    const data = await response.json();
    
    quoteText.textContent = data.content;
    quoteAuthor.textContent = data.author;
    
    quoteText.style.animation = 'none';
    setTimeout(() => {
      quoteText.style.animation = 'fadeIn 0.6s ease-in';
    }, 10);
    
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteText.textContent = 'Failed to load quote. Please try again.';
    quoteAuthor.textContent = '';
  } finally {
    loading.classList.remove('active');
    newQuoteBtn.disabled = false;
  }
}

newQuoteBtn.addEventListener('click', fetchQuote);

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
