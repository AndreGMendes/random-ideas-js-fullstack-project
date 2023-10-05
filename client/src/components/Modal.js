class Modal {
    constructor () {
        this._modal = document.querySelector('#modal');
        this._modalBtn = document.querySelector('#modal-btn');
        this.addEventListeners();

    }

// ------------------------------------------------------------------------------------------------
// EVENT LISTENERS 
// ------------------------------------------------------------------------------------------------
    addEventListeners () {
        this._modalBtn.addEventListener('click', this.open.bind(this));
        window.addEventListener('click', this.outsideClick.bind(this));
        document.addEventListener('closemodal', () => {
            this.close();
        })
    }

// ------------------------------------------------------------------------------------------------
// FUNCTIONS 
// ------------------------------------------------------------------------------------------------
    open () {
        this._modal.style.display = 'block'
    }
    
    close () {
        this._modal.style.display = 'none'
    }
    
    outsideClick (e) {
        e.target === this._modal ? this.close() : {};
    }
}

export default Modal;