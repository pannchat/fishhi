/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ISupplyBoxProps {
  productName: string;
  img: string;
  recommendedUsage1: number;
  recommendedUsage2: number;
  imgWidth?: string | number;
  imgHeight?: string | number;
}

const SupplyBox = (props: ISupplyBoxProps) => {
  const {
    img,
    productName,
    recommendedUsage1,
    recommendedUsage2,
    imgWidth = 100,
    imgHeight = 100,
  } = props;
  return (
    <div className="supply-box">
      <img
        width={imgWidth}
        height={imgHeight}
        src={`https://fishhi.kr/thumbnails/${img}`}
        alt={`${productName} 상품`}
        style={{
          margin: 10,
          objectFit: "contain",
        }}
      />
      <div>
        <p className="supply-product-name">{productName}</p>
        권장 사용량 : {recommendedUsage1}L 당 {recommendedUsage2}cc
        {/* <br />내 어항 사용량 :{" "}
            <b>
              {capacity
                ? `${(
                    (capacity / recommendedUsage1) *
                    el.recommendedUsage2
                  ).toFixed(2)}cc`
                : "?"}
            </b>{" "}
            권장
            <br /> */}
        {/* <a className="open">상세 설명서 보기</a> */}
      </div>

      <style jsx>{`
        .supply-product-name {
          font-size: 16px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default SupplyBox;
