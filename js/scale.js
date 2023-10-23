const MAX_SCALE = 100, MIN_SCALE = 0, SCALE_STEP = 25, uploadForm = document.querySelector('.img-upload__form'),
    scaleField = uploadForm.querySelector('.img-upload__scale'),
    scaleValue = scaleField.querySelector('.scale__control--value'),
    smallerButton = scaleField.querySelector('.scale__control--smaller'),
    biggerButton = scaleField.querySelector('.scale__control--bigger'),
    imageElement = uploadForm.querySelector('.img-upload__preview'), onBiggerButtonClick = () => {
      const currentValue = parseInt(scaleValue.value.slice(0, -1), 10);
      const decreasedValue = currentValue + SCALE_STEP > MAX_SCALE ? MAX_SCALE : currentValue + SCALE_STEP;
      scaleValue.value = `${decreasedValue}%`;

      imageElement.style = `transform: scale(${decreasedValue / 100})`;
    }, onSmallerButtonClick = () => {
      const currentValue = parseInt(scaleValue.value.slice(0, -1), 10);
      const decreasedValue = currentValue - SCALE_STEP < MIN_SCALE ? MIN_SCALE : currentValue - SCALE_STEP;
      scaleValue.value = `${decreasedValue}%`;

      imageElement.style = `transform: scale(${decreasedValue / 100})`;
    };


smallerButton.addEventListener('click', onSmallerButtonClick);

biggerButton.addEventListener('click', onBiggerButtonClick);

export {scaleValue};
