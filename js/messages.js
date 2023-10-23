import { keyIsEscape } from './utils.js';
import { closeForm, closeFormWithDefaultSettings } from './upload-form.js';

const bodyElement = document.querySelector('body'),
    successfullUploadElement = bodyElement.querySelector('#success').content,
    errorUploadElement = bodyElement.querySelector('#error').content,
    errorElement = bodyElement.querySelector('#load-error').content, onDocumentEscKeyDown = (evt) => {
      const message = bodyElement.querySelector('.popup');
      if (keyIsEscape(evt) || !evt.target.classList.contains('inner')) {
        bodyElement.removeChild(message);
        document.removeEventListener('keydown', onDocumentEscKeyDown);
        document.removeEventListener('click', onDocumentEscKeyDown);
      }
    }, onMessageButtonClick = () => {
      const message = bodyElement.querySelector('.popup');
      message.querySelector('button').addEventListener('click', () => {
        bodyElement.removeChild(message);
        document.removeEventListener('keydown', onDocumentEscKeyDown);
        document.removeEventListener('click', onDocumentEscKeyDown);
      });
    }, addMessage = (messageElement) => {
      bodyElement.appendChild(messageElement.cloneNode(true));
      onMessageButtonClick();
      document.addEventListener('keydown', onDocumentEscKeyDown);
      document.addEventListener('click', onDocumentEscKeyDown);
    }, loadErrored = () => {
      addMessage(errorElement);
    }, uploadSuccessfully = () => {
      closeFormWithDefaultSettings();
      addMessage(successfullUploadElement);
    }, uploadErrored = () => {
      closeForm();
      addMessage(errorUploadElement);
    };


export { uploadSuccessfully, uploadErrored, loadErrored };
