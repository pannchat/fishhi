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
      <div className="flex-box--main">
        <div className="main-section__tank-preview">
          <div className="main-section__tank-container">
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

        .flex-box--main {
          display: flex;
          align-items: center;
          width: 100%;
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
