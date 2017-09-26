import { MovieBrowserPage } from './app.po';

describe('movie-browser App', () => {
  let page: MovieBrowserPage;

  beforeEach(() => {
    page = new MovieBrowserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
