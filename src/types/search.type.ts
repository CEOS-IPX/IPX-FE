//구성요소 분해 페이지 ai 자동 추출 버튼 api request&response
export type ExtractComponentsRequest = {
  title: string;
  description: string;
  technicalField: string;
};

export type ExtractedComponent = {
  label: string;
  name: string;
  description: string;
};

export type ExtractComponentsResponse = {
  components: ExtractedComponent[];
};
