import { useCallback, useRef, useState } from "react";

const TANK_STYLE_RATIO = 100;

export default function useCalcFishBowl(){
  // tankProperties
  const [tankWidth, setTankWidth] = useState<number>(0);
  const [tankHeight, setTankHeight] = useState<number>(0);
  const [tankDepth, setTankDepth] = useState<number>(0);
  const [tankWeight, setTankWeight] = useState<number>(0)
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

  const checkValidation = useCallback(() => {
    if(Math.min(tankWidth,tankDepth,tankHeight,tankSand,waterLevel,tankWeight) < 0){
      alert("ㅎㅎ😡");
      return false;
    }else if (tankWidth > tankDepth*100 || tankWidth > tankHeight*100 ||  tankDepth > tankWidth*100 || tankDepth > tankHeight*100 || tankHeight > tankDepth*100 || tankHeight > tankWidth*100){
        alert("이런 어항이 어딨어요 😮‍💨");
        return false;
    }else if(Math.max(tankWidth,tankDepth,tankHeight,tankSand,waterLevel,tankWeight) > 10000){
        alert("ㅎㅎ바다속에 사세요?🎣");
        return false;
    }
    
    return true;
  }, [
    tankWidth, tankDepth, tankHeight, tankSand, waterLevel, tankWeight
  ])

  const calculate = useCallback(() => {
    if(checkValidation()){
      console.log(tankWidth, tankHeight, tankDepth);
      const min = Math.min(tankWidth, tankHeight, tankDepth);
      console.log(min)
      let styleTankWidth = (tankWidth/min)*TANK_STYLE_RATIO;
      let styleTankHeight = (tankHeight/min)*TANK_STYLE_RATIO;
      let styleTankDepth = (tankDepth/min)*TANK_STYLE_RATIO;
      let styleTankSand = (tankSand/min)*TANK_STYLE_RATIO;
      let styleWaterLevel = (waterLevel/min)*TANK_STYLE_RATIO;
      console.log((tankWidth/min))

      if(Math.max(styleTankWidth,styleTankDepth,styleTankHeight)>200){
        var scale = 200/Math.max(styleTankWidth,styleTankDepth,styleTankHeight);
        styleTankWidth *= scale;
        styleTankDepth *= scale;
        styleTankHeight *= scale;
        styleTankSand *= scale;
        styleWaterLevel *= scale;
      }

      const fishTank = [faceFrontRef, faceBackRef, faceBottomRef, faceLeftRef, faceRightRef, faceTopRef];
      fishTank.map((value) => {
        if(value.current){
          value.current.innerHTML = '';
        }
      })
      if(faceFrontRef.current && faceBackRef.current && faceLeftRef.current && faceRightRef.current && faceTopRef.current && faceBottomRef.current){
        if(styleTankSand !== 0 && styleTankSand){
          var sand =`<div style='width:100%; height:${styleTankSand}px;position:absolute;bottom:0;background-color:rgba(150, 96, 29, 0.714);margin:0px'></div>`;
          faceFrontRef.current.innerHTML = sand;
          faceLeftRef.current.innerHTML = sand;
          faceRightRef.current.innerHTML=sand;
          faceBackRef.current.innerHTML = `<div style='width:100%; height:${styleTankSand}px;position:absolute;top:0;background-color:rgba(150, 96, 29, 0.714);margin:0px'></div>`;
        }

        if(styleWaterLevel !== 0 && styleWaterLevel){
          var water =`<div style='width:100%; height:${styleWaterLevel}px;position:absolute;top:0;background-color:rgba(255, 255, 255, 0.714);margin:0px'></div>`;
          faceFrontRef.current.innerHTML += water;
          faceLeftRef.current.innerHTML += water;
          faceRightRef.current.innerHTML += water;
          faceBackRef.current.innerHTML += `<div style='width:100%; height:${styleWaterLevel}px;position:absolute;bottom:0;background-color:rgba(255, 255, 255, 0.714);margin:0px'></div>`;
        }
        console.log(styleTankWidth + 'px');
        console.log(styleTankDepth + 'px');
        console.log(styleTankHeight + 'px');
        faceFrontRef.current.style.width = styleTankWidth + 'px';
        faceFrontRef.current.style.height = styleTankHeight + 'px';
        faceFrontRef.current.style.transform = '';
        faceFrontRef.current.style.transform = 'translateZ(' + (styleTankDepth/2) +'px)';

        faceBackRef.current.style.width = styleTankWidth + 'px';
        faceBackRef.current.style.transform = 'rotate(-180deg) translateZ(' + -(styleTankDepth/2) +'px)';
        faceBackRef.current.style.height = styleTankHeight + 'px';

        faceLeftRef.current.style.width = styleTankDepth + 'px';
        faceLeftRef.current.style.transform = 'translateX(' + -((styleTankDepth/2)) +'px) rotateY(90deg)';
        faceLeftRef.current.style.height = styleTankHeight + 'px';

        faceRightRef.current.style.width = styleTankDepth + 'px';
        faceRightRef.current.style.height = styleTankHeight + 'px';
        faceRightRef.current.style.transform = 'translateX(' +  (styleTankWidth - styleTankDepth + styleTankDepth/2) +'px) rotateY(90deg)';

        faceTopRef.current.style.width = styleTankWidth + 'px';
        faceTopRef.current.style.height = styleTankDepth + 'px';
        faceTopRef.current.style.transform = 'translateY(' + -(styleTankDepth/2) + 'px) rotateX(90deg)';

        faceBottomRef.current.style.width = styleTankWidth + 'px';
        faceBottomRef.current.style.height = styleTankHeight + 'px';
        faceBottomRef.current.style.transform = 'translateY(' + (styleTankHeight - styleTankDepth + styleTankDepth/2) + 'px) rotateX(90deg)';
        console.log("계산 완료!!")
      }
    }
    } ,[
    tankWeight, tankHeight, tankDepth, waterLevel, tankSand, tankWidth, checkValidation
  ])

  const clickCalculateHandle = useCallback(() => {

  }
  , [])
  return  {
    faceFrontRef,
    faceBackRef,
    faceBottomRef,
    faceLeftRef,
    faceRightRef,
    faceTopRef,
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
  }
}