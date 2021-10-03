import React from "react";
import { useSuppliesProduct } from "../../shared/hooks/useSuppliesProduct";
const IMAGE_BASE_URL = "https://fishhi.kr/thumbnails/";
const CalcSupplies = () => {
  const { data } = useSuppliesProduct();

  if (!data) return <div></div>;
  return (
    <div className="calc-supplies">
      {data.map((value: any, index: number) => {
        const { img, productName, recommendedUsage1, recommendedUsage2 } =
          value;
        return (
          <li className="search-list" key={`searchList${index}`}>
            <img
              width={100}
              height={100}
              src={`https://fishhi.kr/thumbnails/${img}`}
              alt={`${productName} 상품`}
              style={{
                margin: 10,
                objectFit: "contain",
              }}
            />
            <div>
              <p>{productName}</p>
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
          </li>
        );
      })}

      <style jsx>{`
        .search-list {
          display: flex;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default CalcSupplies;
