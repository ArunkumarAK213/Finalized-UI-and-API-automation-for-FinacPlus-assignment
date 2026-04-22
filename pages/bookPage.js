
class BookPage {
    constructor(page) {
        this.page = page;
        this.searchBox = '#searchBox';
       
        this.bookLink = 'text=Learning JavaScript Design Patterns';
        this.titleVal = '#title';
        this.authorVal = '#author';
        this.publisherVal = '#publisher';
    }

    async searchAndSelectBook(name) {
        await this.page.fill(this.searchBox, name);
       
        await this.page.waitForSelector(this.bookLink);
        await this.page.click(this.bookLink);
    }

    async getBookDetails() {
     
        await this.page.waitForSelector('#title');
        
        const title = await this.page.textContent(this.titleVal);
        const author = await this.page.textContent(this.authorVal);
        const publisher = await this.page.textContent(this.publisherVal);

        return { 
            title: title.trim(), 
            author: author.trim(), 
            publisher: publisher.trim() 
        };
    }
}
module.exports = BookPage;
