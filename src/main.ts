// import "./style.css";

export default ((doc) => {
  const getElement = (elm: string): Node => {
    const defaultElm = doc.createElement("span");
    return doc.querySelector(elm) || defaultElm;
  };

  const getElements = (elm: string): NodeList => {
    return doc.querySelectorAll(elm);
  };

  const doArrows = (): void => {
    const Right = getElement(".right");
    const Left = getElement(".left");
    const Slider = getElement(".slider") as HTMLElement;
    const images = getElements(".image");

    let slideNum = 1;
    const slideWidth = 450;
    const length = images.length;

    const nextImage = () => {
      Slider.style.transform = `translateX(-${slideNum * slideWidth}px)`;
      slideNum++;
    };

    const firstImage = () => {
      slideNum = 0;
      Slider.style.transform = `translateX(${slideNum * slideWidth}px)`;
      slideNum = 1;
    };

    const prevImage = () => {
      Slider.style.transform = `translateX(-${(slideNum - 2) * slideWidth}px)`;
      slideNum--;
    };

    const lastImage = () => {
      slideNum = length - 1;
      Slider.style.transform = `translateX(-${slideNum * slideWidth}px)`;
      slideNum = length;
    };

    Right.addEventListener("click", (evt) => {
      evt.preventDefault();
      console.log(slideNum);
      if (slideNum === length) {
        firstImage();
      } else {
        nextImage();
      }
    });

    Left.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (slideNum === 1) {
        lastImage();
      } else {
        prevImage();
      }
    });
  };

  doArrows();
})(window.document);
