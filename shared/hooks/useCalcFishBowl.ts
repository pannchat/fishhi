import { useCallback, useRef, useState } from 'react';

const TANK_STYLE_RATIO = 100;

export default function useCalcFishBowl() {
  // tankProperties
  const [tankWidth, setTankWidth] = useState<number>(0);
  const [tankHeight, setTankHeight] = useState<number>(0);
  const [tankDepth, setTankDepth] = useState<number>(0);
  const [tankWeight, setTankWeight] = useState<number>(0);
  const [tankSand, setTankSand] = useState<number>(0);
  const [waterLevel, setWaterLevel] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);

  // refs
  const faceFrontRef = useRef<HTMLDivElement>(null);
  const faceBackRef = useRef<HTMLDivElement>(null);
  const faceLeftRef = useRef<HTMLDivElement>(null);
  const faceRightRef = useRef<HTMLDivElement>(null);
  const faceTopRef = useRef<HTMLDivElement>(null);
  const faceBottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkValidation = useCallback(() => {
    if (tankSand > tankHeight) {
      alert('바닥재가 높이보다 클 수 없습니다.');
      return false;
    }
    if (Math.min(tankWidth, tankDepth, tankHeight, tankSand, waterLevel, tankWeight) < 0) {
      alert('ㅎㅎ😡');
      return false;
    } else if (
      tankWidth > tankDepth * 100 ||
      tankWidth > tankHeight * 100 ||
      tankDepth > tankWidth * 100 ||
      tankDepth > tankHeight * 100 ||
      tankHeight > tankDepth * 100 ||
      tankHeight > tankWidth * 100
    ) {
      alert('이런 어항이 어딨어요 😮‍💨');
      return false;
    } else if (Math.max(tankWidth, tankDepth, tankHeight, tankSand, waterLevel, tankWeight) > 10000) {
      alert('ㅎㅎ바다속에 사세요?🎣');
      return false;
    }

    return true;
  }, [tankWidth, tankDepth, tankHeight, tankSand, waterLevel, tankWeight]);

  const initFishTank = useCallback(() => {
    const fishTank = [faceFrontRef, faceBackRef, faceBottomRef, faceLeftRef, faceRightRef, faceTopRef];
    fishTank.map(value => {
      if (value.current) {
        value.current.innerHTML = '';
      }
    });
  }, [faceFrontRef, faceBackRef, faceBottomRef, faceLeftRef, faceRightRef, faceTopRef]);

  const changeFrontRearStyle = useCallback(
    (values: { width: number; height: number; depth: number }) => {
      if (faceFrontRef.current && faceBackRef.current) {
        const { width, height, depth } = values;
        // 어항 앞면
        faceFrontRef.current.style.width = width + 'px';
        faceFrontRef.current.style.height = height + 'px';
        faceFrontRef.current.style.transform = 'translateZ(' + depth / 2 + 'px)';

        // 어항 뒷면
        faceBackRef.current.style.width = width + 'px';
        faceBackRef.current.style.height = height + 'px';
        faceBackRef.current.style.transform = 'rotate(-180deg) translateZ(' + -(depth / 2) + 'px)';
      }
    },
    [faceFrontRef, faceBackRef],
  );

  const changeSideStyle = useCallback(
    (values: { width: number; height: number; depth: number }) => {
      if (faceLeftRef.current && faceRightRef.current) {
        const { width, height, depth } = values;
        faceLeftRef.current.style.width = depth + 'px';
        faceLeftRef.current.style.height = height + 'px';
        faceLeftRef.current.style.transform = 'translateX(' + -(depth / 2) + 'px) rotateY(90deg)';

        faceRightRef.current.style.width = depth + 'px';
        faceRightRef.current.style.height = height + 'px';
        faceRightRef.current.style.transform = 'translateX(' + (width - depth + depth / 2) + 'px) rotateY(90deg)';
      }
    },
    [faceLeftRef, faceRightRef],
  );

  const changeTopBottomStyle = useCallback(
    (values: { width: number; height: number; depth: number }) => {
      if (faceTopRef.current && faceBottomRef.current) {
        const { width, height, depth } = values;
        faceTopRef.current.style.width = width + 'px';
        faceTopRef.current.style.height = depth + 'px';
        faceTopRef.current.style.transform = 'translateY(' + -(depth / 2) + 'px) rotateX(90deg)';

        faceBottomRef.current.style.width = width + 'px';
        faceBottomRef.current.style.height = depth + 'px';
        faceBottomRef.current.style.transform = 'translateY(' + (height - depth + depth / 2) + 'px) rotateX(90deg)';
      }
    },
    [faceTopRef, faceBottomRef],
  );

  const setSand = useCallback(
    (sandLevel: number) => {
      if (faceFrontRef.current && faceBackRef.current && faceLeftRef.current && faceRightRef.current) {
        const sand = `<div style='width:100%; 
          height:${sandLevel}px;
          position:absolute;
          bottom:0;
          background-color:rgba(150, 96, 29, 0.714);
          margin:0px'></div>`;

        const sandBack = `<div style='width:100%; 
        height:${sandLevel}px;
        position:absolute;top:0;
        background-color:rgba(150, 96, 29, 0.714);
        margin:0px'></div>`;

        faceFrontRef.current.innerHTML = sand;
        faceLeftRef.current.innerHTML = sand;
        faceRightRef.current.innerHTML = sand;
        faceBackRef.current.innerHTML = sandBack;
      }
    },
    [faceFrontRef, faceBackRef, faceLeftRef, faceRightRef],
  );

  const setWater = useCallback(
    (waterLevel: number) => {
      if (faceFrontRef.current && faceBackRef.current && faceLeftRef.current && faceRightRef.current) {
        const water = `<div style='width:100%; 
        height:${waterLevel}px;
        position:absolute;
        top:0;
        background-color:rgba(255, 255, 255, 0.714);
        margin:0px'></div>`;
        const backWater = `<div style='width:100%; 
        height:${waterLevel}px;
        position:absolute;
        bottom:0;
        background-color:rgba(255, 255, 255, 0.714);
        margin:0px'></div>`;

        faceFrontRef.current.innerHTML += water;
        faceLeftRef.current.innerHTML += water;
        faceRightRef.current.innerHTML += water;
        faceBackRef.current.innerHTML += backWater;
      }
    },
    [faceFrontRef, faceBackRef, faceLeftRef, faceRightRef],
  );

  const calculate = useCallback(() => {
    if (checkValidation()) {
      const min = Math.min(tankWidth, tankHeight, tankDepth);
      let styleTankWidth = (tankWidth / min) * TANK_STYLE_RATIO;
      let styleTankHeight = (tankHeight / min) * TANK_STYLE_RATIO;
      let styleTankDepth = (tankDepth / min) * TANK_STYLE_RATIO;
      let styleTankSand = (tankSand / min) * TANK_STYLE_RATIO;
      let styleWaterLevel = (waterLevel / min) * TANK_STYLE_RATIO;
      // 계산 로직
      if (Math.max(styleTankWidth, styleTankDepth, styleTankHeight) > 200) {
        var scale = 200 / Math.max(styleTankWidth, styleTankDepth, styleTankHeight);
        styleTankWidth *= scale;
        styleTankDepth *= scale;
        styleTankHeight *= scale;
        styleTankSand *= scale;
        styleWaterLevel *= scale;
      }

      if (styleTankSand > 0 && styleTankSand) {
        setSand(styleTankSand);
      }

      if (styleWaterLevel > 0 && styleWaterLevel) {
        setWater(styleWaterLevel);
      }

      const values = {
        width: styleTankWidth,
        height: styleTankHeight,
        depth: styleTankDepth,
      };
      initFishTank();
      changeFrontRearStyle(values);
      changeSideStyle(values);
      changeTopBottomStyle(values);
      if (styleTankSand > 0 && styleTankSand) {
        const faceRefArr = [
          faceFrontRef.current,
          faceLeftRef.current,
          faceRightRef.current,
          faceBackRef.current,
          faceBottomRef.current,
        ];
        faceRefArr.forEach(refCurrent => {
          if (refCurrent) {
            const newElement = document.createElement('div');
            newElement.setAttribute(
              'style',
              `width:100%;
            height:${refCurrent === faceBottomRef.current ? '100%' : styleTankSand - 5 + 'px'};
            position:absolute;
            ${refCurrent === faceBackRef.current ? 'top:0' : 'bottom:0'};
            background-color:rgba(150, 96, 29, 0.714);
            margin:0px;`,
            );

            refCurrent.appendChild(newElement);
          }
        });
      }
      tankReorder();
    }
  }, [
    checkValidation,
    tankWidth,
    tankHeight,
    tankDepth,
    tankSand,
    waterLevel,
    changeFrontRearStyle,
    changeSideStyle,
    changeTopBottomStyle,
    setSand,
    setWater,
    initFishTank,
  ]);

  const tankReorder = () => {
    const containerWidth = containerRef.current?.clientWidth;
    const containerHeight = containerRef.current?.clientHeight;
    const face = [faceFrontRef, faceBackRef, faceBottomRef, faceLeftRef, faceRightRef, faceTopRef];

    face.forEach(el => {
      if (el.current && containerWidth && containerHeight && faceFrontRef.current && faceRightRef.current) {
        if (tankWidth > tankDepth) {
          el.current.style.left = containerWidth / 2 - faceFrontRef.current.clientWidth / 2 + 'px';
        } else if (tankWidth < tankDepth) {
          el.current.style.left =
            (containerWidth - Math.min(faceFrontRef.current.clientWidth, faceRightRef.current.clientWidth)) / 2 + 'px';
        } else {
          el.current.style.left =
            (containerWidth - Math.min(faceFrontRef.current.clientWidth, faceRightRef.current.clientWidth)) / 2 + 'px';
        }

        el.current.style.top = (containerHeight - faceFrontRef.current.clientHeight) / 2 + 'px';
      }
    });
  };

  const clickCalculateHandle = useCallback(() => {}, []);
  return {
    faceFrontRef,
    faceBackRef,
    faceBottomRef,
    faceLeftRef,
    faceRightRef,
    faceTopRef,
    containerRef,
    tankWidth,
    tankHeight,
    tankDepth,
    tankWeight,
    tankSand,
    waterLevel,
    thickness,
    capacity,
    setTankWidth,
    setTankHeight,
    setTankDepth,
    setTankWeight,
    setTankSand,
    setWaterLevel,
    setThickness,
    setCapacity,
    calculate,
    tankReorder,
  };
}
