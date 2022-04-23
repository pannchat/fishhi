import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  getAquaplantApi,
  getAquaplantRetriveApi,
  getFishListApi,
  getFishRetriveApi,
  getSupplies,
  getSupplyRetriveApi,
} from "../../api";
import Contents from "../../components/contents";
import ErrorView from "../../components/errorView";
import Species from "../../components/info/species";
import SpeciesDetail from "../../components/info/speciesDetail";

export async function getStaticPaths() {
  return {
    paths: [{ params: { param: ["fish"] } }, { params: { param: ["aquaplant"] } }, { params: { param: ["supplies"] } }],
    fallback: "blocking",
  };
}
export async function getStaticProps(value: any) {
  const category = value.params.param[0] as string;
  const param = value.params.param;

  try {
    // info list case
    if (param.length < 2) {
      if (category === "fish") {
        const data = await getFishListApi({ offset: 0, limit: 10 });
        return {
          props: {
            data,
          },
        };
      }

      if (category === "aquaplant") {
        const data = await getAquaplantApi({ offset: 0, limit: 10 });

        return {
          props: {
            data: data,
          },
        };
      }

      if (category === "supplies") {
        const data = await getSupplies({ offset: 0, limit: 10 });
        return {
          props: {
            data: data,
          },
        };
      }

      return {
        props: {
          data: null,
        },
      };
    }
    // info detail case
    const id = param[1] as string;

    if (category === "supplies") {
      const data = await getSupplyRetriveApi(id);
      return {
        props: {
          data: data,
        },
      };
    }

    if (category === "aquaplant") {
      const data = await getAquaplantRetriveApi(id);
      return {
        props: {
          data: data,
        },
      };
    }

    if (category === "fish") {
      const data = await getFishRetriveApi(id);
      return {
        props: {
          data: data,
        },
      };
    }

    return {
      props: {
        data: null,
      },
    };
  } catch {
    return {
      props: {
        data: "error",
      },
    };
  }
}
// merge
const InfoPageDetail = <T extends unknown>(props: { data: T }) => {
  const { data } = props;
  const router = useRouter();
  const { param } = router.query;
  const species = param ? param[0] : null;
  const id = param ? param[1] : null;

  if (data === "error") {
    return <ErrorView />;
  }

  if (!species) return null;
  if (!id) return <Contents type={species} initData={data as any} />;
  return <SpeciesDetail id={id} type={species} initData={data} />;
};

export default InfoPageDetail;
