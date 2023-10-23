import { onPictureClick } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'),
    picturesList = document.querySelector('.pictures'), picturesItems = [], createPictureItem = (item) => {
      const newPicture = pictureTemplate.cloneNode(true);
      newPicture.querySelector('.picture__img').src = item.url;
      newPicture.querySelector('.picture__likes').textContent = item.likes;
      newPicture.querySelector('.picture__comments').textContent = item.comments.length;

      onPictureClick(newPicture, item);

      return newPicture;
    }, deleteAllPictures = () => {
      const pictures = picturesList.querySelectorAll('.picture');
      pictures.forEach((picture) => {
        picturesList.removeChild(picture);
      });
    }, showPictures = (pictures) => {
      deleteAllPictures();
      const fragment = new DocumentFragment;
      pictures.forEach((picture) => fragment.appendChild(picture));
      picturesList.appendChild(fragment);
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    }, loadPictures = (pictures) => {
      pictures.forEach((picture) => picturesItems.push(createPictureItem(picture)));
      showPictures(picturesItems);
    };


export { loadPictures, showPictures, picturesItems };
