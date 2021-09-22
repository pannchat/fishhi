import React, { InputHTMLAttributes, useEffect } from "react";
import useCalcFishBowl from "../../shared/hooks/useCalcFishBowl";

const CalcFishTank = () => {
  const {
    faceFrontRef,
    faceBackRef,
    faceBottomRef,
    faceLeftRef,
    faceRightRef,
    faceTopRef,
    tankWidth,
    tankHeight,
    tankDepth,
    setTankWidth,
    setTankDepth,
    setTankHeight,
    calculate,
  } = useCalcFishBowl();

  useEffect(() => {
    if (faceFrontRef.current) faceFrontRef.current.style.width = "100px";
  }, []);
  return (
    <div>
      <div className="main-section__tank">
        <div className="faceFront" ref={faceFrontRef}>
          <b>fishhi.kr</b>
        </div>
        <div className="face faceBack" ref={faceBackRef}></div>
        <div className="face faceLeft" ref={faceLeftRef}></div>
        <div className="face faceRight" ref={faceRightRef}></div>
        <div className="face faceTop" ref={faceTopRef}></div>
        <div className="face faceBottom" ref={faceBottomRef}></div>
      </div>

      <div className="calculate" onClick={calculate}>
        계산
      </div>
      <div className="main-section__tank-size">
        <TankInput
          value={tankWidth}
          name="tankWidth"
          label="가로"
          onChange={(value) => {
            setTankWidth(value);
          }}
          unit={"cm"}
        />
        <TankInput
          value={tankHeight}
          name="tankHeight"
          label="세로"
          onChange={(value) => {
            setTankHeight(value);
          }}
          unit={"cm"}
        />
        <TankInput
          value={tankDepth}
          name="tankDepth"
          label="깊이"
          onChange={(value) => {
            setTankDepth(value);
          }}
          unit={"cm"}
        />
      </div>

      <style jsx>{`
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
}) => {
  const { onChange, unit, label, ...inputAttributes } = props;

  return (
    <div
      style={{
        width: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <p className="tank__input-label">{label}</p>
      <input
        className="input"
        {...inputAttributes}
        onChange={(e) => {
          if (onChange) {
            if (e.target.value.length > 0) {
              onChange(parseInt(e.target.value));
            } else {
              onChange(0);
            }
          }
        }}
        style={{
          width: 65,
          height: "100%",
          outline: "none",
          border: "solid 1px #8c98a4",
          textAlign: "center",
        }}
      />

      <div>{unit}</div>

      <style jsx>{`
        .main-section__tank {
          width: 300px;
          height: 300px;
        }
        .tank__input-label {
          font-size: 16px;
          font-weight: 800;
        }
        .input::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
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
