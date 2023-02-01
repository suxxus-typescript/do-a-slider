// import "./style.css";

const getElement = (elm: string): Node => {
  const defaultElm = document.createElement("span");
  return document.querySelector(elm) || defaultElm;
};

const getElements = (elm: string): NodeList => {
  return document.querySelectorAll(elm);
};

const sliderActions = (() => {
  //
  const Slider = getElement(".slider") as HTMLElement;
  const Images = getElements(".image");
  const slideWidth = 450;
  const len = Images.length;
  let slideNum = 1;

  const getSlideNum = () => slideNum;

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
    slideNum = len - 1;
    Slider.style.transform = `translateX(-${slideNum * slideWidth}px)`;
    slideNum = len;
  };

  const gotoSlideNum = (value: number) => {
    if (value >= 0 && value <= len) {
      slideNum = value;
      Slider.style.transform = `translateX(-${slideNum * slideWidth}px)`;
      slideNum++;
    } else {
      console.warn("out of range");
    }
  };

  return {
    getSlideNum,
    nextImage,
    firstImage,
    prevImage,
    lastImage,
    gotoSlideNum,
  };
})();

const circleButtonsAction = (() => {
  let elm: HTMLDivElement;

  const gotoButton = (slideNum: number): void => {
    if (elm) {
      elm.classList.remove("button-circle--selected");
    }

    elm = getElement(`#circle-${slideNum}`) as HTMLDivElement;

    if (elm.classList) {
      elm.classList.add("button-circle--selected");
    }
  };

  return {
    gotoButton,
  };
})();

const doArrows = () => {
  const Right = getElement(".right");
  const Left = getElement(".left");
  const images = getElements(".image");

  const len = images.length;

  const { getSlideNum, firstImage, nextImage, lastImage, prevImage } =
    sliderActions;

  Right.addEventListener("click", (evt) => {
    evt.preventDefault();
    const slideNum = getSlideNum();
    if (slideNum === len) {
      firstImage();
    } else {
      nextImage();
    }
    circleButtonsAction.gotoButton(getSlideNum());
  });

  Left.addEventListener("click", (evt) => {
    evt.preventDefault();
    const slideNum = getSlideNum();
    if (slideNum === 1) {
      lastImage();
    } else {
      prevImage();
    }
    circleButtonsAction.gotoButton(getSlideNum());
  });
};

const doButtons = () => {
  const images = getElements(".image");
  const bottom = getElement(".bottom");
  const len = images.length;

  let i = 0;

  const { gotoSlideNum } = sliderActions;
  const { gotoButton } = circleButtonsAction;

  while (i < len) {
    const circle = document.createElement("div");
    circle.setAttribute("id", `circle-${i + 1}`);
    circle.classList.add("button-circle");

    circle.addEventListener("click", (evt) => {
      if (evt.target) {
        const elmId = ((evt.target as HTMLDivElement).getAttribute("id") || "-")
          .split("-")
          .map(Number)
          .filter((x: number) => x)
          .pop();

        gotoButton(elmId || 1);
        gotoSlideNum((elmId || 1) - 1);
      }
    });

    bottom.appendChild(circle);

    if (i === 0) gotoButton(1);

    i++;
  }
};

export default (() => {
  doArrows();
  doButtons();
})();
