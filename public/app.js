var quotes = [];

var Quote = function(text, author){
    this.text = text;
    this.author = "  " + author; 
};

var clearFormFields = function(){
    var text = document.getElementById('new-quote-text');
    var author = document.getElementById('new-quote-author');
    text.value = '';
    author.value = '';
};

var deleteDummyQuote = function(){
    var quote = document.getElementById('dummy-quote');
    if (quote) {
        quote.parentElement.removeChild(quote);
    }
};

var createDummyQuoteElement = function(quote){
    var quoteArticle = document.createElement('article');
    var blockquote = document.createElement('blockquote');
    var cite = document.createElement('cite');
    var articleArea = document.getElementsByTagName('section')[0];

    quoteArticle.classList.add('dummy-quote');
    quoteArticle.id = 'dummy-quote';
    blockquote.innerText = quote.text;
    cite.innerText = quote.author;
    blockquote.appendChild(cite);
    quoteArticle.appendChild(blockquote);

    articleArea.appendChild(quoteArticle);
    quote.element = quoteArticle;
    return quoteArticle;
}

var createQuoteElement = function(quote){
    var quoteArticle = document.createElement('article');
    var blockquote = document.createElement('blockquote');
    var cite = document.createElement('cite');
    var deleteButton = document.createElement('button');
    var articleArea = document.getElementsByTagName('section')[0];

    quoteArticle.classList.add('quote');
    blockquote.innerText = quote.text;
    cite.innerText = quote.author;
    blockquote.appendChild(cite);
    quoteArticle.appendChild(blockquote);
    deleteButton.innerText = 'Delete quote'
    quoteArticle.appendChild(deleteButton);

    deleteButton.onclick = function(){
        articleArea.removeChild(this.parentElement);
        quotes.splice(quotes.indexOf(quote), 1);
    };

    articleArea.appendChild(quoteArticle);
    quote.element = quoteArticle;
    return quoteArticle;
}

var fieldUpdateHandler = function(){
    deleteDummyQuote();
    var authorField = document.getElementById('new-quote-author');
    var textField = document.getElementById('new-quote-text');
    if (authorField.value == '' && textField.value == '') {
        return;
    }
    quote = createDummyQuoteElement(new  Quote(textField.value, authorField.value));
};

var quoteFormHandler = function(event){
    deleteDummyQuote();
    event.preventDefault();
    var text = document.getElementById('new-quote-text');
    var author = document.getElementById('new-quote-author');
    var quote = new Quote(text.value, author.value);

    clearFormFields();

    quotes.push(quote);
    createQuoteElement(quote);
}

var init = function(){
    quotes.push(new Quote("Visual Basic is the way forward, I don't know why we are doing Javascript.", "Jay Chetty"));
    quotes.push(new Quote("The only CSS you need to know is background-color: tomato", "Rick"));
    quotes.push(new Quote("No Blockers *smug tone*", "Keith"));
    quotes.push(new Quote("Scaffold is nothing but a fiery hell.", "Valerie"));
    for (quote of quotes) {
        createQuoteElement(quote);
    }

    var quoteForm = document.getElementById('new-quote-form');
    quoteForm.onsubmit = quoteFormHandler;
    var authorField = document.getElementById('new-quote-author');
    authorField.onkeyup = fieldUpdateHandler;
    var textField = document.getElementById('new-quote-text');
    textField.onkeyup = fieldUpdateHandler;
};

window.onload = init;
