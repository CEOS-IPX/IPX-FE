export const INVENTIVE_STEP_LOGIC_TYPES = [
  {
    key: "numericLimitation",
    title: "수치한정",
    description: "내 발명에서 수치(파라미터)가 법적 권리를 확보할 수 있는지를 검토해요",
  },
  {
    key: "multiReferenceCombination",
    title: "복수인용발명결합",
    description:
      "두 가지 이상의 기존 발명을 결합했을 때 우리 발명이 쉽게 만들어질 수 있는지를 검토해요",
  },
  {
    key: "commonKnowledge",
    title: "주지관용기술",
    description: "이미 알려진, 통상적으로 사용되는 기술이 아닌지 검토해요",
  },
  {
    key: "simpleDesignChange",
    title: "단순설계변경",
    description: "단순한 설계 변경 이외에 진보적인 부분을 찾아내고 설명해요",
  },
] as const;

export type InventiveStepLogicKey = (typeof INVENTIVE_STEP_LOGIC_TYPES)[number]["key"];
