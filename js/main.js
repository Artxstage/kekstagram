import { loadPictures } from './pictures.js';
import { loadErrored } from './messages.js';
import { sendRequest } from './api.js';
import './big-picture.js';
import './upload-form.js';
import './validator.js';
import './effects.js';
import './filters.js';

sendRequest(loadPictures, loadErrored, 'GET')();

