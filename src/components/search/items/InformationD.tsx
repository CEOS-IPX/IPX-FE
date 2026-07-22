import Title from "@/components/search/SearchTitle";
import { MoreInfoA } from "@/components/search/MoreInfo/MoreInfoA";
import { MoreInfoB } from "@/components/search/MoreInfo/MoreInfoB";

type InformationDProps = {
  priorArtReference: string;
  onChangePriorArtReference: (value: string) => void;
  differentiationNotes: string;
  onChangeDifferentiationNotes: (value: string) => void;
  measurementConditions: string;
  onChangeMeasurementConditions: (value: string) => void;
  measurementResults: string;
  onChangeMeasurementResults: (value: string) => void;
};

export default function InformationD({
  priorArtReference,
  onChangePriorArtReference,
  differentiationNotes,
  onChangeDifferentiationNotes,
  measurementConditions,
  onChangeMeasurementConditions,
  measurementResults,
  onChangeMeasurementResults,
}: InformationDProps) {
  return (
    <div className="flex flex-col gap-5">
      <Title
        stepnum={4}
        title="추가 정보 입력하기 (선택)"
        label="알고 있는 정보가 있다면 입력해주세요. 작성 시 분석 결과 향상에 도움이 될 수 있어요"
      />

      <div className="flex flex-col gap-2 pl-10">
        <MoreInfoA
          label="타 선행기술 대비 차별점"
          priorArtReference={priorArtReference}
          onChangePriorArtReference={onChangePriorArtReference}
          differentiationNotes={differentiationNotes}
          onChangeDifferentiationNotes={onChangeDifferentiationNotes}
        />
        <MoreInfoB
          label="관련 데이터 수치"
          measurementConditions={measurementConditions}
          onChangeMeasurementConditions={onChangeMeasurementConditions}
          measurementResults={measurementResults}
          onChangeMeasurementResults={onChangeMeasurementResults}
        />
      </div>
    </div>
  );
}
