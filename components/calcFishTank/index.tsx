import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import Button from '../../shared/commonComponent/button';
import Spacing from '../../shared/commonComponent/spacing';
import Switch from '../../shared/commonComponent/switch';
import useCalcFishBowl from '../../shared/hooks/useCalcFishBowl';
import { IGetSuppliesProductResponse } from '../../shared/hooks/useSuppliesProduct';
import CalcSupplies from './calcSupplies';
import SuppliesCarousel from './suppliesCarousel';
import styles from './index.module.scss';

//테스트
const CalcFishTank = (props?: { initData: IGetSuppliesProductResponse; }) => {
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
    tankWeight,
    capacity,
    setTankWidth,
    setTankDepth,
    setTankHeight,
    setThickness,
    setTankSand,
    setWaterLevel,
    setTankWeight,
    calculate,
    tankReorder,
  } = useCalcFishBowl();

  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  const handleClickSwitch = () => {
    setIsShowDetail(!isShowDetail);
    setTankSand(0);
    setWaterLevel(0);
    setThickness(0);
    setTankWeight(0);
  };

  useEffect(() => {
    if (faceFrontRef.current) faceFrontRef.current.style.width = '100px';
  }, [faceFrontRef]);

  return (
    <div>
      <h1 className={styles["title"]}>물양계산기</h1>
      <h3 className={styles["description"]}>본인 어항에 맞는 약품 용량을 계산해보세요!!</h3>
      <div className={styles["flex-box--main"]}>
        <div className={styles["main-section__tank-preview"]}>
          <div className={styles["main-section__tank-container"]} ref={containerRef}>
            <div className={styles["main-section__tank"]}>
              <div className={`${styles["face"]} ${styles["faceFront"]}`} ref={faceFrontRef}>
                <b>fishhi.kr</b>
              </div>
              <div className={`${styles["face"]} ${styles["faceBack"]}`} ref={faceBackRef}></div>
              <div className={`${styles["face"]} ${styles["faceLeft"]}`} ref={faceLeftRef}></div>
              <div className={`${styles["face"]} ${styles["faceRight"]}`} ref={faceRightRef}></div>
              <div className={`${styles["face"]} ${styles["faceTop"]}`} ref={faceTopRef}></div>
              <div className={`${styles["face"]} ${styles["faceBottom"]}`} ref={faceBottomRef}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["main-section__tank-size"]}>
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
      <div className={`${styles["main-section__tank-size"]} ${styles["detail-setting"]}`} style={{ display: isShowDetail ? 'flex' : 'none' }}>
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
      수조의 물 용량은 <b>{capacity}L</b> 입니다

      <br />
      {tankWeight ? `수조의 무게는 ${tankWeight}kg 입니다` : null}
      <div className={styles[""]}>
        <CalcSupplies initData={props?.initData} />
      </div>


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
        className={styles["tank__input-label"]}
        style={{
          fontSize: labelSize,
        }}
      >
        {label}
      </div>
      <input
        type="number"
        className={styles["input"]}
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

      <div className={styles["size-unit"]}>{unit}</div>

      <style jsx>{`
      
      `}</style>
    </div>
  );
};
