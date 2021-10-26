import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import React, { useCallback, useState } from "react";
import ImagePath from "../shared/imagePath";
import SlidingPane from "react-sliding-pane";
import { useSlidePane } from "../shared/hooks/useSlidePane";
interface IFish {
  id: number;
  name: string;
  keyword: string[];
}

interface IFishDummy {
  data: IFish[];
}

const FISH_DUMMY_DATA: IFishDummy = {
  data: [
    { id: 1, name: "라쿤 타이거 새우", keyword: ["비쉬림프", "쉬림프"] },
    { id: 2, name: "오렌지 타이거 새우", keyword: ["비쉬림프"] },
    { id: 3, name: "크리스탈 화이트 새우", keyword: ["오토신"] },
    { id: 5, name: "다리오다리오", keyword: ["스칼렛바디스"] },
    { id: 6, name: "아프리카발톱개구리", keyword: ["똥고기"] },
    { id: 7, name: "구라미", keyword: ["똥고기"] },
    { id: 8, name: "코리도라스 하스타투스", keyword: ["Corydoras hastatus"] },
    {
      id: 9,
      name: "코리도라스 듀프리카레우스",
      keyword: ["Corydoras duplicareus", "듀플리"],
    },
    { id: 10, name: "코리도라스 스터바이", keyword: ["Corydoras sterbai"] },
  ],
};

const SearchBtn = styled.img`
  width: 23px;
  cursor: pointer;
`;

const GoBackBtn = styled.img`
  width: 23px;
  cursor: pointer;
`;

const SearchResultList = styled.div`
  border: none;
  // border-bottom:1px solid #6E7881;
  box-sizing: border-box;
  line-height: 50px;
  vertical-align: middle;
  font-size: 14pt;
`;

const ResultInform = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  color: #adb4ad;
`;

const FHNavbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState<IFish[] | null>(null);
  const { data } = FISH_DUMMY_DATA;
  const { isPaneOpen, isPaneOpenLeft, isPaneOpenBottom, onClickPane } =
    useSlidePane();
  const onChangeHandler = useCallback(
    (text) => {
      let matches: IFish[] = [];
      let matches2: IFish[] = [];
      text = text.replace("\\", "");
      if (text.length > 0) {
        matches = data.filter((dt) => {
          const regex = new RegExp(`${text}`, "gi");
          // var test = [...dt.email,...dt.first_name];

          return dt.name.match(regex);
        });
      }
      if (text.length > 0) {
        matches2 = data.filter((dt) => {
          const regex = new RegExp(`\\${text}`, "gi");
          // var test = [...dt.email,...dt.first_name];
          let test = null;
          dt.keyword.map((e) => {
            if (e.match(regex)) {
              test = dt.keyword;
              return;
            }
          });

          return test;
        });
      }
      const result = [...matches2, ...matches];

      setSuggestion(result);
      if (text.length > 0 && result.length > 0) {
      }
      setText(text);
    },
    [text, suggestion]
  );

  return (
    <div className="nav-bar__wrapper">
      <GoBackBtn src={ImagePath.back} width={20} height={20} />
      <SearchBtn
        src={ImagePath.search2}
        onClick={() => {
          onClickPane(!isPaneOpenBottom, "isPaneOpenBottom");
        }}
        width={20}
        height={20}
        style={{
          cursor: "pointer",
        }}
      />
      <SlidingPane
        closeIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 22"
            width={20}
            height={20}
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M4 11l8 8c.6.5.6 1.5 0 2-.5.6-1.5.6-2 0l-9-9c-.6-.5-.6-1.5 0-2l9-9c.5-.6 1.5-.6 2 0 .6.5.6 1.5 0 2l-8 8z"
            ></path>
          </svg>
        }
        isOpen={isPaneOpenBottom}
        subtitle={
          <div className="test">
            <input
              className="input-box"
              placeholder="검색어를 입력하세요"
              onChange={(e) => {
                onChangeHandler(e.target.value);
              }}
              value={text}
            />
            <SearchBtn
              className="search-btn"
              src={""}
              onClick={() => console.log("검색")}
            />
            {/* <div stlye={searchArea}> */}

            {/* </div> */}
          </div>
        }
        from="bottom"
        width="100%"
        onRequestClose={() => {
          onClickPane(!isPaneOpenBottom, "isPaneOpenBottom");
        }}
      >
        {suggestion && suggestion.length > 0 ? (
          suggestion.map((suggestion, i) => (
            <SearchResultList key={i}>
              {suggestion.name} <hr />
            </SearchResultList>
          ))
        ) : // 검색어는 있으나 검색결과가 없을때
        text.length > 1 ? (
          <SearchResultList>
            {/* <Link to="/dic" 
              onClick={()=>
              setState({isPaneOpenBottom:false})
              }>
          <ResultInform>
            <AddDic size={'100px'} color={'#adb4ad'}/>
              <span>찾으시는 내용이 없어요 ㅠㅠ</span>
              <span>내용을 직접 추가해주세요</span>
          </ResultInform>
        </Link> */}
          </SearchResultList>
        ) : (
          // 첫화면

          <SearchResultList>
            <ResultInform>
              {/* <ShrimpIcon size={'100px'}/> */}
              새우를 검색해보세요
            </ResultInform>
          </SearchResultList>
        )}
      </SlidingPane>

      <style jsx>{`
        .test {
          display: flex;
          width: 100%;
          max-width: 500px;
          justify-content: "center";
          align-items: center;
        }

        .input-box {
          width: 100%;
          border: none;
          height: 30px;
        }

        .nav-bar__wrapper {
          height: 60px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid grey;
        }
      `}</style>
    </div>
  );
};

export default FHNavbar;

function SlidePaneKey(arg0: boolean, SlidePaneKey: any) {
  throw new Error("Function not implemented.");
}
interface IMainNavbarProps {
  value: string;
  image: string;
  text: string;
  imageBackgroundColor: string;
  isOpen: boolean;
  onClick?: (value?: any) => void;
}

type MainNavbarItems = Omit<IMainNavbarProps, "onClick">[];

const mainNavbarItems: MainNavbarItems = [
  {
    value: "calcFishTank",
    image: ImagePath.aquarium,
    text: "#어항계산기",
    imageBackgroundColor: "rgb(239, 242, 198)",
    isOpen: true,
  },

  {
    value: "",
    image: ImagePath.aquaPlant,
    text: "텍스트",
    imageBackgroundColor: "rgb(230, 252, 245)",
    isOpen: false,
  },

  {
    value: "",
    image: ImagePath.fish,
    text: "텍스트",
    imageBackgroundColor: "rgb(255, 244, 230)",
    isOpen: false,
  },
  {
    value: "",
    image: ImagePath.aquarium2,
    text: "텍스트",
    imageBackgroundColor: "rgb(241, 243, 245)",
    isOpen: false,
  },
];

export const FHMainNavbar = () => {
  const router = useRouter();
  return (
    <div className="main-nav-bar__wrapper">
      {mainNavbarItems.map((value, index) => {
        return (
          <FNMainNavbarItem
            key={`mainNavbarItem${index}`}
            {...value}
            onClick={(value: string) => {
              router.push(`/${value}`);
            }}
          />
        );
      })}
      <style jsx>{`
        .main-nav-bar__wrapper {
          display: flex;
          justify-content: space-between;
          width: 100%;
          color: #6e7881;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

const FNMainNavbarItem = (props: IMainNavbarProps) => {
  const { value, image, text, imageBackgroundColor, isOpen, onClick } = props;
  return (
    <div
      className="main-nav-bar-item__wrapper"
      onClick={() => {
        onClick && onClick(value);
      }}
    >
      <div className="main-nav-bar-item">
        <div
          className="item-image__wrapper"
          style={{
            backgroundColor: imageBackgroundColor,
          }}
        >
          <img src={image} width={40} height={40} />
        </div>
        <p className="main-navbar__text">{isOpen ? text : "#준비중"}</p>
      </div>
      <style jsx>{`
        .main-nav-bar-item__wrapper {
          padding: 10px;
          cursor: pointer;
        }

        .item-image__wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }
        .main-nav-bar-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};
