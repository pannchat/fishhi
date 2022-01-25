import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import Button from '../../shared/commonComponent/button';
import Spacing from '../../shared/commonComponent/spacing';
import Switch from '../../shared/commonComponent/switch';
import useCalcFishBowl from '../../shared/hooks/useCalcFishBowl';
import { IGetSuppliesProductResponse } from '../../shared/hooks/useSuppliesProduct';
import CalcSupplies from './calcSupplies';
import SuppliesCarousel from './suppliesCarousel';

//테스트
const CalcFishTank = (props?: { initData: IGetSuppliesProductResponse }) => {
  const {
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
    waterLevel,
    thickness,
    tankSand,
    setTankWidth,
    setTankDepth,
    setTankHeight,
    setThickness,
    setTankSand,
    setWaterLevel,
    calculate,
    tankReorder,
  } = useCalcFishBowl();

  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  const handleClickSwitch = () => {
    setIsShowDetail(!isShowDetail);
    setTankSand(0);
    setWaterLevel(0);
    setThickness(0);
  };

  useEffect(() => {
    if (faceFrontRef.current) faceFrontRef.current.style.width = '100px';
  }, [faceFrontRef]);

  return (
    <div>
      <h1 className="title">물양계산기</h1>
      <h3 className="description">본인 어항에 맞는 약품 용량을 계산해보세요!!</h3>
      <div className="flex-box--main">
        <div className="main-section__tank-preview">
          <div className="main-section__tank-container" ref={containerRef}>
            <div className="main-section__tank">
              <div className="face faceFront" ref={faceFrontRef}>
                <b>fishhi.kr</b>
              </div>
              <div className="face faceBack" ref={faceBackRef}></div>
              <div className="face faceLeft" ref={faceLeftRef}></div>
              <div className="face faceRight" ref={faceRightRef}></div>
              <div className="face faceTop" ref={faceTopRef}></div>
              <div className="face faceBottom" ref={faceBottomRef}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-section__tank-size">
        <TankInput
          value={tankWidth}
          name="tankWidth"
          label="가로"
          onChange={value => {
            setTankWidth(value);
          }}
          unit={'cm'}
        />
        <TankInput
          value={tankHeight}
          name="tankHeight"
          label="세로"
          onChange={value => {
            setTankHeight(value);
          }}
          unit={'cm'}
        />
        <TankInput
          value={tankDepth}
          name="tankDepth"
          label="깊이"
          onChange={value => {
            setTankDepth(value);
          }}
          unit={'cm'}
        />
      </div>
      <Spacing height={15} />
      <div className="main-section__tank-size detail-setting">
        <TankInput
          value={thickness}
          onChange={value => {
            setThickness(value);
          }}
          name="thickness"
          label="두께"
          unit="T"
        />

        <TankInput
          value={tankSand}
          onChange={value => {
            setTankSand(value);
          }}
          name="tankSand"
          label="바닥재"
          unit="cm"
        />

        <TankInput
          value={waterLevel}
          onChange={value => {
            setWaterLevel(value);
          }}
          name="waterLevel"
          label="수위"
          unit="cm"
        />
      </div>
      <Spacing height={20} />
      <Switch
        label="상세설정"
        isActive={isShowDetail}
        onClick={handleClickSwitch}
        style={{
          justifyContent: 'flex-end',
          cursor: 'pointer',
        }}
      />
      <Spacing height={50} />
      <Button
        width={200}
        height={50}
        color={'#8aa1a1'}
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 500,
          borderRadius: 25,
          cursor: 'pointer',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onClick={calculate}
      >
        계산하기
      </Button>
      <Spacing height={50} />
      <div className="">
        <CalcSupplies initData={props?.initData} />
      </div>

      <style jsx>{`
        .title {
          text-align: center;
          margin-bottom: 5px;
        }

        .description {
          text-align: center;
          color: #9e9e9e;
        }
        .face {
          margin: 0px;
          padding: 0px;
          width: 100px;
          height: 100px;
          position: absolute;
          top: 80px;
          left: 50px;
          box-sizing: border-box;
          border: 5px solid #76899d;
          /* background-color: rgba(126, 200, 223, 0.3); */
          background-color: rgba(18, 129, 159, 0.3);
        }

        .main-section__tank-size {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
        }

        .flex-box--main {
          display: flex;
          align-items: center;
          width: 100%;
          height: 300px;
          margin: 10px 0;
          flex-direction: row;
          justify-content: center;
          max-width: 720px;
          flex-wrap: wrap;
          flex-basis: 720px;
        }

        .main-section__tank-preview {
          display: flex;
          /* position: fixed; */
          /* top:30%; */
          flex-direction: column;
          align-items: center;
          width: 300px;
          margin-bottom: auto;
        }

        .main-section__tank-container {
          perspective: 1000px;
          width: 200px;
          height: 250px;
          margin-top: 30px;
          display: flex;
          justify-content: center;
        }

        .main-section__tank {
          margin: 0px;
          width: 200px;
          height: 250px;
          animation: spin 15s infinite linear;
          -webkit-animation: spin 15s infinite linear;
          display: block;
          box-sizing: content-box;
          transform-style: preserve-3d;
          position: relative;
        }

        .main-section__tank-size.detail-setting {
          display: ${isShowDetail ? 'flex' : 'none'};
        }

        .faceBack {
          transform: translateZ(-50px);
        }

        .faceFront {
          transform: translateZ(50px);
        }

        .faceLeft {
          transform: translateX(50px) rotateY(-90deg);
        }

        .faceRight {
          transform: translateX(-50px) rotateY(90deg);
        }

        .faceTop {
          transform: translateY(-45px) rotateX(90deg);
        }

        .faceBottom {
          transform: translateY(45px) rotateX(-90deg);
        }
      `}</style>
    </div>
  );
};

export default CalcFishTank;

const TankInput = (props: {
  onChange?: (value: number) => void;
  label: string;
  value: number;
  placeholder?: string;
  name: string;
  unit: string;
  labelSize?: number;
}) => {
  const { onChange, unit, label, labelSize = 16, ...inputAttributes } = props;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0px 5px',
      }}
    >
      <div
        className="tank__input-label"
        style={{
          fontSize: labelSize,
        }}
      >
        {label}
      </div>
      <input
        type="number"
        className="input"
        {...inputAttributes}
        style={{
          width: '50px',
          height: '100%',
          outline: 'none',
          border: 'solid 1px #8c98a4',
          textAlign: 'center',
        }}
        onChange={e => {
          if (onChange) {
            if (e.target.value.length > 0) {
              onChange(parseInt(e.target.value));
            } else {
              onChange(0);
            }
          }
        }}
      />

      <div className="size-unit">{unit}</div>

      <style jsx>{`
        .main-section__tank {
          width: 300px;
          height: 300px;
        }
        .tank__input-label {
          font-weight: 800;
          width: 45px;
          // margin-right:10px;
        }

        .size-unit {
          font-size: 14px;
          font-weight: 500;
        }
        .input::-webkit-outer-spin-button,
        .input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input + div {
          display: inline-block;
          width: 16px;
          padding: 0 2px;
          vertical-align: bottom;
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  );
};
