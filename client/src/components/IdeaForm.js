import IdeasApi from '../services/ideasApi'
import IdeaList from './IdeaList';

class IdeaForm {
  constructor () {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
      
    // this.render();
  }

  render () {
    this._formModal.innerHTML = 
      `
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}"/>
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
      `
    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }

  addEventListeners () {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit (e) {
    e.preventDefault();

    if (
      !this._form.elements.username.value ||
      !this._form.elements.text.value || 
      !this._form.elements.tag.value
      ) {
        alert('Please enter all fields')
        return;
      }

    // SAVE USER TO LOCAL STORAGE
    localStorage.setItem('username', this._form.elements.username.value)
    
    const idea = {
        username: this._form.elements.username.value,
        text: this._form.elements.text.value,
        tag: this._form.elements.tag.value
    };

    console.log(idea);

    // ADD IDEA TO SERVER
    const newIdea = await IdeasApi.createIdea(idea)

    // ADD IDEA TO LIST
    this._ideaList.addIdeaToList(newIdea.data.data);

    // CLEAR FIELDS
    this._form.elements.username.value = '';
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';

    this.render();

    document.dispatchEvent(new Event('closemodal'));
  }
}

export default IdeaForm;