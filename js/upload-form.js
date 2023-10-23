import { sendRequest } from './api.js';
import { scaleValue } from './scale.js';
import { uploadSuccessfully, uploadErrored } from './messages.js';
import { setDefaultFilter } from './effects.js';
import { keyIsEscape } from './utils.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'], uploadForm = document.querySelector('.img-upload__form'),
    fileChooser = uploadForm.querySelector('#upload-file'), editForm = document.querySelector('.img-upload__overlay'),
    editFormCloseButton = editForm.querySelector('.img-upload__cancel'),
    imageElement = editForm.querySelector('.img-upload__preview'),
    submitButton = editForm.querySelector('.img-upload__submit'),
    effectsPrewiews = editForm.querySelectorAll('.effects__preview'), closeForm = () => {
      editForm.classList.add('hidden');
      document.body.classList.remove('modal-open');
      submitButton.disabled = false;
    }, closeFormWithDefaultSettings = () => {
      closeForm();
      setDefaultFilter();
      editForm.querySelector('.text__hashtags').value = '';
      editForm.querySelector('.text__description').value = '';
    }, onDocumentEscKeyDown = (evt) => {
      if (keyIsEscape(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
        closeForm();
        document.querySelector('#upload-file').value = '';

        document.removeEventListener('keydown', onDocumentEscKeyDown);
      }
    };


editFormCloseButton.addEventListener('click', () => {
  closeForm();
  document.querySelector('#upload-file').value = '';

  document.removeEventListener('keydown', onDocumentEscKeyDown);
});

fileChooser.addEventListener('change', () => {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  scaleValue.value = '100%';
  imageElement.style = `transform: scale(${1})`;

  const file = fileChooser.files[0];
  const fileName =file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const image = imageElement.querySelector('img');
    image.src = URL.createObjectURL(file);
    effectsPrewiews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${image.src})`;
    });
  }

  document.addEventListener('keydown', onDocumentEscKeyDown);
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  submitButton.disabled = true;
  sendRequest(uploadSuccessfully, uploadErrored, 'POST', formData)();
});

export { closeForm, closeFormWithDefaultSettings };
