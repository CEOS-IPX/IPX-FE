export type InventiveStepPatent = {
  applicationNumber: string;
  title: string;
  applicantName: string;
  applicationDate: string;
  legalStatus: string;
};

export type NumericalLimitEffectItem = {
  metric: string;
  unit: string;
  prior_art_value: string;
  invention_value: string;
  improvement: string;
};

export type InventiveStepArgument =
  | {
      argumentType: "NUMERICAL_LIMIT";
      recommended: boolean;
      content: {
        effect_items: NumericalLimitEffectItem[];
      };
    }
  | {
      argumentType: "COMBINATION_MOTIVATION";
      recommended: boolean;
      content: {
        background_limit: string;
        teaching_away: string;
      };
    }
  | {
      argumentType: "COMMON_TECHNIQUE";
      recommended: boolean;
      content: {
        target_label: string;
        target_name: string;
        rebuttal: string;
      };
    }
  | {
      argumentType: "SIMPLE_DESIGN";
      recommended: boolean;
      content: {
        changed_component_label: string;
        changed_component_name: string;
        non_obviousness: string;
      };
    };

export type RunInventiveStepAnalysisRequest = {
  primaryApplicationNumber: string;
};

export type InventiveStepAnalysisResponse = {
  analysisId: number;
  primaryArt: InventiveStepPatent;
  secondaryArt: InventiveStepPatent | null;
  arguments: InventiveStepArgument[];
};
