import View from './View.js';
import previewView from './previewView.js';
import { Fraction } from 'fractional';
class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  //   _generateMarkup() {
  //     return this._data.map(this._generateMarkupPreview).join('');
  //   }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
