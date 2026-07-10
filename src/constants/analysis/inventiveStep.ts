export const INVENTIVE_STEP_LOGIC_TYPES = [
  {
    key: "numericLimitation",
    title: "수치한정",
    description: "효과의 현저성",
  },
  {
    key: "multiReferenceCombination",
    title: "복수인용발명결합",
    description: "Teaching Away",
  },
  {
    key: "commonKnowledge",
    title: "주지관용기술",
    description: "반박 논리",
  },
  {
    key: "simpleDesignChange",
    title: "단순설계변경",
    description: "비-자명성 논리",
  },
] as const;

export type InventiveStepLogicKey = (typeof INVENTIVE_STEP_LOGIC_TYPES)[number]["key"];
